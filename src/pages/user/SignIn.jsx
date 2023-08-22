import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,
import axios from 'axios';
import ui from '../../ui.js';
import ItemB from '../../components/ItemB.jsx';
import CateMenu from '../../components/CateMenu.jsx';


export default function Signin() {
  // console.log(opts);

  let params = useParams()
  
  console.log(params);
  let location = useLocation()
  let navigate = useNavigate();
  let opts = params.menu;


  
  useEffect( () => {
    window.scrollTo(0,0);
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

    <div className="container page user signin">
      <main className="contents">
        <p className="d">로그인</p>
        
      </main>
    </div>
  </>
  )
}