import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function ViewRev({postID}) {

  console.log(postID);
  const [review, setReview] = useState(null);
  const fetchRev = `https://api.themoviedb.org/3/movie/${postID}/reviews?api_key=${process.env.REACT_APP_KEY}`;
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
        console.log(txt + "  ===============================================  " + scHt);
        if (txt < scHt) {
          ment.closest("[data-ui='elips']").classList.add("elips");
        }else{
          ment.closest("[data-ui='elips']").classList.remove("elips");
        }
      });
    }
  }

  useEffect(() => {
    fetchReview();
    
    return () => {
    
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  console.log(review);

  if(!review) return <div>Loading...</div>
  togView.set();
  return (
    <>
      {review.results.length ?
      <div className="sect revw">
        <h4 className="tts">리뷰</h4>
        <div className="ut-reply">
          <div className="rplist">
            
            <ul className="rlist a">
            {
              review.results &&
              review.results.map((rev,idx) => {
                let avatar = rev.author_details.avatar_path || "";
                // console.log(avatar);
                let nImg = avatar.replace(/^\/+/g, '');
                // console.log(nImg);
                return(
                <li key={idx}>
                  <div className="rpset">
                    <div className="user">
                      <span className="pic"><img src={nImg} alt="사진"  className="img"  onError={(e)=>{e.target.src=`${process.env.REACT_APP_PUBLIC_URL}img/common/user.png`}}/></span>
                    </div>
                    <div className="infs">
                      <div className="name">
                        <em className="nm">{rev.author_details.name || rev.author_details.username}</em>
                      </div>
                      <div className="desc">
                        <em className="time">{rev.created_at}</em>
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
