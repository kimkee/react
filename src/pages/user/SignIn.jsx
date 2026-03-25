import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

import { supabase } from '../../supabase.js';

// import axios from 'axios';
import ui from '../../ui.js';
import StarPoint from '../../components/StarPoint';

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
        queryParams: { access_type: 'offline', prompt: 'consent', },
        redirectTo: `${import.meta.env.VITE_SITE_URL}` // 콜백 URL을 명확하게 지정
      },
    })
    if (error) console.log(error)
  }
  
  const signInWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        queryParams: { access_type: 'offline', prompt: 'consent', }, // 토큰 갱신을 위한 옵션
        scope: 'profile_nickname account_email profile_image', // 동의 항목 설정
        redirectTo: `${import.meta.env.VITE_SITE_URL}` // 콜백 URL을 명확하게 지정
      },
    });
    if (error) console.log(error);
  };
  
  
  const addMember = async (user, gourl)=> {
    
  }
  useEffect( () => {
    window.scrollTo(0,0);
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
              <button type="button" className="btn" onClick={()=>signInWithKakao()}><i className="fa-brands fa-kakao-talk"></i><em>Kakao </em></button>
              <button type="button" className="btn" onClick={()=>signInWithOAuth('github')  }><i className="fa-brands fa-github"></i><em>Github </em></button>
            </div>
            <p className="url">{import.meta.env.VITE_SITE_URL}</p>
          </div>}



          <div style={{display: 'none'}}>
            <p><StarPoint cls='lg' point={10} /></p>
            <p><StarPoint cls='lg' point={9} /></p>
            <p><StarPoint cls='lg' point={8} /></p>
            <p><StarPoint cls='lg' point={7} /></p>
            <p><StarPoint cls='lg' point={6} /></p>
            <p><StarPoint cls='lg' point={5} /></p>
            <p><StarPoint cls='lg' point={4} /></p>
            <p><StarPoint cls='lg' point={3} /></p>
            <p><StarPoint cls='lg' point={2} /></p>
            <p><StarPoint cls='lg' point={1} /></p>
            <p><StarPoint cls='lg' point={0} /></p>
          </div>

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
                회원가입하러 가기 <i className="fa-solid fa-chevron-right"></i>
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