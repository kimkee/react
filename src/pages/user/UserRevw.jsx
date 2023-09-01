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




export default function UserRevw() {

  const [atomStoreVal, setAtomStore] = useRecoilState(atomStore);


  useEffect( () => {

    return ()=>{

    }
    // eslint-disable-next-line
  });

  return (
    <>
      <p>내 리뷰들</p>
      <p>
        <Link to="/user/signout" className="btn logout"><i className="fa-regular fa-right-from-bracket"></i>Logout</Link>
      </p>
      {atomStoreVal.state.avatar.map( i=> <span style={{'width':'33%','display':'inline-flex'}} key={i}><img style={{'width':'100%','display':'inline-flex'}} src={i} /></span>)}
    </>
  )
}