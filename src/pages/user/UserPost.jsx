import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

import {db} from '../../firebaseConfig.js';
import { collection, query, getDocs, orderBy, getDoc, doc, where } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
// import { atom } from 'recoil';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, } from 'recoil';
import store from '../../store.js';
import {atomStore,textState,sss} from '../../atom.js';

// import axios from 'axios';
import ui from '../../ui.js';




export default function UserPost() {
  function TextInput() {
    const [text, setText] = useRecoilState(textState);
    const [sssVal, setSssVal] = useRecoilState(sss);
    
  
    const onChange = (event) => {
      setText(event.target.value);
      
    };
  
    return (
      <div>
        <input type="text" value={text} onChange={onChange} />
        <br />
        Echo: {text}
        <br /> {sssVal.a}
        <br /> {sssVal.b}
        
      </div>
    );
  }
  const [atomStoreVal, setAtomStore] = useRecoilState(atomStore);


  useEffect( () => {

    return ()=>{

    }
    // eslint-disable-next-line
  });

  return (
    <>
      <p>내 글</p>
      <p>댓글</p> <TextInput />
      <p>
        { store.state.userInfo.stat == true ?
          <Link to="/user/signout" className="btn logout"><i className="fa-regular fa-right-from-bracket"></i>Logout</Link>
          :null
        }
      </p>
    </>
  )
}