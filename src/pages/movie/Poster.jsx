import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom'; //,useOutletContext  , useLocation, Outlet,
import ui from '../../ui.js';


// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, Autoplay,EffectFade , A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react'; //, useSwiper 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

export default function Poster({prop}) {

  let navigate = useNavigate();
  
  let params = useParams()
  console.log(params);
  let opts = params.menu
  console.log(params);
  console.log(opts);

  const postID = params.id;
  const popResize = ()=>{
    let $pop =  document.querySelector(".popup.poster");
    let pctnH =  $pop.offsetHeight || 0;
    let pbtnH =  $pop.querySelector(".pbt")?.offsetHeight || 0 ;
    let phtnH =  $pop.querySelector(".phd")?.offsetHeight || 0 ;
    pctnH = (pctnH - phtnH) || 0 ;
    console.log(pctnH  );
    $pop.querySelector(".pct").style.maxHeight = pctnH - pbtnH+"px" ; 
  }


  const [datas, setDatas] = useState(null);
  const [pstImg, pstImgSet] = useState('');
  const loopSet = ()=> datas.images.posters.length > 1 ? true : false;
  const fetchURL = `https://api.themoviedb.org/3/${opts}/${postID}?language=ko&region=kr&api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=images&include_image_language=en,null`;
  const fetchDatas = () => {
    axios.get( fetchURL ).then(response => {
      console.log("영화정보" , response.data);
      setDatas(response.data);
      let bgDm = response.data.poster_path ? response.data.poster_path : response.data.backdrop_path;
      pstImgSet('https://image.tmdb.org/t/p/w780'+bgDm);
    }).catch( e => { console.log(e); });
  };

  useEffect(() => {
    console.log(  document.querySelector(".popup.poster .pct").offsetHeight );
    fetchDatas();
    
    popResize();
    
    window.addEventListener("resize",popResize);
    document.querySelector(".popup.poster").classList.add("ani","on");
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
    <article className="pop-layer c bottom popup poster">
      <div className="pbd">
        <div className="phd">
          <div className="inr">
              <div className="ptit">{datas?.title || datas?.name}</div>
          </div>
        </div>

        <button type="button" className="btn-pop-close back" onClick={ () => { navigate(-1) } } >{/* <i className="fa-regular fa-arrow-left"></i> */}<i className="fa-regular fa-xmark"></i></button>
        
        <div className="pct">
          <main className="poptents">
            <div className="poster-box">
              {datas && datas.images.posters ? 
              <Swiper className="swiper-wrapper swiper slide" 
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, Autoplay,EffectFade, A11y]}
              spaceBetween={20}
              slidesPerView={1}
              // navigation
              loop={loopSet()}
              lazy={ {enabled: true, loadPrevNext: true, loadPrevNextAmount: 3} } // 지금 loadPrevNext 옵션이 동작 안됨 ㅡㅡ; 
              // effect={"fade"}
              // autoplay={false}
              // autoplay={{ delay: 3000 ,waitForTransition:false, pauseOnMouseEnter: true ,disableOnInteraction: true}}
              wrapperTag="ul"
              pagination={{ clickable: true ,type:'fraction'}}
              // scrollbar={{ draggable: true }}
              // initialSlide={ Math.floor( Math.random() *10  ) } // 0 ~ 9
              autoHeight={true}
              onSwiper={(swiper) => {
                console.log("initialize swiper", swiper);
                swiper.slideToLoop(params.nums , 0);
              }}
              onSlideChange={() => {/* console.log('slide change') */}} >
                <SwiperSlide tag="li">
                  <div className='box'>
                    <div  className='pics'>
                      <img src={pstImg} className="img" alt={datas?.title || datas?.name} onError={(e)=>{e.target.src=`${import.meta.env.VITE_APP_PUBLIC_URL}img/common/non_poster.png`}} loading="lazy"/>
                      <div className="lazy-preloader"><i className="fa-duotone fa-spinner"></i></div>
                    </div>
                  </div>
                </SwiperSlide>
                {
                datas.images.posters.map( (data, idx) => {  // .filter( (item, i) => i < 10 )
                  const img = 'https://image.tmdb.org/t/p/w780'+data.file_path ;
                  return (
                    <SwiperSlide tag="li" key={idx}  className="swiper-slide pbox">
                      <div className="box">
                          <div className="pics">
                            <img src={`${img}`} alt={datas?.title || datas?.name} className='img' onError={(e)=>{e.target.src=`${import.meta.env.VITE_APP_PUBLIC_URL}img/common/non_poster.png`}} loading="lazy" />
                            <div className="lazy-preloader"><i className="fa-duotone fa-spinner"></i></div>
                          </div>
                      </div>
                    </SwiperSlide>
                  )
                })
                }
              </Swiper>
              :null}

            </div>

          </main>
        </div>
      
      </div>
    </article>
  </>
  )
}
