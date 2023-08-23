import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

import store from '../../store.js';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth'; //inMemoryPersistence
// import axios from 'axios';
import ui from '../../ui.js';


export default function SignIn() {
  // console.log(opts);

  let params = useParams()
  
  console.log(params);
  let location = useLocation()
  let navigate = useNavigate();
  let opts = params.menu;

  const erMsg = {
    "auth/user-not-found": "존재하지 않는 사용자 정보로 로그인을 시도한 경우 발생",
    "auth/wrong-password": "비밀번호가 잘못된 경우 발생",
    "auth/too-many-requests": "연속된 로그인 요청이 여러 번 감지되어 로그인 요청이 금지됨",
    "auth/weak-password": "비밀번호가 6자리 미만인 경우 발생",
    "auth/invalid-email": "잘못된 포맷의 이메일을 입력한 경우 발생",
    "auth/email-already-in-use": "이미 사용 중인 이메일 계정 ID로 회원 가입을 시도하는 경우 발생",
    "auth/invalid-phone-number": "잘못된 포맷의 핸드폰 번호를 입력한 경우 발생",
    "auth/internal-error": "비밀번호를 입력하세요.",
  }

  const userEmail = useRef();
  const userPassword = useRef();
  const userNick = useRef();
  const avatarVal = useRef();

  const join = async ()=>{
    
  }
  


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

    <div className="container page user sign up">
      <main className="contents">
        
        <div className="sign-form">
          <div className="hdt">회원가입</div>
          <ul className="list">
            <li>
              <label className="dt">이메일</label>
              <div className="dd">
                <span className="input"><input ref={userEmail} type="email" placeholder="예) test@naver.com" /></span>
              </div>
            </li>
            <li>
              <label className="dt">비밀번호</label>
              <div className="dd">
                <span className="input"><input ref={userPassword} type="password" placeholder="6자리 이상 예) 111111 " /></span>
              </div>
            </li>
            <li>
              <label className="dt">닉네임</label>
              <div className="dd">
                <span className="input"><input ref={userNick} type="text" placeholder="입력하세요" /></span>
              </div>
            </li>
            <li>
              <label className="dt">아바타</label>
              <div className="dd">
                <div className="ut-avata">
                  { store.state.avatar.map( (icon,index) => {
                      return (
                        <label key={index}>
                          <input type="radio" name="avatar" value={index} ref={avatarVal} defaultChecked={index == 0 } />
                          <span className="txt"><img className="img" src={icon} alt="" /></span>
                        </label>
                      )
                    }) }
                </div>
              </div>
            </li>
          </ul>
          <div className="btsbox btn-set">
            <button type="button" className="btn" disabled={false} onClick={join}><i className="fa-regular fa-right-to-bracket"></i><em>회원가입</em></button>
          </div>
          <div className="link">
            이미 회원이신가요? <Link className="bt" to="/user/signin">로그인 하러가기 <i className="fa-regular fa-chevron-right"></i></Link>
          </div>
        
        </div>
        
      </main>
    </div>
  </>
  )
}