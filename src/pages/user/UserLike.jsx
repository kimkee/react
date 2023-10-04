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
import StarPoint from '../../components/StarPoint';




export default function UserLike({uInfo}) {

  const [atomStoreVal, setAtomStore] = useRecoilState(atomStore);


  useEffect( () => {
    console.log(uInfo);
    return ()=>{

    }
    // eslint-disable-next-line
  });
  if (!uInfo.tmdb_movie_scrap) { return false }

  return (
    <>
      <div className="movie-list user">
          
          {uInfo.tmdb_movie_scrap.length > 0 ?
          <ul className='list'>
            {uInfo.tmdb_movie_scrap.map((data,num) =>{
                const imgpath = '//image.tmdb.org/t/p/w92';
                const img = imgpath + data.poster_path;
                const tit = data.title || data.name;
                return(
                  <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                    <div className="box">
                      <Link className="cont"  to={`movie/${data.id}`}>
                        <div className="pics"><img src={`${img}`} alt={tit} onError={ui.error.poster} className='img'/></div>
                        <div className="desc">
                          <div className="tits">{data.title}</div>
                          <div className="text">{data.overview}</div>
                        </div>
                      </Link>
                      <div className="bts">
                        <button type="button" className="bt"><span><i className="fa-regular fa-close"></i></span></button>
                      </div>
                    </div>
                  </li>
                )
            }).reverse()}
            
          </ul>
          :
          <div className="nodata">
            {/* <i className="fa-solid fa-file-magnifying-glass"></i> */}
            <p> 스크랩된 컨텐츠가 없습니다.</p>
          </div>
          }
      </div>
    </>
  )
}