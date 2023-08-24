import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

import store from '../../store.js';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth'; //inMemoryPersistence
// import axios from 'axios';
import ui from '../../ui.js';


export default function SignUp() {
  // console.log(opts);

  let params = useParams()
  
   
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

  const userEmail = useRef(null);
  const userPassword = useRef();
  const userNick = useRef();
  const avatarVal = useRef();

  const join = async ()=>{
    
  }
  
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isNickValid, setIsNickValid] = useState(false);
  const validate = (input) => {
    const pattern = {
      mail : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      pass : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      nick : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    }
    switch (input.name) {
      case 'email': setIsEmailValid( pattern.mail.test(input.value) ); break;
      case 'password': setIsPwdValid( pattern.pass.test(input.value) ); break;
      case 'nickname': setIsNickValid( pattern.nick.test(input.value) ); break;
      default: break;
    }
  };
  
  console.log( isEmailValid , isPwdValid , isNickValid , isEmailValid && isPwdValid && isNickValid );
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
            <li>
              <label className="dt">이메일</label>
              <div className="dd">
                <span className="input"><input ref={userEmail} name="email" type="email" placeholder="예) test@naver.com" onInput={(e)=>validate(e.currentTarget)} data-webkit-autofill /></span>
                {!isEmailValid ? <p className={`msg-valid`}>이메일 형식에 맞게 입력해주세요.</p> : <i className="chk fa-regular fa-check"></i>}
              </div>
            </li>
            <li>
              <label className="dt">비밀번호</label>
              <div className="dd">
                <span className="input"><input ref={userPassword} name="password" type="password" placeholder="예) abc123" onInput={(e)=>validate(e.currentTarget)} /></span>
                {!isPwdValid ? <p className={`msg-valid`}>문자,숫자 포함 6자리 이상 입력해주세요.</p> : <i className="chk fa-regular fa-check"></i>}
              </div>
            </li>
            <li>
              <label className="dt">닉네임</label>
              <div className="dd">
                <span className="input"><input ref={userNick} name="nickname" type="text" placeholder="입력하세요" onInput={(e)=>validate(e.currentTarget)} /></span>
                {!isNickValid ? <p className={`msg-valid`}>문자,숫자 포함 6자리 이상 입력해주세요.</p> : <i className="chk fa-regular fa-check"></i>}
              </div>
            </li>
          </ul>
          <div className="btsbox btn-set">
            <button type="button" className="btn" disabled={!(isEmailValid && isPwdValid && isNickValid)} onClick={join}><i className="fa-regular fa-right-to-bracket"></i><em>회원가입</em></button>
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