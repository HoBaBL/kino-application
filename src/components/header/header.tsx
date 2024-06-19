import style from './header.module.css'
import { RiMovie2Line } from "react-icons/ri";
import { IoBookmark } from "react-icons/io5";
import { Outlet, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
    
    let location = window.location;
    const url = location.pathname

    useEffect(() => {
        if (url === '/') {
            navigate('catalog')
        }
    }, [])

    return (
        <div>
            <div className={style.header}>
                <div className={style.container}>
                    <Link to={'/catalog'}>
                        <h1 className={style.title}><RiMovie2Line /> Кинопамп</h1>
                    </Link>
                    <Link to={'/favorites'}>
                        <p className={style.headerText}><IoBookmark/> Избранное</p>
                    </Link>
                    
                </div>
            </div>
            <Outlet/>
        </div>
        
    )
}

export default Header