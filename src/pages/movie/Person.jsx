import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link} from 'react-router-dom'; //,useOutletContext  , useLocation, Outlet, Link
import ui from '../../ui';


/* 
import { Navigation, Pagination, Scrollbar, Autoplay,EffectFade , A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'; //, useSwiper 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
 */


export default function Person() {
  let params = useParams()
  let navigate = useNavigate();
  const opts = params.opts;

  console.log(params);

  const personID = params.nums;
  const popResize = ()=>{
    let $pop =  document.querySelector(".popup.person");
    let pctnH =  $pop.offsetHeight || 0;
    let pbtnH =  $pop.querySelector(".pbt")?.offsetHeight || 0 ;
    let phtnH =  $pop.querySelector(".phd")?.offsetHeight || 0 ;
    pctnH = (pctnH - phtnH) || 0 ;
    console.log(pctnH  );
    $pop.querySelector(".pct").style.maxHeight = pctnH - pbtnH+"px" ; 
  }


  const [datas, setDatas] = useState(null);
  const [casts, setCasts] = useState(null);
  const [photos, setPhotos] = useState(null);


  const personURL = `https://api.themoviedb.org/3/person/${personID}?language=ko&region=kr&api_key=${process.env.REACT_APP_KEY}`;
  const fetchPerson = () => {
  axios.get( personURL ).then(response => {
      console.log("인물 정보" , response.data);
      setDatas(response.data);
      
    }).catch( e => { console.log(e); });
  };
  const creditsURL = `https://api.themoviedb.org/3/person/${personID}/movie_credits?language=ko&region=kr&api_key=${process.env.REACT_APP_KEY}`;
  const fetchCredits = () => {
  axios.get( creditsURL ).then(response => {
      console.log("인물 출연작" , response.data);
      setCasts(response.data);
    }).catch( e => { console.log(e); });
  };
  const photoURL = `https://api.themoviedb.org/3/person/${personID}/images?language=ko&region=kr&api_key=${process.env.REACT_APP_KEY}`;
  const fetchPhotos = () => {
  axios.get( photoURL ).then(response => {
      console.log("인물 사진" , response.data);
      setPhotos(response.data);
    }).catch( e => { console.log(e); });
  };

  useEffect(() => {
  console.log(  document.querySelector(".popup.person .pct").offsetHeight );
  fetchPerson();
  fetchCredits();
  fetchPhotos();

  popResize();

  window.addEventListener("resize",popResize);
  document.querySelector(".popup.person").classList.add("ani","on");
  ui.lock.using(true); 

  return () => {
      window.removeEventListener("resize",popResize);
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
    
    <article className="pop-layer c bottom popup person">
      <div className="pbd">
      <div className="phd">
          <div className="inr">
              <div className="ptit">{/* datas?.name */}</div>
          </div>
      </div>

      <button type="button" className="btn-pop-close back" onClick={ () => { navigate(-1) } } >{/* <i className="fa-regular fa-arrow-left"></i> */}<i className="fa-regular fa-xmark"></i></button>
      
      <div className="pct">
          <main className="poptents">
          
            { !datas && !casts && !photos &&
              <div className="m-info"><div className="ui-loading-dot on"> <div className="bx"><em><i></i></em></div> </div></div>
            }
            { datas && casts && photos &&
              <div className="m-info">
                
                <div className="info">
                  <div className="desc">
                    
                    {datas.title && <p className="tit">{datas.title}</p>}
                    {datas.original_title && <p className="tio">{datas.original_title}</p>}

                    {datas.name && <p className="tit">{datas.name}</p>}
                    {datas.known_for_department && <p className="tio">{datas.known_for_department}</p>}
                    {datas.original_name && <p className="tio">{datas.original_name}</p>}

                    <div className="star">
                      
                    </div>
                    <div className="cate">
                      
                    </div>
                    <ul className="lst">
                      {datas.birthday && 
                        <li className="vot"><i className="fa-regular fa-calendar-days"></i>  {datas.birthday}</li>
                      }
                      {datas.place_of_birth && 
                        <li className="vot"><i className="fa-regular fa-location-dot"></i>  {datas.place_of_birth}</li>
                      }
                      <li className="vot"> 
                        <i className="fa-regular fa-star"></i> {datas.popularity} / 100
                      </li>
                      {datas.homepage && 
                      <li className="web">
                        <i className="fa-regular fa-globe"></i> <a  className="lk" href={datas.homepage } target="_blank" rel="noopener noreferrer">{datas.homepage}</a>
                      </li>} 
                    </ul>
                  </div>
                  <div className="thum">
                    <div className="pics"><img src={`https://image.tmdb.org/t/p/w780${datas.profile_path}`} alt={datas.title} className="img" onError={(e)=>{e.target.src=`${process.env.REACT_APP_PUBLIC_URL}img/common/non_poster.png`}}/></div>
                  </div>
                </div>
                
                {photos.profiles.length ? 
                <div className="sect post">
                  <h4 className="tts">사진 </h4>
                  <div className="lst">
                    {
                    photos.profiles.map((item,idx) => {
                      return(
                      <div key={idx} className='box' data-index={idx+1}>
                        <div to={`/list/${opts}/0/${item.id}`}  className='pic'><img src={'https://image.tmdb.org/t/p/w185'+item.file_path} alt={item.title} className="img" onError={(e)=>{e.target.src=`${process.env.REACT_APP_PUBLIC_URL}img/common/non_poster.png`}} loading="lazy" /></div> 
                      </div>
                      )
                    })
                    }
                  </div>
                </div>
                : null}
                
                {casts.cast.length ? 
                <div className="sect post">
                  <h4 className="tts">출연작 </h4>
                  <div className="lst">
                    {
                    casts.cast.map((item,idx) => {
                      return(
                      <div key={idx} className='box' data-index={idx+1}>
                        <Link to={`/movie/${item.id}`}  className='pic'><img src={'https://image.tmdb.org/t/p/w185'+item.poster_path} alt={item.title} className="img" onError={(e)=>{e.target.src=`${process.env.REACT_APP_PUBLIC_URL}img/common/non_poster.png`}} loading="lazy" /></Link> 
                      </div>
                      )
                    })
                    }
                  </div>
                </div>
                : null}

                {casts.crew.length ? 
                <div className="sect post">
                  <h4 className="tts">제작참여 </h4>
                  <div className="lst">
                    {
                    casts.crew.map((item,idx) => {
                      return(
                      <div key={idx} className='box' data-index={idx+1}>
                        <Link to={`/movie/${item.id}`}  className='pic'><img src={'https://image.tmdb.org/t/p/w185'+item.poster_path} alt={item.title} className="img" onError={(e)=>{e.target.src=`${process.env.REACT_APP_PUBLIC_URL}img/common/non_poster.png`}} loading="lazy" /></Link> 
                      </div>
                      )
                    })
                    }
                  </div>
                </div>
                : null}
              

              </div> 
              
            } 
              
          </main>
      </div>
      
      </div>
    </article>
    </>
  )
}
