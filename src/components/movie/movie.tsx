import { FC, useEffect, useState } from "react"
import style from './movie.module.css'
import { useParams } from "react-router-dom";
import {KinopoiskDev} from '@openmoviedb/kinopoiskdev_client';
import { FaStar } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";



const kp = new KinopoiskDev('0QYHA6R-S9SMD8V-GC4S8DK-3EK1WHA');

const Movie:FC = () => {
    const [movie, setMovie] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const [favorites, setFavorites] = useState<any>(JSON.parse(localStorage.getItem('Favorites')!))
    const [active, setActive] = useState(false)
    const [activeRepeat, setActiveRepeat] = useState(false)

    const params = useParams()
      
      const getMovieById = async () => {
        const { data, error, message } = await kp.movie.getById(Number(params.id));
      
        if (data) {
            setMovie(data);
            setLoading(true)
        }
      
        // Если будет ошибка, то выведем ее в консоль
        if (error) console.log(error, message);
      };

      useEffect(() => {
        getMovieById()
      },[])

      function addFavorites() {
        if (favorites === null) {
            const copy = []
            copy.unshift(movie)
            setFavorites(copy)
            localStorage.setItem('Favorites', JSON.stringify(copy));
        } else {
            const copy = [...favorites]
            const same = copy.find((i) => i.id === movie.id)
            if (same) {
                setActiveRepeat(true)
                return
            } else {
                copy.unshift(movie)
                setFavorites(copy)
                localStorage.setItem('Favorites', JSON.stringify(copy));
            }
        }
        setActive(true)
      }

      function otmena() {
        setActive(false)
      }
      useEffect(() => {
        if (active) {
            setTimeout(otmena, 5000)
        }
      },[active])

      function otmenaRepeat() {
        setActiveRepeat(false)
      }
      useEffect(() => {
        if (activeRepeat) {
            setTimeout(otmenaRepeat, 5000)
        }
      },[activeRepeat])

      

    return (
        <div className={style.container}>
            
            <div className={active ? style.alert : style.alertNone}>
                <p>Добавлено</p>
            </div>
            <div className={activeRepeat ? style.alert : style.alertNone}>
                <p>Уже есть</p>
            </div>
            {!loading ? "Загрузка" :
                <div>
                    <div className={style.flexTitle}>
                        <div>
                            <img className={style.img} src={movie.poster.previewUrl} alt="" />
                        </div>
                        <div className={style.full}>
                            <div className={style.fullContainer}>
                                <div className={style.headerFlex}>
                                    <h1 className={style.title}>{movie.name} ({movie.year})</h1>
                                    <div className={movie.rating.kp > 7 ? style.rating : style.ratingGrai} >
                                        {movie.rating.kp} <FaStar color="orange"/>
                                    </div>
                                </div>
                                <button onClick={() => addFavorites()} className={style.btnFavorites}><IoBookmark/> Добавить в избранное</button>
                                <p className={style.miniTitle}>О фильме</p>
                                <div className={style.flex}>
                                    <div className={style.midleFlex}>
                                        <div className={style.flexTable}>
                                            <p className={style.TableName}>Год производства</p>
                                            <p className={style.TableItem}>{movie.year}</p>
                                        </div>
                                        <div className={style.flexTable}>
                                            <p className={style.TableName}>Страна</p>
                                            <p className={style.TableItem}>{movie.countries.map((i:{name:string}) => i.name).join(', ')}</p>
                                        </div>
                                        <div className={style.flexTable}>
                                            <p className={style.TableName}>Жанр</p>
                                            <p className={style.TableItem}>{movie.genres.map((i:{name:string}) => i.name).join(', ')}</p>
                                        </div>
                                        <div className={style.flexTable}>
                                            <p className={style.TableName}>Режиссер</p>
                                            <p className={style.TableItem}>{movie.persons.filter((i:any) => i.enProfession === 'director').map((i:any) => i.name).join(', ')}</p>
                                        </div>
                                        <div className={style.flexTable}>
                                            <p className={style.TableName}>Сценарий</p>
                                            <p className={style.TableItem}>{movie.persons.filter((i:any) => i.enProfession === 'writer').map((i:any) => i.name).join(', ')}</p>
                                        </div>
                                        <div className={style.flexTable}>
                                            <p className={style.TableName}>Продюсер</p>
                                            <p className={style.TableItem}>{movie.persons.filter((i:any) => i.enProfession === 'producer').map((i:any) => i.name).join(', ')}</p>
                                        </div>
                                        <div className={style.flexTable}>
                                            <p className={style.TableName}>Оператор</p>
                                            <p className={style.TableItem}>{movie.persons.filter((i:any) => i.enProfession === 'operator').map((i:any) => i.name).join(', ')}</p>
                                        </div>
                                        <div className={style.flexTable}>
                                            <p className={style.TableName}>Композитор</p>
                                            <p className={style.TableItem}>{movie.persons.filter((i:any) => i.enProfession === 'composer').map((i:any) => i.name).join(', ')}</p>
                                        </div>
                                        <div className={style.flexTable}>
                                            <p className={style.TableName}>Художник</p>
                                            <p className={style.TableItem}>{movie.persons.filter((i:any) => i.enProfession === 'designer').map((i:any) => i.name).join(', ')}</p>
                                        </div>
                                        <div className={style.flexTable}>
                                            <p className={style.TableName}>Монтаж</p>
                                            <p className={style.TableItem}>{movie.persons.filter((i:any) => i.enProfession === 'editor').map((i:any) => i.name).join(', ')}</p>
                                        </div>
                                        <div className={style.flexTable}>
                                            <p className={style.TableName}>Возраст</p>
                                            <p className={style.TableItem}>{movie.ageRating}+</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className={style.miniTitle}>В главный ролях</p>
                        <div className={style.actorContainer}>
                            {movie.persons.map((item:any) => item.enProfession === "actor" ? 
                                <div className={style.actor} key={item.id}>
                                    <img className={style.actorPhoto} src={item.photo} alt="" />
                                    <p className={style.textActor}>{item.name}</p>    
                                </div>
                                
                                : ""
                            )}
                        </div>
                    </div>
                    <div className={style.description}>
                        <p className={style.miniTitle}>Описание</p>
                        <div className={style.descriptionText}>
                            {movie.description}
                        </div>
                    </div>
                    <div className={style.description}>
                        <p className={style.miniTitle}>Где можно посмотреть</p>
                        {movie.watchability.items.length > 0 ?
                            <div className={style.watchability}>
                                {
                                    movie.watchability.items.map((item:any) => 
                                        <a href={item.url} className={style.watchabilityContainer} key={item.name}>
                                            <img className={style.watchabilityImg} src={item.logo.url} alt="" />
                                            <p className={style.textActor}>{item.name}</p>
                                        </a>
                                    )
                                }
                            </div>
                            :
                            <div>
                                Нет данных
                            </div>
                        }
                        
                    </div>
                </div>
            }
        </div>
    )
}

export default Movie