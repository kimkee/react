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
      <div className="nodata">
        <i className="fa-solid fa-file-magnifying-glass"></i>
        <p> 준비 중입니다.</p>
      </div>
      {/* <p style={{'text-align':'center'}}>
        {atomStoreVal.state.avatar.map( i=> <span style={{'width':'33%','display':'inline-block','text-align':'center'}} key={i}><img style={{'width':'50%','display':'inline-flex'}} src={i} /></span>)}
      </p> */}
    </>
  )
}