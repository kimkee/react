import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom'; 
import ViewInfo from './ViewInfo';


export default function Detail({prop}) {

  let params = useParams();
  
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

        <ViewInfo user={prop.user} myinfo={prop.myinfo} postID={postID} />

      </main>
    </div>

  </>
  )
}