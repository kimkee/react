import React, {  useEffect,useState } from 'react'; //useState, useEffect
import {NavLink , useLocation } from 'react-router-dom'; // Link  , useLocation, useSearchParams,useParams, useSearchParams

import ui from '../ui.js';

export default function Nav({prop}) {
  // let params = useParams()
  // const [searchParams] = useSearchParams();
  // console.log(params)
  // console.log(searchParams.get('search'))
  const PUBLIC_URL = import.meta.env.VITE_APP_PUBLIC_URL;  
  const location = useLocation();
  

  const isActive = els => location.pathname.includes(`${els}`) ? "active" : "";
  
  const [isOnTop, setIsOnTop] = useState('');
  const scrollEvent = ()=> {
    if ( ui.lock.stat ) return;
    ui.viewport.scrollTop() > 50 ? setIsOnTop(true) : setIsOnTop(false);
  };

  const goTop = ()=> ui.scrollTo("body", 0 , 200 );
  
  const { user, myinfo } = prop;
  const [userInfo, setUserInfo] = useState({});
  
  useEffect( () => {
    window.addEventListener("scroll", scrollEvent);

    return ()=>{
      window.removeEventListener("scroll", scrollEvent);
    }
  },[user]);

  return (
    <>
      <div className={`floatnav ${ isOnTop ? `on-top` : `` }` }>
        <button type="button" className="bt top" onClick={goTop}><i className="fa-solid fa-arrow-up"></i><em>위로</em></button>
      </div>
      <nav id="menubar" className="menubar">
        <div className="inr">
          <ul className="menu">
            <li className={isActive("home")}>
              <NavLink to={`/home/`} className={"bt"}><i className="fa-regular fa-house"></i><em>Home</em></NavLink>
            </li>
            <li className={isActive("list/movie")}>
              <NavLink to={`/list/movie/0/`} className={"bt"}><i className="fa-regular fa-clapperboard-play"></i><em>Movie</em></NavLink>
            </li>
            <li className={isActive("list/tv")}>
              <NavLink to={`/list/tv/0/`} className={"bt"}><i className="fa-regular fa-tv-retro"></i><em>TV</em></NavLink>
            </li>
            <li className={isActive("search/")}>
              <NavLink to={`/search/movie/`} className={"bt"}><i className="fa-regular fa-search"></i><em>Search</em></NavLink>
            </li>
            <li className={isActive("user/")}>
              {  myinfo?.id
              ?
              <NavLink to={`/user/${myinfo?.id}`} className={"bt"}> <span className="pic"><img alt="" className="img" src={ myinfo.profile_picture} /></span><em>MY</em></NavLink>
              :
              <NavLink to={`/user/signin`} className={"bt"}><i className="fa-regular fa-user"></i><em>Login</em></NavLink>
              }
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
