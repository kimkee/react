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




export default function UserLike() {

  const [atomStoreVal, setAtomStore] = useRecoilState(atomStore);


  useEffect( () => {

    return ()=>{

    }
    // eslint-disable-next-line
  });

  return (
    <>
      <div className="movie-list user">
          {/* <div className="nodata">
            <i className="fa-solid fa-file-magnifying-glass"></i>
            { <p> ‟{1}” 검색 결과가 없습니다.</p> } 
          </div> */}
          <ul className='list'>
            <li>
              {/* <ItemA data={data} cate={cate} opts={opts} /> */}
              <Link className="box" to={`/search/`}>
                <div className="cont">
                  <div className="pics"><img src={`//image.tmdb.org/t/p/w200//1uHRkB2Q00Y4i7I7KNd0jGi4OmY.jpg`} alt={1} onError={ui.error.poster} className='img'/></div>
                  <div className="desc">
                    <div className="tits">{`베니스 유령 살인사건`}</div>
                    <div className="text">{`세계적 명탐정 '에르큘 포와로'는 오랜 탐정 생활에서 은퇴하여 아름다운 도시 베니스에서 평범한 삶을 살아가고 있다. 그런 그에게 오랜 친구이자 베스트셀러 작가인 '아리아드네 올리버'가 찾아와 죽은 영혼을 부를 수 있다고 알려진 영험한 심령술사의 실체를 밝혀달라고 부탁하게 된다.핼러윈 밤, 베니스 운하 위 위치한 고풍스러운 저택의 주인이자 1년 전 사랑하는 딸을 잃고 깊은 상실에 빠진 '로웨나 드레이크'의 초대로 교령회에 참석한 이들은 미스터리한 심령술사 '조이스 레이놀즈'가 죽은 영혼의 목소리를 전하는 광경을 보며 혼란에 빠지게 된다. 갑자기 발생한 끔찍한 살인 사건에 실체 없는 용의자를 쫓던 '에르큘 포와로'는  자신의 모든 믿음이 흔들리는 경험을 하며 충격에 빠지게 되는데....`}</div>
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
                      <StarPoint point={8.4} />
                      <em><i className="fa-regular fa-heart"></i> <b>{10}</b></em>
                    </div>
                    <div className="date"><i className="fa-regular fa-calendar-days"></i> <b>{1132312}</b></div>
                  </div>
                </div>
                
              </Link>
            </li>
            <li>
              {/* <ItemA data={data} cate={cate} opts={opts} /> */}
              <Link className="box" to={`/search/`}>
                <div className="cont">
                  <div className="pics"><img src={`//image.tmdb.org/t/p/w200//1uHRkB2Q00Y4i7I7KNd0jGi4OmY.jpg`} alt={1} onError={ui.error.poster} className='img'/></div>
                  <div className="desc">
                    <div className="tits">{`베니스 유령 살인사건`}</div>
                    <div className="text">{`세계적 명탐정 '에르큘 포와로'는 오랜 탐정 생활에서 은퇴하여 아름다운 도시 베니스에서 평범한 삶을 살아가고 있다. 그런 그에게 오랜 친구이자 베스트셀러 작가인 '아리아드네 올리버'가 찾아와 죽은 영혼을 부를 수 있다고 알려진 영험한 심령술사의 실체를 밝혀달라고 부탁하게 된다.핼러윈 밤, 베니스 운하 위 위치한 고풍스러운 저택의 주인이자 1년 전 사랑하는 딸을 잃고 깊은 상실에 빠진 '로웨나 드레이크'의 초대로 교령회에 참석한 이들은 미스터리한 심령술사 '조이스 레이놀즈'가 죽은 영혼의 목소리를 전하는 광경을 보며 혼란에 빠지게 된다. 갑자기 발생한 끔찍한 살인 사건에 실체 없는 용의자를 쫓던 '에르큘 포와로'는  자신의 모든 믿음이 흔들리는 경험을 하며 충격에 빠지게 되는데....`}</div>
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
                      <StarPoint point={5} />
                      <em><i className="fa-regular fa-heart"></i> <b>{10}</b></em>
                    </div>
                    <div className="date"><i className="fa-regular fa-calendar-days"></i> <b>{1132312}</b></div>
                  </div>
                </div>
                
              </Link>
            </li>
          </ul>
      </div>
      

    </>
  )
}