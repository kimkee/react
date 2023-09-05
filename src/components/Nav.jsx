import React, {  useEffect,useState } from 'react'; //useState, useEffect
import {NavLink , useLocation } from 'react-router-dom'; // Link  , useLocation, useSearchParams,useParams, useSearchParams


import { getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


import ui from '../ui.js';
import store from '../store.js';

export default function Nav() {
  // let params = useParams()
  // const [searchParams] = useSearchParams();
  // console.log(params)
  // console.log(searchParams.get('search'))
  const PUBLIC_URL = import.meta.env.VITE_APP_PUBLIC_URL;  
  const location = useLocation();
  console.log(location);

  const isActive = els => location.pathname.includes(`${els}`) ? "active" : "";
  
  const [isOnTop, setIsOnTop] = useState('');
  const scrollEvent = ()=> {
    if ( ui.lock.stat ) return;
    ui.viewport.scrollTop() > 50 ? setIsOnTop(true) : setIsOnTop(false);
  };

  const goTop = ()=> {
    ui.scrollTo("body", 0 , 200 );
  };
  const auth = getAuth();
  const [isUser, isSetUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  
  useEffect( () => {
    window.addEventListener("scroll", scrollEvent);

    setUserInfo({
      uid : sessionStorage.user && JSON.parse(sessionStorage.user).uid
    })

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // 사용자가 로그인한 경우
        isSetUser(authUser);
        setUserInfo({
          uid : authUser.uid
        })
      } else {
        // 사용자가 로그아웃한 경우
        isSetUser(null);
        setUserInfo({ })
      }
    });

    return ()=>{
      unsubscribe();
      window.removeEventListener("scroll", scrollEvent);
    }
  },[userInfo.id]);

  return (
    <>
      <div className={`floatnav ${ isOnTop ? `on-top` : `` }` }>
        <button type="button" className="bt top" onClick={goTop}><i className="fa-solid fa-arrow-up"></i><em>위로</em></button>
      </div>
      <nav id="menubar" className="menubar">
        <div className="inr">
          <ul className="menu">
            <li className={isActive("home")}>
              <NavLink to={`${PUBLIC_URL}home/`} className={"bt"}><i className="fa-regular fa-house"></i><em>Home</em></NavLink>
            </li>
            <li className={isActive("list/movie")}>
              <NavLink to={`${PUBLIC_URL}list/movie/0/`} className={"bt"}><i className="fa-regular fa-clapperboard-play"></i><em>Movie</em></NavLink>
            </li>
            <li className={isActive("list/tv")}>
              <NavLink to={`${PUBLIC_URL}list/tv/0/`} className={"bt"}><i className="fa-regular fa-tv-retro"></i><em>TV</em></NavLink>
            </li>
            <li className={isActive("search/movie")}>
              <NavLink to={`${PUBLIC_URL}search/movie/`} className={"bt"}><i className="fa-regular fa-search"></i><em>Search</em></NavLink>
            </li>
            <li className={isActive("user/")}>
              { ( store.state.userInfo.stat || userInfo.uid) && <NavLink to={`${PUBLIC_URL}user/${userInfo.uid}`} className={"bt"}> <i className="fa-regular fa-user"></i><em>Mypage</em></NavLink>}
              { !userInfo.uid && <NavLink to={`${PUBLIC_URL}user/signin`} className={"bt"}><i className="fa-regular fa-user"></i><em>Login</em></NavLink> }
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
