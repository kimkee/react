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


export default function UserLike({uInfo,user,swiper}) {
  
  // if (!uInfo.tmdb_movie_scrap) { return false }

  // const [atomStoreVal, setAtomStore] = useRecoilState(atomStore);
  const [newScrapMovie, setNewScrapMovie] = useState([]);
  const [media, setMedia] = useState('movie');

  const mediaList = (opts) => {
    console.log(opts);
    opts == 'movie' && setNewScrapMovie( uInfo.tmdb_movie_scrap );
    opts == 'tv' && setNewScrapMovie( uInfo.tmdb_tv_scrap );
    setMedia(opts);
    setTimeout(() => swiper.update() , 100); 
    console.log(newScrapMovie);

  };

  const deleteScrap = async (opts, data) => {
    
  };  

  useEffect( () => {
    console.log(uInfo , user);
    mediaList('movie');
    setNewScrapMovie( uInfo.tmdb_movie_scrap )
    return ()=>{

    }
    // eslint-disable-next-line
  },[uInfo]);
  // console.log(newScrapMovie);
  // if (!uInfo ) { return false }
  // if (!newScrapMovie) { return false }

  return (
    <>
      <div className="movie-list user">
        <div className="tabs">
          <button className={`btn ${media == 'movie' ? 'active':''}`} onClick={()=>{ mediaList('movie') }}><em>Movie</em> <i>{uInfo.tmdb_movie_scrap.length}</i></button>
          <button className={`btn ${media == 'tv'    ? 'active':''}`} onClick={()=>{ mediaList('tv')    }}><em>TV</em> <i>{uInfo.tmdb_tv_scrap.length}</i></button>
        </div>
        {newScrapMovie.length ?
        <ul className='list'>
          {newScrapMovie.map((data,num) =>{
              const imgpath = '//image.tmdb.org/t/p/w92';
              const img = imgpath + data.poster_path;
              const tit = data.title || data.name;
              return(
                <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                  <div className="box">
                    <Link className="cont"  to={`${media}/${data.id}`}>
                      <div className="pics"><img src={`${img}`} alt={tit} onError={ui.error.poster} className='img'/></div>
                      <div className="desc">
                        <div className="tits">{data.title || data.name}</div>
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
                      { uInfo?.user_id == user?.id &&
                        <button type="button" className="bt" onClick={ ()=> ui.confirm('삭제할까요?',{ybt:'네',nbt:'아니오', ycb:()=>deleteScrap(media, data)}) }><span><i className="fa-regular fa-close"></i></span></button>
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