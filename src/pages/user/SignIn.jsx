import React, { useState, useEffect } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth'; //inMemoryPersistence
// import axios from 'axios';
import ui from '../../ui.js';


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
        
        <div className="sign-form">
          <div className="hdt">로그인</div>
          <ul className="list">
            <li>
              <label className="dt">이메일 (user@test.com) </label>
              <div className="dd"><span className="input"><input type="email" id="email" placeholder="입력하세요" /></span></div>
            </li>
            <li>
              <label className="dt">비밀번호 (123456) </label>
              <div className="dd"><span className="input"><input type="password" id="password" placeholder="입력하세요" /></span></div>
            </li>
          </ul>
          <div className="savelogin"><label className="checkbox"><input type="checkbox" /><span className="txt">자동 로그인</span></label></div>
          <div className="btsbox btn-set"><button type="button" className="btn"><i className="fa-regular fa-right-to-bracket"></i><em>로그인</em></button></div>
          <div className="link">
            <Link className={`bt`} to={"/user/signup"}> 
              회원가입하러 가기 <i className="fa-regular fa-chevron-right"></i>
            </Link>
          </div>
        </div>
        
      </main>
    </div>
  </>
  )
}