import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

import store from '../../store.js';
import { getAuth, signOut } from 'firebase/auth';
// import axios from 'axios';
import ui from '../../ui.js';


export default function SignOut() {
  // console.log(opts);

  let navigate = useNavigate();

  const userEmail = useRef();
  const userPassword = useRef();
  const autoLogin = useRef();

  const logout = async ()=>{
    
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        // ui.alert("로그아웃 성공!!");
        // const gourl = localStorage.getItem("preurl").replace("#", "");
        navigate(`/`)
      }).catch((error) => {
        console.log(error);
        // An error happened.
      });
    
  }

  useEffect( () => {
    window.scrollTo(0,0);
    logout();
    // document.querySelector(".header").classList.remove("trans");
    // window.addEventListener("scroll", scrollEvent);
    return ()=>{
      // window.removeEventListener("scroll", scrollEvent);
    }
    // eslint-disable-next-line
  });


  return (
    <>
    <Outlet/>

    <div className="container page user sign out">
      <main className="contents">
        
        
      </main>
    </div>
  </>
  )
}