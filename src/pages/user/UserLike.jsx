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




export default function UserLike() {

  const [atomStoreVal, setAtomStore] = useRecoilState(atomStore);


  useEffect( () => {

    return ()=>{

    }
    // eslint-disable-next-line
  });

  return (
    <>
      <p>찜 리스트</p>
      

      <div className="nodata">
        <p className="msg">좋아요</p>
      </div>
    </>
  )
}