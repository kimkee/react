import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ui from '../../ui.js';
export default function ViewRev({postID, opts}) {

  // console.log(postID);
  const [review, setReview] = useState(null);
  const fetchRev = `https://api.themoviedb.org/3/${opts}/${postID}/reviews?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
  const fetchReview = () => {
    axios.get( fetchRev ).then(response => {
      console.log("리뷰들" , response.data);
      setReview(response.data);
    }).catch( e => { console.log(e); });
  };

  const togView = {
    evt:(e)=>{
      console.log(e.currentTarget);
      const btn = e.currentTarget;
      const box = btn.closest("[data-ui='elips']");
      if( box.classList.contains("open")) {
        box.classList.remove("open");
      }else{
        box.classList.add("open");
      }
    },
    set:(e)=>{
      const ments = document.querySelectorAll(".ut-reply ul.rlist>li .rpset .ment");

      ments.forEach( ment =>{
        const txt = ment.offsetHeight ;
        const scHt = ment.scrollHeight;
        // console.log(txt + "  ===============================================  " + scHt);
        if (txt < scHt) {
          ment.closest("[data-ui='elips']").classList.add("elips");
        }else{
          ment.closest("[data-ui='elips']").classList.remove("elips");
        }
      });
    }
  }

  
  

  const [revNumNow, setRevNumNow] = useState(0)
  const autoheight = (e)=>{
    const $els = e.target;
    let tboxS;
    $els.style.height = "1rem";
    tboxS = $els.scrollHeight;
    $els.style.height = tboxS + "rem";

    setRevNumNow( new Intl.NumberFormat().format($els.value.length) );
    const revNumMax = 1000;
      console.log($els.value);
      console.log(ui.commasDel(revNumNow) , revNumMax  );
    if ( ui.commasDel(revNumNow) > revNumMax ) {
      $els.value = $els.value.slice(0, revNumMax );
      setRevNumNow( new Intl.NumberFormat().format($els.value.length) );
      ui.alert(`감상평은 1,000글자 까지 입니다.`,{
        ycb: () => {}
      });      
    }
  }

  const sendReview = ()=>{
    ui.alert(`준비 중 입니다.`,{
      ycb: () => {}
    });
  }

  useEffect(() => {
    fetchReview();
    
    return () => {
    
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // console.log(review);

  if(!review) return <div>Loading...</div>
  togView.set();
  return (
    <>
      <div className="sect revk" id='writeRev'>
        <h4 className="tts">리뷰</h4>
        <div className="form textarea">
          <textarea onInput={autoheight} className="rtext" placeholder="감상평을 남겨보세요. (최대1000자)"></textarea>
          <span className="num"><i className="i">{revNumNow}</i>/<b className="n">1,000</b></span>
          <div className="bts">
            <button type="button" className="btn sm btsend" onClick={sendReview}>등록하기(준비중)</button>
          </div>
        </div>
      </div>

      {review.results.length ?
      <div className="sect revw">
        <div className="ut-reply">
          <div className="rplist">
            
            <ul className="rlist a">
            {
              review.results &&
              review.results.map((rev,idx) => {
                const avatar = rev.author_details.avatar_path || "";
                // console.log(avatar);
                const nImg = '//image.tmdb.org/t/p/w45_and_h45_face/'+avatar ;
                // console.log(nImg);
                return(
                <li key={idx}>
                  <div className="rpset">
                    <div className="user">
                      <span className="pic"><img src={nImg} alt="사진"  className="img" onError={ui.error.user} /></span>
                    </div>
                    <div className="infs">
                      <div className="name">
                        <em className="nm">{rev.author_details.name || rev.author_details.username}</em>
                      </div>
                      <div className="desc">
                        <em className="time">{ ui.dateForm( new Date( rev.created_at) ) }</em>
                      </div>
                      <div data-ui="elips" className="mbox">
                        <div className="ment txt" onClick={togView.evt}>{rev.content}</div>
                      </div>
                    </div>
                  </div>
                </li>
                )
              })
            }
            
            </ul>
            
          </div>
        </div>
      </div>
      :null}
      </> 

  )
}
