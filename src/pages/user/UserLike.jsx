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


export default function UserLike({uInfo,swiper}) {
  
  // if (!uInfo.tmdb_movie_scrap) { return false }

  // const [atomStoreVal, setAtomStore] = useRecoilState(atomStore);
  const [newScrapMovie, setNewScrapMovie] = useState([
    {
      "adult": false,
      "backdrop_path": "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
      "belongs_to_collection": null,
      "budget": 8500000,
      "genres": [
          {
              "id": 53,
              "name": "스릴러"
          },
          {
              "id": 80,
              "name": "범죄"
          }
      ],
      "homepage": "",
      "id": 680,
      "imdb_id": "tt0110912",
      "origin_country": [
          "US"
      ],
      "original_language": "en",
      "original_title": "Pulp Fiction",
      "overview": "펌프킨와 허니 버니가 레스토랑에서 강도 행각을 벌이기 시작한다. 빈센트와 그 동료 쥴스는 두목의 금가방을 찾기 위해 다른 건달이 사는 아파트를 찾아간다. 마르셀러스는 부치에게 돈을 주며 상대 선수에게 져 주라고 하지만 부치는 상대 선수를 때려 눕히고 도망치다, 어릴 때 아버지에게 물려받은 시계를 찾기 위해 아파트로 향한다. 아무런 상관 없이 보이는 이 사건들이 서로 얽히고 섥히면서 예상치 못한 인과관계가 만들어지는데...",
      "popularity": 114.597,
      "poster_path": "/6lXRHGoEbnnBUKsuqpL9JxD4DzT.jpg",
      "production_companies": [
          {
              "id": 14,
              "logo_path": "/m6AHu84oZQxvq7n1rsvMNJIAsMu.png",
              "name": "Miramax",
              "origin_country": "US"
          },
          {
              "id": 59,
              "logo_path": "/yH7OMeSxhfP0AVM6iT0rsF3F4ZC.png",
              "name": "A Band Apart",
              "origin_country": "US"
          },
          {
              "id": 216,
              "logo_path": "/iKPzC6YxqNAk6fMoTtFhIF5p6yw.png",
              "name": "Jersey Films",
              "origin_country": "US"
          }
      ],
      "production_countries": [
          {
              "iso_3166_1": "US",
              "name": "United States of America"
          }
      ],
      "release_date": "1994-09-10",
      "revenue": 213928762,
      "runtime": 154,
      "spoken_languages": [
          {
              "english_name": "English",
              "iso_639_1": "en",
              "name": "English"
          },
          {
              "english_name": "Spanish",
              "iso_639_1": "es",
              "name": "Español"
          },
          {
              "english_name": "French",
              "iso_639_1": "fr",
              "name": "Français"
          }
      ],
      "status": "Released",
      "tagline": "쿠엔틴 타란티노만의 블랙 코미디",
      "title": "펄프 픽션",
      "video": false,
      "vote_average": 8.488,
      "vote_count": 27874,
      "images": {
        "backdrops": [
            {
                "aspect_ratio": 1.778,
                "height": 1480,
                "iso_639_1": null,
                "file_path": "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
                "vote_average": 5.602,
                "vote_count": 34,
                "width": 2631
            },
            {
                "aspect_ratio": 1.777,
                "height": 1688,
                "iso_639_1": null,
                "file_path": "/9pGM43a9VmXxwIxmhJoiDkcB2hT.jpg",
                "vote_average": 5.334,
                "vote_count": 11,
                "width": 3000
            }
        ],
        "logos": [
            {
                "aspect_ratio": 4.539,
                "height": 360,
                "iso_639_1": "en",
                "file_path": "/kpuNKsIzVbK3LDVo4iOJDAY0y7d.png",
                "vote_average": 5.388,
                "vote_count": 4,
                "width": 1634
            }
        ],
        "posters": [
            {
                "aspect_ratio": 0.667,
                "height": 2100,
                "iso_639_1": "en",
                "file_path": "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
                "vote_average": 5.866,
                "vote_count": 38,
                "width": 1400
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "en",
                "file_path": "/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
                "vote_average": 5.634,
                "vote_count": 14,
                "width": 2000
            }
        ]
      }
    }
  ]);
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
    console.log(uInfo , uInfo.id);
    // mediaList('movie');
    // setNewScrapMovie( uInfo.tmdb_movie_scrap )
    return ()=>{

    }
    // eslint-disable-next-line
  },[]);
  // console.log(newScrapMovie);
  // if (!uInfo ) { return false }
  // if (!newScrapMovie) { return false }

  return (
    <>
      <div className="movie-list user">
        <div className="tabs">
          <button className={`btn ${media == 'movie' ? 'active':''}`} onClick={()=>{ mediaList('movie') }}><em>Movie</em> <i>{0}</i></button>
          <button className={`btn ${media == 'tv'    ? 'active':''}`} onClick={()=>{ mediaList('tv')    }}><em>TV</em> <i>{0}</i></button>
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
                      {store.state.userInfo.uid == uInfo.id &&
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