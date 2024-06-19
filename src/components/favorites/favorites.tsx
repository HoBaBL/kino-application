import { useEffect, useState } from 'react'
import style from './favorites.module.css'
import { FaStar } from "react-icons/fa";
import { useNavigate} from "react-router-dom";

type PosterType = {
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
        ];
        shortDescription: string;
        countries: [
            {
                name:string
            }
        ];
        watchability: {
            items: [
                {
                    name:string;
                    logo: {
                        url:string
                    }
                }
            ]
        };
        persons: [
            {
                id:string;
                photo:string;
                name:string;
                profession:string;
                enProfession:string
            }
        ]
    }


const Favorites = () => {
    const [favorites, setFavorites] = useState<any>(JSON.parse(localStorage.getItem('Favorites')!))
    const navigate = useNavigate();

    console.log(favorites)

    function router(id:number) {
        navigate(`/movie/${id}`)
    }


    return (
        <div className={style.container}>
            <div className={style.favorites}>
                <h1>Буду смотреть</h1>
                <div>
                    {favorites.length > 0 ? 
                        favorites.map((item:PosterType) => 
                            <div onClick={() => router(item.id)} key={item.id} className={style.favoritesFlex}>
                                <div>
                                    <img className={style.img} src={item.poster.url} alt="" />
                                </div>
                                <div className={style.textContainer}>
                                    <h2 className={style.h2}>{item.name}</h2>
                                    <p className={style.text}>{item.year}</p>
                                    <p className={style.text}>{item.rating.kp} <FaStar color="orange"/></p>
                                    <p className={style.text}><span className={style.span}>Жанр:</span> {item.genres.map((i) => `${i.name} `)}</p>
                                    <p className={style.text}><span className={style.span}>В ролях:</span> {item.persons.filter((i:any) => i.enProfession === 'actor').slice(0, 3).map((i) => i.name).join(', ')}</p>
                                    <p className={style.text}><span className={style.span}>Режиссер:</span> {item.persons.filter((i:any) => i.enProfession === 'director').slice(0, 1).map((i) => i.name).join(', ')}</p>
                                    <p className={style.text}><span className={style.span}>Сценарий:</span> {item.persons.filter((i:any) => i.enProfession === 'writer').slice(0, 1).map((i) => i.name).join(', ')}</p>
                                    <p className={style.text}><span className={style.span}>Описание:</span> {item.shortDescription}</p>
                                </div>
                                

                            </div>
                        )
                        :
                        <div>
                            Вы ничего не добавили
                        </div>

                    }
                </div>

            </div>
            
        </div>
    )
}

export default Favorites