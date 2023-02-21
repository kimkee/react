import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import {useParams, useNavigate  } from 'react-router-dom';

export default function View() {
  let params = useParams()
  let navigate = useNavigate();
  console.log(params , params.id);
  const popResize = ()=>{
    let $pop =  document.querySelector(".pop-layer");
    // console.log($pop);
    let pctnH =  $pop.offsetHeight || 0;
    let pbtnH =  $pop.querySelector(".pbt")?.offsetHeight || 0 ;
    let phtnH =  $pop.querySelector(".phd")?.offsetHeight || 0 ;
    pctnH = (pctnH - phtnH) || 0 ;
    console.log(pctnH  );
    $pop.querySelector(".pct").style.height = pctnH - pbtnH+"px" ; 
  }











  
  useEffect(() => {
    popResize();
    window.addEventListener("resize",popResize);
    return () => {
      window.removeEventListener("resize",popResize);
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);

  return (
  <>
    <article className="pop-layer a on bottom popup photo view">
      <div className="pbd">
        <button type="button" className="btn-pop-close" onClick={ () => { navigate(-1) } } ><i className="fa-regular fa-xmark"></i></button>
        
        <div className="phd">
          <div className="inr">
            <h1 className="ptit">{params.id}</h1>
          </div>
        </div>
        <div className="pct">
          <main className="poptents">
            sdfdsfsdf
          </main>
        </div>
      </div>
    </article>
  </>
  )
}
