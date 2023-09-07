import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

import store from '../../store.js';
import { initializeApp } from 'firebase/app';
import { db } from '../../firebaseConfig.js';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider,  signInWithRedirect, getRedirectResult, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth'; //inMemoryPersistence

// import axios from 'axios';
import ui from '../../ui.js';


export default function SnsLogin() {
  // console.log(opts);

  let params = useParams()
  
  console.log(params);
  let location = useLocation()
  let navigate = useNavigate();
  let opts = params.menu;


  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const loginGoogle = ()=>{
    
  }
  


  const addMember = async (user, gourl)=> {
    await setDoc(doc(db, "member", user.uid), {
      id: user.uid,
      email: user.email,
      nick: user.displayName,
      avatar: 0,
      liked: [],
      date: new Date(),
    }).then(() => {
      ui.loading.show();
      console.log("멤버 생성: ");
      navigate(gourl);
      // ui.alert(`${user.email} 로그인 되었습니다.`, {
      //   ycb: () => {  }
      // });
    }).catch(e => {
      console.error("멤버 생성 Error : ", e);
    });
  }



  useEffect( () => {
     
    signInWithRedirect(auth, provider);

    getRedirectResult(auth)
      .then((result) => {
        if (result.user) {
          console.log("Google 로그인 성공:", result.user);
          addMember(result.user , `/`);
          navigate(-1);
        }
      })
      .catch((error) => {
        console.error("Google 로그인 실패:", error);
      });

    return ()=>{
      
    }
    // eslint-disable-next-line
  });


  return (
    <>

    <div className="container page user sign in">
      <main className="contents">
        ssssssssssssss
        
      </main>
    </div>
  </>
  )
}