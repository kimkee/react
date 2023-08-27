import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

import {db} from '../../firebaseConfig.js';
import { collection, query, getDocs, orderBy, getDoc, doc, where } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import store from '../../store.js';
// import axios from 'axios';
import ui from '../../ui.js';


import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, } from 'recoil';


const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}


export default function User() {
  let params = useParams()
  
  console.log(params);
  let location = useLocation()
  let navigate = useNavigate();
  let uid = params.id;
  const [uInfo, setUInfo] = useState({});

  const viewUser = async (ids)=> {
    const docRef = doc(db, 'member', ids);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUInfo({
        id : docSnap.id,
        uid : docSnap.data().uid,
        nick : docSnap.data().nick,
        avatar : docSnap.data().avatar,
        email : docSnap.data().email,
        date : ui.dateForm( docSnap.data().date.toDate() ),
        liked : docSnap.data().liked.length ,
      })
      
    } else {
      console.log("No such document!");
    }

    // this.gotoSlide(0,0);
    document.querySelector(".page.user").classList.add("load");
    document.querySelector(".header .htit").innerText = uInfo.nick || ``;
    ui.loading.hide();
  }


  useEffect( () => {
    window.scrollTo(0,0);
    
    // document.querySelector(".header").classList.remove("trans");
    // window.addEventListener("scroll", scrollEvent);
    console.log( uid , params);
    viewUser(uid);
    return ()=>{
      // window.removeEventListener("scroll", scrollEvent);
    }
    // eslint-disable-next-line
  },[uInfo.nick]);

  console.log(store);
  return (
    <>
    <Outlet/>

    <div className="container page user view">
      <main className="contents">
        
        {store?.state ?
        <div className="profile">
          <div className="user">
            <span className="pic"><img src={store.state.avatar[uInfo.avatar]} className="img" /></span>
            <div className="info">
              <div className="num b"><b className="n">{uInfo.bbsNum||0}</b><p className="t">Post</p></div>    
              <div className="num p"><b className="n">{uInfo.photoNum||0}</b><p className="t">Reply</p></div>    
              <div className="num l"><b className="n">{uInfo.liked||0}</b><p className="t">Liked</p></div>    
            </div>
          </div>
          <div className="desc">
            <span className="txt"><i className="fa-regular fa-calendar-days"></i> Join : {uInfo.date}</span>
            <span className="txt"><i className="fa-regular fa-envelope"></i> {uInfo.email}</span>
          </div>
          <div className="bts bot">
            <Link to="/user/signout" className="btn logout"><i className="fa-regular fa-right-from-bracket"></i>Logout</Link>
          </div>
        </div>
        :null}

      <TextInput />
      
          
      </main>
    </div>
  </>
  )
}