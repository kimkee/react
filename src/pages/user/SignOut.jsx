import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

import store from '../../store.js';
import { getAuth, signOut } from 'firebase/auth';
// import axios from 'axios';
import ui from '../../ui.js';
import { supabase } from '@/supabase.js';

export default function SignOut() {
  // console.log(opts);

  let navigate = useNavigate();

  const userEmail = useRef();
  const userPassword = useRef();
  const autoLogin = useRef();

  
    
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    window.location.replace('/');
  }
  
  

  useEffect( () => {
    window.scrollTo(0,0);
    signOut();
    return ()=>{
      // window.removeEventListener("scroll", scrollEvent);
    }
    // eslint-disable-next-line
  });


  return (
    <>
    <Outlet/>

    <div className="container page user sign out">
      <main className="contents">
        
        
      </main>
    </div>
  </>
  )
}