import React, {   } from 'react'; //useState, useEffect
import {NavLink , useLocation } from 'react-router-dom'; // Link  , useLocation, useSearchParams,useParams, useSearchParams

export default function Nav() {
  // let params = useParams()
  // const [searchParams] = useSearchParams();
  // console.log(params)
  // console.log(searchParams.get('search'))
  
  const location = useLocation();
  console.log(location.pathname)
  const movieAct = ()=>{
    let isMove = location.pathname.includes('/movie/') ? "bt active" : "bt";
    return isMove;
  }
  return (
	  <nav id="menubar" className="menubar">
      <div className="inr">
        <ul className="menu">
          <li><NavLink to={`${process.env.PUBLIC_URL}/`} className={"bt"}><i className="fa-regular fa-house"></i><em>Home</em></NavLink></li>
          <li><NavLink to={`${process.env.PUBLIC_URL}/movie/0`} className={ movieAct }><i className="fa-regular fa-clapperboard-play"></i><em>Movie</em></NavLink></li>
          <li><NavLink to={`${process.env.PUBLIC_URL}/search`} className={"bt"}><i className="fa-regular fa-search"></i><em>Search</em></NavLink></li>
        </ul>
      </div>
    </nav>
  )
}
