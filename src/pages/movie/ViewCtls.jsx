import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link } from 'react-router-dom'; //,useOutletContext  , useLocation
import axios from 'axios';

import ui from '../../ui.js';
export default function ViewCtls({datas,postID, opts}) {
  const params = useParams();

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
  
  const likeTog = (e)=> {
    console.log(e.currentTarget);
    const btn = e.currentTarget;
    ui.alert(`준비 중 입니다.`,{
      ycb: () => btn.classList.toggle('on')
    });
  }
  const inputReply = (e)=> {
    ui.alert(`준비 중 입니다.`,{
      ycb: () => {}
    });
  }


  useEffect(() => {
    
    return () => {
    
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <div className="dins">
        <button type="button" onClick={likeTog} className="bt bt-scrap"><i className="fa-regular fa-bookmark"></i><em>스크랩</em></button>
        <button type="button" onClick={inputReply} className="bt bt-reply"><i className="fa-regular fa-pen-to-square"></i><em>리뷰</em></button>
        <button type="button" onClick={shareLink} className="bt bt-shar"><i className="fa-regular fa-share-nodes"></i><em>공유하기</em></button>
      </div>
    </>
  )
}
