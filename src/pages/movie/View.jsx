import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom'; //,useOutletContext  
import ui from '../../ui';
import StarPoint from '../../components/StarPoint';
import ViewElips from './ViewElips';
export default function View() {

  let params = useParams()
  let navigate = useNavigate();

  
  const [cate, setCate] = useState({});
  const getCate = async ()=>{
    let cate = {
      genr:{}
    }
    await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=ko&region=kr&api_key=${process.env.REACT_APP_KEY}`).then(res =>{
      res.data.genres.forEach( d=> cate.genr[d.id] = d.name);
      // setCate(cate); 
    }).then( res =>{ setCate(cate); console.log(cate); });
  };


  const postID = params.id;
  const popResize = ()=>{
    let $pop =  document.querySelector(".pop-layer");
    let pctnH =  $pop.offsetHeight || 0;
    let pbtnH =  $pop.querySelector(".pbt")?.offsetHeight || 0 ;
    let phtnH =  $pop.querySelector(".phd")?.offsetHeight || 0 ;
    pctnH = (pctnH - phtnH) || 0 ;
    console.log(pctnH  );
    $pop.querySelector(".pct").style.height = pctnH - pbtnH+"px" ; 
  }


  const [datas, setDatas] = useState(null);
  const [review, setReview] = useState(null);
  const [casts, setCasts] = useState(null);
  const [bgImg, setBgImg] = useState('');
  
  const fetchURL = `https://api.themoviedb.org/3/movie/${postID}?language=ko&region=kr&api_key=${process.env.REACT_APP_KEY}&append_to_response=images&include_image_language=en,null`;
  const fetchDatas = () => {
    axios.get( fetchURL ).then(response => {
      console.log("영화정보" , response.data);
      setDatas(response.data);
      let bgDm = response.data.backdrop_path ? response.data.backdrop_path : response.data.poster_path;
      setBgImg('https://image.tmdb.org/t/p/w780'+bgDm);
    }).catch( e => { console.log(e); });
  };
  const fetchRev = `https://api.themoviedb.org/3/movie/${postID}/reviews?api_key=${process.env.REACT_APP_KEY}`;
  const fetchReview = () => {
    axios.get( fetchRev ).then(response => {
      console.log("리뷰들" , response.data);
      setReview(response.data);
    }).catch( e => { console.log(e); });
  };
  const castURL = `https://api.themoviedb.org/3/movie/${postID}/credits?&region=kr&language=ko&api_key=${process.env.REACT_APP_KEY}`;
  const fetchCast = () => {
    axios.get( castURL ).then(response => {
      console.log("출연,제작" , response.data);
      setCasts( response.data);
    }).catch( e => { console.log(e); });
  };

  
  const scrollEvent = ()=> {
    const scr = parseInt( document.querySelector(".popup .pct").scrollTop );
    if( scr > 50){
      document.querySelector(".popup .phd").classList.add("trans");
      document.querySelector(".floatpop")?.classList.add("on-top");
    }else{
      document.querySelector(".popup .phd").classList.remove("trans");
      document.querySelector(".floatpop")?.classList.remove("on-top");
    }
  };
  const goTop = ()=>{
    document.querySelector(".popup .pct").scrollTo(0,0);
  }
  useEffect(() => {
    console.log(  document.querySelector(".pct").offsetHeight );
    getCate();
    fetchDatas();
    fetchReview();
    fetchCast();
    popResize();
    window.addEventListener("resize",popResize);
    document.querySelector(".popup .pct").addEventListener("scroll",scrollEvent);
    // togView.set();
    ui.lock.using(true);
    return () => {
      window.removeEventListener("resize",popResize);
      console.log('컴포넌트가 화면에서 사라짐');
      ui.lock.using(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  // console.log(datas);
  // if(!datas)  return ;
  // console.log( txtHt );
  // if(!datas || !casts)  return <div><div className="ui-loading-dot on"> <div className="bx"><em><i></i></em></div> </div></div>;

  return (
  <>
    <article className="pop-layer a on bottom popup movie view">
      <div className="pbd">
        <div className="phd">
          <div className="inr">
            <div className="ptit">{datas?.title}</div>
          </div>
        </div>

        <button type="button" className="btn-pop-close back" onClick={ () => { navigate(-1) } } ><i className="fa-regular fa-arrow-left"></i>{/* <i className="fa-regular fa-xmark"></i> */}</button>
        
        <div className="bgs" style={{backgroundImage: `url(${bgImg}) `}}></div>
        <div className="pct">
          <main className="poptents">
            
            { !datas && !casts && !review  &&
              <div className="m-info"><div className="ui-loading-dot on"> <div className="bx"><em><i></i></em></div> </div></div>
            }
            { datas && casts && review && 
              <div className="m-info">
                
                <div className="info">
                  <div className="desc">
                    <p className="tit">{datas.title}</p>
                    <p className="sit">{datas.tagline}</p>
                    <p className="tio">{datas.original_title}</p>
                    <ul className="lst">
                      <li className="star">
                        <StarPoint point={datas.vote_average} />
                      </li>
                      <li className="cate">
                        {datas.genres.map( item => <em className="ico" key={item.id}> {cate.genr ? cate.genr[item.id] : null }</em> )}
                      </li>
                      <li className="vot">
                        <i className="fa-regular fa-thumbs-up"></i>
                        <b>평점</b> : {datas.vote_average} / 10
                      </li>
                      <li className="opn">
                        <i className=" fa-regular fa-camera-movie"></i>
                        <b>개봉</b> : {datas.release_date}</li>
                      <li className="tim">
                        <i className="fa-regular fa-timer"></i>
                        <b>시간</b> : {datas.runtime} 분 </li> 
                    </ul>
                  </div>
                  <div className="thum">
                    <div className="pics"><img src={'https://image.tmdb.org/t/p/w300'+datas.poster_path} alt={datas.title} className="img" onError={(e)=>{e.target.src=`${process.env.PUBLIC_URL}/img/common/non_poster.png`}}/></div>
                  </div>
                </div>
                {datas.overview ? <ViewElips overview={datas.overview}/> : null}
                
                {casts.cast.length ?
                <div className="sect cast">
                  <h4 className="tts">출연진</h4>
                  <div className="lst">
                    {
                      casts.cast.filter( (item, i) => i < 999 ).map( b => {
                        return (
                          <div key={b.cast_id} className='profile'>
                            <div className="pics"><img src={'https://image.tmdb.org/t/p/w92'+b.profile_path} alt={b.name} className="img"  onError={(e)=>{e.target.src=`${process.env.PUBLIC_URL}/img/common/user.png`}}/></div>
                            <div className="name">{b.name}</div>
                            <div className="carc">{b.character}</div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                : null}
                
                {casts.crew.length ?
                <div className="sect cast">
                  <h4 className="tts">제작진</h4>
                  <div className="lst">
                    {
                      casts.crew.filter( (item, i) => i < 999 ).map( b => {
                        return (
                          <div key={b.credit_id} className='profile'>
                            <div className="pics"><img src={'https://image.tmdb.org/t/p/w92'+b.profile_path} alt={b.name} className="img"  onError={(e)=>{e.target.src=`${process.env.PUBLIC_URL}/img/common/user.png`}}/></div>
                            <div className="name">{b.name}</div>
                            <div className="carc">{b.known_for_department}</div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                : null}


                {datas.images.posters.length ? 
                <div className="sect post">
                  <h4 className="tts">포스터</h4>
                  <div className="lst">
                  {
                    datas.images.posters.map((img,idx) => {
                      return(
                      <div key={idx} className='box'>
                        <div  className='pic'><img src={'https://image.tmdb.org/t/p/w300'+img.file_path} alt={img.name} className="img" onError={(e)=>{e.target.src=`${process.env.PUBLIC_URL}/img/common/non_poster.png`}} /></div> 
                      </div>
                      )
                    })
                  }
                  </div>
                </div>
                : null}



                {review.results.length ?
                <>
                <div className="sect revw">
                  <h4 className="tts">리뷰</h4>
                  <div className="ut-reply">
                    <div className="rplist">
                      
                      <ul className="rlist a">
                      {
                        review.results.map((rev,idx) => {
                          let avatar = rev.author_details.avatar_path || "";
                          // console.log(avatar);
                          let nImg = avatar.replace(/^\/+/g, '');
                          // console.log(nImg);
                          return(
                          <li key={idx}>
                            <div className="rpset">
                              <div className="user">
                                <span className="pic"><img src={nImg} alt="사진"  className="img"  onError={(e)=>{e.target.src=`${process.env.PUBLIC_URL}/img/common/user.png`}}/></span>
                              </div>
                              <div className="infs">
                                <div className="name">
                                  <em className="nm">{rev.author_details.name || rev.author_details.username}</em>
                                </div>
                                <div className="desc">
                                  
                                  <em className="time">{rev.created_at}</em>
                                </div>
                                <div className="ment">{rev.content}</div>
                                
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
                </> 



                : null}




                {datas.production_companies.length ? 

                <>
                



                <div className="comp">
                  {
                    datas.production_companies.map(comp => {
                      return comp.logo_path 
                      ? 
                      <span key={comp.id} className='logo'><img src={'https://image.tmdb.org/t/p/w92'+comp.logo_path} alt={comp.name} className="img" /></span> 
                      : 
                      <span key={comp.id} className='logo'>{comp.name}</span> 
                    })
                  }
                </div>
                </>
                : null
                
                }

              </div> 
              
            }

          </main>
        </div>
      
        <div class="floatpop">
          <button type="button" class="bt top" onClick={goTop}><i class="fa-solid fa-arrow-up-from-bracket"></i><em>위로</em></button>
        </div>
      </div>
    </article>
  </>
  )
}
