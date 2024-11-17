import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

import { supabase } from '../../supabase.js';

// import axios from 'axios';
import ui from '../../ui.js';


export default function SignIn() {
  // console.log(opts);

  let params = useParams()
  
  
  let location = useLocation()
  let navigate = useNavigate();
  let opts = params.menu;

  

  const signInWithOAuth = async (txt) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: txt,
      options: {
        redirectTo: `${import.meta.env.VITE_SITE_URL}/#/callback` // 콜백 URL을 명확하게 지정
      },
    })
    if (error) console.log(error)
  }
  
  const signInWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        scope: 'profile_nickname account_email profile_image', // 동의 항목 설정
        redirectTo: `${import.meta.env.VITE_SITE_URL}/#/callback` // 콜백 URL을 명확하게 지정
      },
    });
    if (error) console.log(error);
  };
  
  
  const addMember = async (user, gourl)=> {
    
  }
  useEffect( () => {
    window.scrollTo(0,0);
    console.log(supabase);

    return ()=>{

    }
    // eslint-disable-next-line
  });


  return (
    <>
    <Outlet/>

    <div className="container page user sign in">
      <main className="contents">
      
        <div className="sign-form">
          {/* {<div className="hdt">로그인</div>} */}
          {<div className="sns form">
            <div className="tit"><em className="t">SNS 로그인</em></div>
            <div className="bts">
              <button type="button" className="btn" onClick={()=>signInWithOAuth('google')  }><i className="fa-brands fa-google"></i><em>Google </em></button>
              <button type="button" className="btn" onClick={()=>signInWithKakao()}><i className="fa-solid fa-comment"></i><em>Kakao </em></button>
              <button type="button" className="btn" onClick={()=>signInWithOAuth('github')  }><i className="fa-brands fa-github"></i><em>Github </em></button>
            </div>
            <p className="url">{import.meta.env.VITE_SITE_URL}</p>
          </div>}

          {/* <div className="eml form">
            <div className="tit"><em className="t">Email 계정 로그인</em></div>
            <ul className="list">
              <li>
                <div className="dd"><span className="input"><input type="email" ref={userEmail} placeholder="이메일 (user@test.com)" /></span></div>
              </li>
              <li>
                <div className="dd"><span className="input"><input type="password" ref={userPassword} placeholder="비밀번호 (123456)" /></span></div>
              </li>
            </ul>
            <div className="savelogin">
              <Link className={`bt`} to={"/user/signup"}>
                회원가입하러 가기 <i className="fa-regular fa-chevron-right"></i>
              </Link>
              <label className="checkbox"><input type="checkbox" ref={autoLogin} onChange={saveSheck} /><span className="txt">자동 로그인</span></label>
            </div>
            <div className="btsbox btn-set"><button type="button" className="btn" onClick={login}><i className="fa-regular fa-right-to-bracket"></i><em>로그인</em></button></div>
          </div> */}

        </div>
        
      </main>
    </div>
  </>
  )
}