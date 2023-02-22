import React from 'react';
import {NavLink} from 'react-router-dom'; // Link

export default function Nav() {
  return (
	  <nav id="menubar" className="menubar">
      <div className="inr">
        <ul className="menu">
          <li><NavLink to={`${process.env.PUBLIC_URL}/`} className="bt"><i className="fa-regular fa-house"></i><em>Home</em></NavLink></li>
          <li><NavLink to={`${process.env.PUBLIC_URL}/movie`} className="bt"><i className="fa-regular fa-clapperboard-play"></i><em>Movie</em></NavLink></li>
          <li><NavLink to={`${process.env.PUBLIC_URL}/search`} className="bt"><i className="fa-regular fa-search"></i><em>Search</em></NavLink></li>
          {/* <li><NavLink to="/movie/list" className="bt"><i className="fa-regular fa-camera"></i><em>Search</em></NavLink></li> */}
          {/* <li><a href='./react' className="bt"><i className="fa-regular fa-comments"></i><em>Chat</em></a></li>
          <li>
            <a href='./react' className="bt"><i className="fa-regular fa-right-from-bracket"></i><em>Logout</em></a>
            <a href='./react' className="bt"><i className="fa-regular fa-user"></i><em> Login</em></a>
          </li> */}
        </ul>
      </div>
    </nav>
  )
}
