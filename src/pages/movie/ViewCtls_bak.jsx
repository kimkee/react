import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link } from 'react-router-dom'; //,useOutletContext  , useLocation
import { supabase } from '@/supabase.js';
import getUser from '../../getUser.js';
import ui from '../../ui.js';
export default function ViewCtls({datas,postID, opts}) {
  const params = useParams();
  const navigate = useNavigate();
  const shareLink = ()=> {
    const surl = `${location.origin+location.pathname}#/${params.menu}/${postID}`;
    navigator.clipboard.writeText(surl);
    // ui.alert(`<b>${parentTit}</b><br> URL 주소를 복사했습니다 <br> <a class="under" href="${surl}" target="_blank">${surl}</a>`)
    const datatitle = datas.title || datas.name;
    if (navigator.share) {
      navigator.share({
        title: datatitle,
        text: datatitle +' 를 공유합니다.',
        url: surl,
      })
      .then(() => {
        console.log('공유 성공');
        
      })
      .catch((error) => {
        // ui.alert('공유 실패:'+ error)
        console.error('공유 실패:', error);
      });
    } else {
      ui.alert(`<b>${datatitle}</b><br> URL 주소를 복사했습니다 <br> <a class="under" href="${surl}" target="_blank">${surl}</a>`)
      console.log('Web Share API를 지원하지 않습니다.');
    }
  }
   
  const likeTog = async (e)=> {
    const btn = e.currentTarget;
    const scraped =  btn.classList.contains('on');
    console.log(scraped);
    // return
    console.log(uInfo?.email);
    
    if( uInfo?.email ){
      // ui.loading.show(`glx`);
      // const docRef = doc(db, 'member', store.state.userInfo.uid);
      datas = {
        id: datas.id,
        title: datas.title || datas.name,
        poster_path: datas.poster_path,
        // overview: datas.overview,
        vote_average: datas.vote_average,
        release_date: datas.release_date || datas.first_air_date,
      }
      let data_scrap = [];
      if (opts == `movie`){
        data_scrap = uInfo.tmdb_movie_scrap || [datas] 
      }
      if (opts == `tv`){
        data_scrap = uInfo.tmdb_tv_scrap || [datas] 
      }
      console.log(data_scrap);
      console.log(datas );

      if( isScrap ) {
        data_scrap = [...data_scrap, datas ].filter(item => item.id != postID);
        // setIsScrap(false); //삭제
      }else{
        data_scrap = [...data_scrap, datas ].filter((element, index, self) => {
          return self.findIndex(e => e.id === element.id ) === index;
        });
        // setIsScrap(true); // 추가
      }
      console.log(`수정된 데이터`);
      console.log(data_scrap);
      
      // 
      if (opts == `movie`){
        const { data, error } = await supabase
        .from('MEMBERS')
        .update({ tmdb_movie_scrap: data_scrap })
        .eq('id', uInfo.id)
        .select()
        console.log(data);
      }
      if (opts == `tv`){
        const { data, error } = await supabase
        .from('MEMBERS')
        .update({ tmdb_tv_scrap: data_scrap })
        .eq('id', uInfo.id)
        .select()
        console.log(data);
      }
      setIsScrap(!isScrap);
    }else{
      ui.confirm(`로그인이 필요합니다.<br>로그인페이지로 이동하시겠습니까? `,{
        ycb: () => {
          navigate(`/user/signin`);
        },
        ncb: () => { }
      });
    }
  }

  const inputReply = (e)=> {
    const isPop = !!e.target.closest(".poptents");
    console.log(`isPop ${isPop}`);
    const boxScroll = isPop ? ".popup.movie.view>.pbd>.pct" : "body,html";
    const $writeRev = document.querySelector("#writeRev");
    const rvPosTop = $writeRev.offsetTop;
    console.log(rvPosTop);
    ui.scrollTo( boxScroll, rvPosTop ,100, 200, ()=>{
      console.log("도착");
    });
  }
  const [uInfo, setUserInfo] = useState({});
  const [isScrap, setIsScrap] = useState('')


  useEffect(() => {
    getUser().then((data) => {
      console.log(data?.myinfo); // 얻은 사용자 데이터를 사용하세요
      
      setUserInfo(data?.myinfo);
      return data?.myinfo
    }).then(data => {
      console.log(data);
      
      setIsScrap( 
        data?.tmdb_movie_scrap?.some(item => { return item.id == postID } ) 
        ||
        data?.tmdb_tv_scrap?.some(item => { return item.id == postID } )
      );
    });

    return () => {
    
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isScrap]);

  return (
    <>
      <div className="dins">
        {/* {opts == `movie` && } */}
        <button type="button" onClick={likeTog} className={`bt bt-scrap ${isScrap ? 'on' : 'off'}`}><i className="fa-regular fa-bookmark"></i><em>스크랩</em></button>
        <button type="button" onClick={inputReply} className="bt bt-reply"><i className="fa-regular fa-pen-to-square"></i><em>리뷰</em></button>
        <button type="button" onClick={shareLink} className="bt bt-shar"><i className="fa-regular fa-share-nodes"></i><em>공유하기</em></button>
      </div>
    </>
  )
}
