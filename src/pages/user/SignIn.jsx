import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

import store from '../../store.js';
import { initializeApp } from 'firebase/app';
import { db } from '../../firebaseConfig.js';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithRedirect, getRedirectResult, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth'; //inMemoryPersistence

// import axios from 'axios';
import ui from '../../ui.js';


export default function SignIn() {
  // console.log(opts);

  let params = useParams()
  
  console.log(params);
  let location = useLocation()
  let navigate = useNavigate();
  let opts = params.menu;
  const erMsg = { //https://firebase.google.com/docs/auth/admin/errors?hl=ko&authuser=0
    "auth/user-not-found": "존재하지 않는 사용자 정보로 로그인을 시도한 경우 발생",
    "auth/wrong-password": "비밀번호가 잘못된 경우 발생",
    "auth/too-many-requests": "연속된 로그인 요청이 여러 번 감지되어 로그인 요청이 금지됨",
    "auth/weak-password": "비밀번호가 6자리 미만인 경우 발생",
    "auth/missing-email": "정확한 이메일을 입력하세요",
    "auth/invalid-email": "잘못된 포맷의 이메일을 입력한 경우 발생",
    "auth/email-already-in-use": "이미 사용 중인 이메일 계정 ID로 회원 가입을 시도하는 경우 발생",
    "auth/invalid-phone-number": "잘못된 포맷의 핸드폰 번호를 입력한 경우 발생",
    "auth/internal-error": "비밀번호를 입력하세요.",
  }

  const userEmail = useRef();
  const userPassword = useRef();
  const autoLogin = useRef();

  const login = async ()=>{
    const email = userEmail.current.value;
    const password = userPassword.current.value;
    const auth = getAuth();
    ui.loading.show();
    console.log(email, password , auth);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email);
        // const gourl = localStorage.getItem("preurl").replace("#", "");
        ui.loading.hide();
        ui.alert("" + user.email + "<br> 로그인 성공!", {
          ycb: () => {
            navigate(`/`)
          }
        });
      })
      .catch((error) => {
        console.log(error.code , error);
        const emsg = erMsg[error.code]
        ui.loading.hide();
        ui.alert(emsg, { tit: "로그인 실패" });
        // alert( error.code , error.message);
        // const errorCode = error.code;
        // const errorMessage = error.message;
      }
    );
    if (autoLogin.current.checked == false) {
      // 로그인 세션 저장 https://firebase.google.com/docs/auth/web/auth-state-persistence?hl=ko&authuser=0
      setPersistence(auth, browserSessionPersistence) // browserSessionPersistence , inMemoryPersistence
        .then(() => {
          return signInWithEmailAndPassword(auth, email, password);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, "====", errorMessage);
        });
    }
  }

  const auth = getAuth();
  
  const loginGoogle = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  }
  const loginGithub = ()=>{
    const provider = new GithubAuthProvider();
    signInWithRedirect(auth, provider);
  }
  const loginFacebook = ()=>{
    const provider = new FacebookAuthProvider();
    signInWithRedirect(auth, provider);
  }
  const loginTwitter = ()=>{
    const provider = new TwitterAuthProvider();
    signInWithRedirect(auth, provider);
  }
  

  const saveSheck = ()=> {
    const saveLogin = autoLogin.current.checked;
    console.log(saveLogin);
    if (saveLogin) {
      const msg = `
        자동로그인을 사용하시면<br> 
        다음부터 회원아이디와 비밀번호를<br>
        입력하실 필요가 없습니다.<br><br>
        공공장소에서는 개인정보가 유출될 수 있으니 사용을 자제하여 주십시오.<br><br>
        자동로그인을 사용하시겠습니까?
      `;
      ui.confirm(msg, {
        tit: "로그인 설정",
        ycb: () => {
          autoLogin.current.checked = true;
        },
        ncb: () => {
          autoLogin.current.checked = false;
        },
        ybt: "예",
        nbt: "아니오",
      });
    }
  }
  const addMember = async (user, gourl)=> {
    await setDoc(doc(db, "member", user.uid), {
      id: user.uid,
      email: user.email,
      nick: user.displayName,
      avatar: null,
      photoURL: user.photoURL,
      liked: [],
      date: new Date(),
    }).then(() => {
      
      console.log("멤버 생성: ");
      ui.alert(`${user.email || user.displayName} 로그인 되었습니다.`, {
        ycb: () => { navigate(gourl); }
      });
    }).catch(e => {
      console.error("멤버 생성 Error : ", e);
    });
  }
  useEffect( () => {
    window.scrollTo(0,0);


    getRedirectResult(auth)
      .then((result) => {
        if (result.user) {
          ui.loading.show();
          console.log("Google 로그인 성공:", result.user);
          addMember(result.user , `/`);
        }
      })
      .catch((error) => {
        console.error("Google 로그인 실패:", error);
      });

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

    <div className="container page user sign in">
      <main className="contents">
        
        <div className="sign-form">
          {/* <div className="hdt">로그인</div> */}
          <div className="sns loginset">
            <div className="tit"><em className="t">SNS 로그인</em></div>
            <div className="bts">
              <button type="button" className="btn" onClick={loginGoogle  }><i className="fa-brands fa-google"></i><em>Google </em></button>
              <button type="button" className="btn" onClick={loginGithub  }><i className="fa-brands fa-github"></i><em>Github </em></button>
              <button type="button" className="btn" onClick={loginFacebook}><i className="fa-brands fa-facebook"></i><em>Facebook </em></button>
              <button type="button" className="btn" onClick={loginTwitter }><i className="fa-brands fa-twitter"></i><em>Twitter </em></button>
            </div>
          </div>
          <div className="eml loginset">
            <div className="tit"><em className="t">Email 계정 로그인</em></div>
            <ul className="list">
              <li>
                <label className="dt">이메일 (user@test.com) </label>
                <div className="dd"><span className="input"><input type="email" ref={userEmail} placeholder="입력하세요" /></span></div>
              </li>
              <li>
                <label className="dt">비밀번호 (123456) </label>
                <div className="dd"><span className="input"><input type="password" ref={userPassword} placeholder="입력하세요" /></span></div>
              </li>
            </ul>
            <div className="savelogin">
              <Link className={`bt`} to={"/user/signup"}>
                회원가입하러 가기 <i className="fa-regular fa-chevron-right"></i>
              </Link>
              <label className="checkbox"><input type="checkbox" ref={autoLogin} onChange={saveSheck} /><span className="txt">자동 로그인</span></label>
            </div>
            <div className="btsbox btn-set"><button type="button" className="btn" onClick={login}><i className="fa-regular fa-right-to-bracket"></i><em>로그인</em></button></div>
          </div>
          {/* <div className="link">
            <Link className={`bt`} to={"/user/signup"}> 
              회원가입하러 가기 <i className="fa-regular fa-chevron-right"></i>
            </Link>
          </div> */}
        </div>
        
      </main>
    </div>
  </>
  )
}