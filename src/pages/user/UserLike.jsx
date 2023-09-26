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
  if (!uInfo.tmdb_movie_scrap) { return false
    
  }
  return (
    <>
      <div className="movie-list user">
          {/* <div className="nodata">
            <i className="fa-solid fa-file-magnifying-glass"></i>
            { <p> ‟{1}” 검색 결과가 없습니다.</p> } 
          </div> */}
          {uInfo.tmdb_movie_scrap.length > 0 &&
          <ul className='list'>
            {uInfo.tmdb_movie_scrap.map((data,num) =>{
                const imgpath = '//image.tmdb.org/t/p/w200';
                const img = imgpath + data.poster_path;
                const bgs = data.backdrop_path ? imgpath + data.backdrop_path : imgpath + data.poster_path;
                const tit = data.title || data.name;
                return(
                  <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                    <Link className="box" to={`/search/`}>
                      <div className="cont">
                        <div className="pics"><img src={`${img}`} alt={tit} onError={ui.error.poster} className='img'/></div>
                        <div className="desc">
                          <div className="tits">{data.title}</div>
                          <div className="text">{data.overview}</div>
                        </div>
                      </div>
                      <div className="info">
                        <div className="dd">
                          <div className="cate">
                            <span className="txt"><em className="ico"> 코미디 </em><em className="ico"> 드라마 </em><em className="ico"> 로맨스 </em></span>
                          </div>
                        </div>
                        <div className="dd">
                          <div className="hits">
                            <StarPoint point={data.vote_average} />
                            <em><i className="fa-regular fa-heart"></i> <b>{data.vote_average}</b></em>
                          </div>
                          <div className="date"><i className="fa-regular fa-calendar-days"></i> <b>{data.release_date || data.first_air_date}</b></div>
                        </div>
                      </div>
                      
                    </Link>
                  </li>
                )
            })}
            
          </ul>
          }
      </div>
      

    </>
  )
}