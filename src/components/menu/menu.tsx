import { FC, useEffect, useRef, useState } from "react"
import style from './menu.module.css'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

type MenuType = {
    startYear:string,
    setStartYear: React.Dispatch<React.SetStateAction<string>>,
    endYear:string,
    setEndYear: React.Dispatch<React.SetStateAction<string>>,
    startRating:string,
    setStartRating: React.Dispatch<React.SetStateAction<string>>,
    endRating:string,
    setEndRating:React.Dispatch<React.SetStateAction<string>>,
    genres:any,
    setGenres:any,
}

export const Menu:FC<MenuType> = ({startYear, setStartYear, endYear, setEndYear, startRating, setStartRating, endRating, setEndRating, genres, setGenres}) => {
    const [active, setActive] = useState(false)
    const [activeGenres, useActiveGenres] = useState<any>([])
    const genresArray = ["Аниме", "Биографии", "Боевик", "Вестерн", "Военный", "Детектив",  "Детский", "Документальный", "Драма", "Игра",
        "История", "Комедия", "Концерт" , "Короткометражка", "Криминал", "Мелодрама", "Музыка", "Мультфильм", "Мюзикл", "Новости",
        "Приключения", "Реальное ТВ", "Семейный", "Спорт", "Ток-шоу" , "Триллер", "Ужасы", "Фантастика", "Фильм-нуар", "Фэнтези", "Церемония"
    ]
    const AddTaskDownRef = useRef<any>(null)
    
    
    function AddGenres(item:string) {
        const copy:any = [...genres]
        const copyActive:any = [...activeGenres]
        const genre = `+${item.toLowerCase()}`
        if (copy.length === 0) {
            copy.push(genre)
            copyActive.push(item)
            useActiveGenres(copyActive)
            setGenres(copy)
        } else {
            copyActive.forEach((i:string) => {
                if (i !== item && !copyActive.includes(item)) {
                    console.log(i)
                    copy.push(genre)
                    copyActive.push(item)
                    setGenres(copy)
                    useActiveGenres(copyActive)
                } else if (i === item) {
                    const index = copy.indexOf(genre)
                    copyActive.splice(index, 1)
                    copy.splice(index, 1)
                    setGenres(copy)
                    useActiveGenres(copyActive)
                }
            });
        }
    }

    const handleClick = (event:any) => {
        if (AddTaskDownRef.current && AddTaskDownRef.current.contains(event.target)) {
            setActive(true)
        } else {
            setActive(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    },[])

    return (
        <div className={style.sidebar}>
            <div className={style.flexMini}>
                <p className={style.yearsText}>Жанр</p>
                <button id="btn" className={style.select} onClick={() => setActive(true)}>
                    { genres.length > 0 ?
                        activeGenres.map((item:string) => `${item} `)
                    : "Все жанры"
                    }
                    {active ?
                        <IoIosArrowUp/>
                        :
                        <IoIosArrowDown/>
                    }
                    
                </button>
            </div>
            <div ref={AddTaskDownRef} id="addBoard" className={active ? style.updownMeny : style.updownMenyNone}>
                {genresArray.map((item) =>
                    <button key={item} onClick={() => AddGenres(item)} className={style.updownMenyBtn}>{item} {activeGenres.map((i:string) => i === item ? <FaCheck key={Math.random()} size={14}/>:'')}</button>
                )}
            </div>
            <div className={style.flexMini}>
                <p className={style.yearsText}>Год выпуска <span className={style.yearsTextMini}>(1990-2030)</span></p>
                <div className={style.dataFlex}>
                    <input className={style.input} type="number" id="tentacles" name="tentacles" min="1990" max="2030" value={startYear} onChange={(e) => setStartYear(e.target.value)}/>
                    -
                    <input className={style.input} type="number" id="tentacles" name="tentacles" min="1990" max="2030" value={endYear} onChange={(e) => setEndYear(e.target.value)}/>
                </div>
            </div>
            <div className={style.flexMini}>
                <p className={style.yearsText}>Рейтинг</p>
                <div className={style.dataFlex}>
                    <input className={style.inputRating} type="number" id="tentacles" name="tentacles" min="0" max="10" value={startRating} onChange={(e) => setStartRating(e.target.value)}/>
                    -
                    <input className={style.inputRating} type="number" id="tentacles" name="tentacles" min="0" max="10" value={endRating} onChange={(e) => setEndRating(e.target.value)}/>
                </div>
            </div>
            
        </div>
    )
}