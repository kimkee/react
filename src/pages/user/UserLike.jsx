import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

import {db} from '../../firebaseConfig.js';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
// import { atom } from 'recoil';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, } from 'recoil';
import store from '../../store.js';
import {atomStore,textState,sss} from '../../atom.js';

// import axios from 'axios';
import ui from '../../ui.js';
import StarPoint from '../../components/StarPoint';




export default function UserLike({uInfo}) {
  
  if (!uInfo.tmdb_movie_scrap) { return false }

  // const [atomStoreVal, setAtomStore] = useRecoilState(atomStore);
  const [newScrapMovie, setNewScrapMovie] = useState(uInfo.tmdb_movie_scrap);

  const deleteScrap = async (opts, data) => {
    ui.loading.show('glx');
    console.log(opts, data);
  
    const movie_scrap = uInfo.tmdb_movie_scrap || [data];
    const tv_scrap = uInfo.tmdb_tv_scrap || [data];
  
    uInfo.tmdb_movie_scrap = [...movie_scrap, data].filter(item => item.id != data.id);
    await setNewScrapMovie(uInfo.tmdb_movie_scrap);
  
    console.log(uInfo.tmdb_movie_scrap);
    console.log(newScrapMovie);
  
    const docRef = doc(db, 'member', uInfo.id);
    await updateDoc(docRef, {
      tmdb_movie_scrap: newScrapMovie
    }).then(() => {
      console.log("Movie 스크랩: ", uInfo.tmdb_movie_scrap);
      console.log("Movie 스크랩: ", newScrapMovie);
      ui.loading.hide();
    }).catch(e => { console.error(e); ui.loading.hide(); });
  };  

  useEffect( () => {
    console.log(uInfo , uInfo.id);
    // setNewScrapMovie( uInfo.tmdb_movie_scrap );
    return ()=>{

    }
    // eslint-disable-next-line
  },[]);
  console.log(uInfo.tmdb_movie_scrap);
  console.log(newScrapMovie);
  if (!uInfo.tmdb_movie_scrap) { return false }
  // if (!newScrapMovie) { return false }

  return (
    <>
      <div className="movie-list user">
          {/* <button onClick={()=>{console.log(newScrapMovie)}}>dsf</button> */}
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
                        <div className="dd">
                          <div className="hits">
                            {/* <StarPoint point={data.vote_average} /> */}
                            <em><i className="fa-regular fa-thumbs-up"></i> 평점 : <b>{data.vote_average}</b></em>
                          </div>
                          <div className="date"><i className="fa-regular fa-calendar-days"></i> <b>{data.release_date || data.first_air_date}</b></div>
                        </div>
                      </Link>
                      <div className="bts">
                        {store.state.userInfo.uid == uInfo.id &&
                          <button type="button" className="bt" onClick={ ()=>deleteScrap('movie',data) }><span><i className="fa-regular fa-close"></i></span></button>
                        }
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