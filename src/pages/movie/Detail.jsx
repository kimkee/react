import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,
import axios from 'axios';
import ui from '../../ui.js';
import ViewInfo from './ViewInfo';


export default function Detail() {
  // console.log(opts);

  let params = useParams()
  
  console.log(params);
  let location = useLocation()
  // let navigate = useNavigate();
  // let opts = params.id;
  const cateID = params.cate;
  // cateID === undefined && navigate(`/${opts}/0`) ;
  // console.log(cateID);

  console.log( params , location.pathname)
  let cateList;
  // cateList = cateID !== '0' ? `&with_genres=${cateID}` : ``;
  
  const postID = params.id;
  
  useEffect( () => {

    window.scrollTo(0,0);

    return ()=>{
      
    }
    // eslint-disable-next-line
  },[]);



  return (
    <>
    <Outlet/>

    <div className="container page detail">
      <main className="contents">

        <ViewInfo postID={postID} />

      </main>
    </div>

  </>
  )
}