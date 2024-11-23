import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import ui from '../../ui.js';
import { supabase } from '@/supabase.js';
// import { getUser } from '@/getUser.js';


export default function ViewRev({postID, opts, user, myinfo}) {
  const navigate = useNavigate();
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
      // console.log(e.currentTarget);
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

  const revText = useRef('');
  const revListBox = useRef('');
  

  const revNumMax = 200;
  const [revNumNow, setRevNumNow] = useState(0)
  const autoheight = (e)=>{
    const $els = e.target;
    let tboxS;
    $els.style.height = "1rem";
    tboxS = $els.scrollHeight;
    $els.style.height = tboxS + "rem";
    const revTxtNow = revText.current.value;
    setRevNumNow( ui.commas.add(revText.current.value.length) );
      console.log( revText.current.value );
      console.log( revText.current.value.length , revNumMax  );
    if ( revTxtNow.length > revNumMax ) {
      $els.value = $els.value.slice(0, revNumMax );
      setRevNumNow( ui.commas.add(revText.current.value.length) );
      ui.alert(`감상평은 1,000글자 까지 입니다.`,{
        ycb: () => {}
      });      
    }
  }
  const checkLogin = ()=> { 
    if (user?.email) { return; }
    ui.confirm("로그인이 필요합니다.", {
      ycb: () => { navigate('/user/signin'); return; },
      ccb: () => { return; },
      ybt: "로그인 하기",
      nbt: "닫기",
    });
  }
  const sendReview = async()=>{
    // ui.alert(`준비 중 입니다.`,{
    //   ycb: () => {}
    // });

    console.log(`입력-${revText.current.value.trim()}-`);
    revText.current.focus();
    if (revText.current.value.trim() == '') {
      revText.current.value = '';
      revText.current.focus();

      return;
    }
    
    console.log(myinfo);
    console.log(user);
    
    const insertData = { 
      user_num : myinfo?.id,
      user_name : user?.user_metadata.full_name || user?.user_metadata.user_name,
      created_at : new Date().toISOString(),
      updated_at : new Date().toISOString(),
      content : ui.textHtml( revText.current.value , "incode"),
      profile_picture : user?.user_metadata.avatar_url, 
      provider : user?.app_metadata.provider,
      email : user?.email, 
      mvtv : opts,
      idmvtv : postID 
    }
    console.table(insertData);

    const { data, error } = await supabase
      .from('REVIEW_TMDB')
      .insert([ insertData ])
      .select('*')
    if (error) {
      console.error("리뷰 입력 에러 Error inserting data:", error.message);
    } else {
      console.table("리뷰 입력 성공 Data inserted successfully:");
      console.table(data[0]);
      gethRevs(postID);
      revText.current.value = '';
      revListBox.current.focus();
    }
  }

  const [reviewArr, setReviewArr] = useState();
  const gethRevs = async ()=> {
    console.log(postID);
    const { data: reviews, error: reviewsError }  = await supabase.from('REVIEW_TMDB').select("*").eq('mvtv', opts).eq('idmvtv', postID).order('created_at', { ascending: false });
    setReviewArr(reviews)
    console.log(reviewArr );
    
  }


  useEffect(() => {
    fetchReview();
    console.log(postID);
    
    gethRevs(postID);
    return () => {
    
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[postID]);

  // console.log(review);

  if(!review) return <div>Loading...</div>
  togView.set();
  return (
    <>
      <div className="sect revk" id='writeRev'>
        <h4 className="tts">리뷰</h4>
        <div className="form textarea">
          <textarea onInput={autoheight} onFocus={checkLogin} ref={revText} className="rtext"  placeholder={`${user?.email ? '감상평을 남겨보세요. (최대200자)':'로그인 후 감상평을 남겨보세요. (최대200자)'}`}></textarea>
          <span className="num"><i className="i">{revNumNow}</i><b className="n">{ui.commas.add(revNumMax)}</b></span>
          <div className="bts">
            <button type="button" className="btn sm btsend" disabled={ revNumNow < 1 } onClick={sendReview}><i className="fa-regular fa-paper-plane"></i> <em>등록</em></button>
          </div>
        </div>
      </div>
      <div className="sect revw" ref={revListBox}>
        {reviewArr ?
        <div className="ut-reply">
          <div className="rplist">
            <ul className="rlist b">
            {
              reviewArr &&
              reviewArr.map((rev,idx) => {
                const rvTxt = rev.content.replace(/\n/g, "<br>");
                return(
                <li key={idx} idx={rev.id}  user_num={rev.user_num}>
                  {/* <p>{rev.id} : {rev.user_num} : {rev.user_name}</p>
                  <p>{ui.dateForm(rev.created_at)} =  {ui.dateForm(rev.updated_at)}</p>
                  <p>{rvTxt}</p>
                  <p><img src={rev.profile_picture} alt="" style={{width:"32px"}} /> {rev.provider} : {rev.email}</p>
                 */}
                
                  <div className="rpset">
                    <div className="user">
                      <span className="pic"><img src={rev.profile_picture} alt="사진"  className="img" onError={ui.error.user} /></span>
                    </div>
                    <div className="infs">
                      <div className="name">
                        <em className="nm">{rev.user_name}</em>
                      </div>
                      <div className="desc">
                        <em className="time">{ ui.dateForm(rev.created_at) }</em>
                      </div>
                      <div data-ui="elips" className="mbox">
                        <div className="ment txt" onClick={togView.evt}  dangerouslySetInnerHTML={{ __html: rvTxt }} ></div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
            </ul>
          </div>
        </div>
        :
        null
        }
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
                const rvTxt = rev.content.replace(/\n/g, "<br>");
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
                        <div className="ment txt" onClick={togView.evt}  dangerouslySetInnerHTML={{ __html: rvTxt }} ></div>
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
