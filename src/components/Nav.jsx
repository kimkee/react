import React, {  useEffect } from 'react'; //useState, useEffect
import {NavLink , useLocation } from 'react-router-dom'; // Link  , useLocation, useSearchParams,useParams, useSearchParams

import ui from '../ui';

export default function Nav() {
  // let params = useParams()
  // const [searchParams] = useSearchParams();
  // console.log(params)
  // console.log(searchParams.get('search'))
  
  const location = useLocation();
  console.log(location);

  const isActive = els => location.pathname.includes(`${els}`) ? " active" : "";
  
  const scrollEvent = ()=> {
    const scr = ui.viewport.scrollTop();   
    if ( ui.lock.stat) return;
    if ( scr > 50 ) {
     document.querySelector(".floatnav")?.classList.add("on-top");
    }else{
      document.querySelector(".floatnav")?.classList.remove("on-top");
    }
  };
  const goTop = ()=> window.scrollTo(0,0);
  useEffect( () => {
    window.addEventListener("scroll", scrollEvent);
    return ()=>{
      window.removeEventListener("scroll", scrollEvent);
    }
  },[]);

  return (
    <>
      <div className="floatnav">
        <button type="button" className="bt top" onClick={goTop}><i className="fa-solid fa-arrow-up"></i><em>위로</em></button>
      </div>
      <nav id="menubar" className="menubar">
        <div className="inr">
          <ul className="menu">
            <li><NavLink to={`${process.env.REACT_APP_PUBLIC_URL}home/`} className={"bt" + isActive("home")}><i className="fa-regular fa-house"></i><em>Home</em></NavLink></li>
            <li><NavLink to={`${process.env.REACT_APP_PUBLIC_URL}list/movie/0/`} className={"bt" + isActive("list/movie")}><i className="fa-regular fa-clapperboard-play"></i><em>Movie</em></NavLink></li>
            <li><NavLink to={`${process.env.REACT_APP_PUBLIC_URL}list/tv/0/`} className={"bt" + isActive("list/tv")}><i className="fa-regular fa-tv-retro"></i><em>TV</em></NavLink></li>
            <li><NavLink to={`${process.env.REACT_APP_PUBLIC_URL}search/movie/`} className={"bt" + isActive("search/")}><i className="fa-regular fa-search"></i><em>Search</em></NavLink></li>
          </ul>
        </div>
      </nav>
    </>
  )
}
