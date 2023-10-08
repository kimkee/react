import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link } from 'react-router-dom'; //,useOutletContext  , useLocation
import axios from 'axios';
import { db } from '../../firebaseConfig.js';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
  
  const [scrapArray, scrapArraySet] = useState();

  
  const likeTog = async (e)=> {
    const btn = e.currentTarget;
    const scraped =  btn.classList.contains('on');
    console.log(scraped);
    // return
    if( store.state.userInfo.stat == true ){
      ui.loading.show(`glx`);
      const docRef = doc(db, 'member', store.state.userInfo.uid);
      
      let data_scrap = [];
      if (opts == `movie`){
        data_scrap = userInfo.tmdb_movie_scrap || [datas] 
      }
      if (opts == `tv`){
        data_scrap = userInfo.tmdb_tv_scrap || [datas] 
      }


      if( isScrap ) {
        setIsScrap(false); //삭제
        data_scrap = [...data_scrap, datas ].filter(item => item.id != postID);
      }else{
        setIsScrap(true); // 추가
        data_scrap = [...data_scrap, datas ].filter((element, index, self) => {
          return self.findIndex(e => e.id === element.id ) === index;
        });
      }
      if (opts == `movie`){
        await updateDoc(docRef, {
          tmdb_movie_scrap: data_scrap
        }).then(() => {
          console.log("Movie 스크랩: ", datas , btn);
          ui.loading.hide();
        }).catch(e => { console.error(e); ui.loading.hide(); });
      }
      if (opts == `tv`){
        await updateDoc(docRef, {
          tmdb_tv_scrap: data_scrap
        }).then(() => {
          console.log("TV 스크랩: ", datas , btn);
          ui.loading.hide();
        }).catch(e => { console.error(e); ui.loading.hide(); });
      }

    }else{
      ui.confirm(`로그인이 필요합니다.<br>로그인페이지로 이동하시겠습니까? `,{
        ycb: () => {
          navigate(`/user/signin`);
        },
        ncb: () => {

        }
      });
    }
  }

  const inputReply = (e)=> {
    ui.alert(`준비 중 입니다.`,{
      ycb: () => {}
    });
  }
  const [userInfo, setUserInfo] = useState({});
  const [isScrap, setIsScrap] = useState('')


  useEffect(() => {
    getUser().then((userData) => {
      console.log(userData); // 얻은 사용자 데이터를 사용하세요
      setUserInfo( userData);
      return userData
    }).then(data => {
      setIsScrap( 
        data.tmdb_movie_scrap.some(item => { return item.id == postID } ) 
        ||
        data.tmdb_tv_scrap.some(item => { return item.id == postID } )
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
