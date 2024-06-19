import { useState, useEffect } from 'react'
import {
  KinopoiskDev,
  Filter,
  MovieFields,
} from '@openmoviedb/kinopoiskdev_client';
import ReactPaginate from 'react-paginate';
import {Poster} from './components/poster/poster'
import style from './App.module.css'
import { Menu } from './components/menu/menu';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import ThreeDots from './components/skeleton/skeleton';

const kp = new KinopoiskDev('0QYHA6R-S9SMD8V-GC4S8DK-3EK1WHA');

type CinemaType = {
  id: number;
  name: string;
  year: number;
  rating: {
      kp: number;
      imdb: number;
      filmCritics: number;
      russianFilmCritics: number;
      await: null;
  };
  poster: {
      url: string;
      previewUrl: string;
  };
  genres: [{
    name:string
  }]
}
function App() {
  const [cinemas, setCinemas] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [startYear, setStartYear] = useState('1990')
  const [endYear, setEndYear] = useState('2030')
  const [startRating, setStartRating] = useState('0')
  const [endRating, setEndRating] = useState('10')
  const [genres, setGenres] = useState([])
  const [pageMax, setPageMax] = useState(0)
  const [pages, setPages] = useState(0)
  
  const getBuilderMovies = async () => {
    const query: Filter<MovieFields> = {
      year: `${startYear}-${endYear}`,
      'genres.name': genres,
      'rating.kp': `${startRating}-${endRating}`,
      'poster.url': '!null',
      sortField: 'rating.kp',
      sortType: '-1',
      page: pages,
      limit: 50,
    };
  
    const { data, error, message } = await kp.movie.getByFilters(query);
  
    if (data) {
      const { docs, pages } = data;
      setPageMax(pages)
      setCinemas(docs)
      setLoading(true)
    }
  
    // Если будет ошибка, то выведем ее в консоль
    if (error) console.log(error, message);
  };

  useEffect(() => {
    setLoading(true)
    getBuilderMovies();
  },[startYear, endYear,startRating,endRating,genres, pages])

  // useEffect(() => {
  //   setCinemas(post)
  //   setLoading(true)
  // },[])
  
  const handlePageClick = (event:any) => {
    const num = event.selected + 1
    setPages(num);
    setLoading(false)
  };
  
  return (
    <div className={style.containerBaza}>
      <Menu startYear={startYear} setStartYear={setStartYear} 
            endYear={endYear} setEndYear={setEndYear}
            startRating={startRating} setStartRating={setStartRating}
            endRating={endRating} setEndRating={setEndRating}
            genres={genres} setGenres={setGenres}
            /> 
        {!loading ? <div className={style.skeleton}><ThreeDots/></div> :
        <div className={style.main}>
          <div className={style.menu}>
            {
              cinemas.length > 0 && (
                cinemas.map((cinema:CinemaType) => 
                  <Poster key={cinema.id} cinema={cinema}/>
                )
              )
            }
          </div>
          <ReactPaginate
              className={style.pages}
              breakLabel="..."
              nextLabel={<SlArrowRight/>}
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={pageMax}
              previousLabel={<SlArrowLeft/>}
              renderOnZeroPageCount={null}
              marginPagesDisplayed={1}
              breakLinkClassName={style.pointMore}
              pageLinkClassName={style.linkPages}
              activeClassName={style.activePages}
              previousLinkClassName={style.linkPages}
              nextLinkClassName={style.linkPages}
            />
        </div>
        }
    </div>
  )
}

export default App
