import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,


import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, } from 'recoil';
import store from '../../store.js';
import {atomStore,textState,sss} from '../../atom.js';

// import axios from 'axios';
import ui from '../../ui.js';




export default function UserFolw({uInfo,user,swiper}) {
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
      <p>팔로우</p>
      <p>팔로워</p> 
      <p>
        {atomStoreVal.state.avatar.map( i=> <span style={{'width':'33%','display':'inline-flex'}} key={i}><img style={{'width':'100%','display':'inline-flex'}} src={i} /></span>)}
      </p>
    </>
  )
}