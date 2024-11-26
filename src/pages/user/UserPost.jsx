import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

// import { atom } from 'recoil';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, } from 'recoil';
import {postCout} from '../../atom.js';

// import axios from 'axios';
import ui from '../../ui.js';

import { supabase } from '@/supabase.js';
import StarPoint from '../../components/StarPoint.jsx';


export default function UserPost({uInfo,user,swiper}) {
  const [postCoutVal, setPostCoutVal] = useRecoilState(postCout);
  /* 내 리뷰 조회 */
  const [myReview, setMyReview] = useState([]);
  const getMyReviews = async () => {
    const { data, error } = await supabase
      .from('TMDB_REVIEW')
      .select('*')
      .eq('user_id', uInfo.user_id)
      .order('updated_at', { ascending: false });
    console.log(data);
    setMyReview(data);
    setPostCoutVal((prevState) => ({ ...prevState, reviews: myReview.length  }));
    if(error) console.error(error);
  }
  const realtimeChannel = useRef('');
  const setupRealtimeListener = (tableName) => {
    realtimeChannel.current = supabase.channel(`public:${tableName}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, () => {
        getMyReviews();
        console.log(`${tableName} 업데이트`);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to ${tableName} changes`);
        }
      });
  };
  /* 내 리뷰삭제 */
  const deleteReview = async (opts, id) => {
    console.log(opts, id);
    const { data, error }  = await supabase.from('TMDB_REVIEW').delete().eq('id', id);
    if (error) {
      console.error("내 리뷰 삭제 에러", error.message);
    } else {
      console.table("내 리뷰 삭제 성공");
      getMyReviews();
      swiper?.update();
    }
  }
  useEffect( () => {
    getMyReviews();
    window.addEventListener('hashchange', getMyReviews);
    setupRealtimeListener('TMDB_REVIEW');
    return ()=>{
      window.removeEventListener('hashchange', getMyReviews);
    }
    // eslint-disable-next-line
  },[uInfo]);
  // if(!myReview) return
  return (
    <>
      <ul className="mrvlist">
        {/* <button className="btn" onClick={ () => { 
          setPostCoutVal((prevState) => ({ ...prevState, reviews: myReview.length  }));
         } }>AAA</button> */}
        {myReview.length > 0 ? myReview.map((data,num)=>{
          const imgpath = '//image.tmdb.org/t/p/w92';
          const img = imgpath + data.poster_path;
          return (
            <li key={num} idmvtv={data.idmvtv}>
              <div className="box">
                <Link className="cont" to={`${data.mvtv}/${data.idmvtv}`}>
                  <div className="pics"><img src={`${img}`} alt={data.title} onError={ui.error.poster} className='img'/></div>
                  <div className="dd">
                    <div className="tits">{ui.textHtml(data.content,'decode')}</div>
                    <div className="hits">
                      <StarPoint point={data.vote_average} />
                      <span className="date"> <b>{ui.dateForm(data.created_at,'short')}</b></span>
                    </div>
                  </div>
                </Link>
                { uInfo?.user_id == user?.id &&
                <div className="bts">
                  {/* <button type="button" className="bt" onClick={ ()=> {} }>
                    <i className="fa-solid fa-edit"></i>
                  </button> */}
                  <button type="button" className="bt" onClick={ ()=> ui.confirm('삭제할까요?',{ybt:'네',nbt:'아니오', ycb:()=>deleteReview(data.mvtv, data.id)}) }>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
                }
              </div>
            </li>
          )
        }):
        <div className="nodata">
          <i className="fa-solid fa-person-digging"></i>
          <p>작성하신 리뷰가 없습니다</p>
        </div>}
      </ul>
      
      {/* <p>내 글</p>
      <p>댓글</p> <TextInput />
      <p>
        { user?.id == uInfo.user_id ?
          <Link to="/user/signout" className="btn logout"><i className="fa-regular fa-right-from-bracket"></i>Logout</Link>
          :null
        }
      </p> */}
    </>
  )
}