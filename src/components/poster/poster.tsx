import { FC } from "react"
import style from './poster.module.css'
import { FaStar } from "react-icons/fa";
import { useNavigate} from "react-router-dom";


type PosterType = {
    cinema: {
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
        genres: [
            {
            name:string
            }
        ]
    },
}


export const Poster:FC<PosterType> = ({cinema}) => {
    const navigate = useNavigate();

    function router() {
        navigate(`/movie/${cinema.id}`)
    }

    return (
            <div className={style.poster}>
                <img className={style.preview} src={cinema.poster.previewUrl} alt="" />
                <div className={style.textFlex}>
                    <p className={style.name}>{cinema.name}</p>
                    <p>{cinema.year} год</p>
                    <p>{cinema.genres.map((genre) => <span key={Math.random()}>{genre.name} </span> )}</p>
                    <p className={style.rating}>{cinema.rating.kp} <FaStar color="orange"/></p>
                    <button onClick={() => router()} className={style.btnMore}>Больше</button>
                </div>
            </div>
    )
}