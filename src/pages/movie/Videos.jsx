import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom'; //,useOutletContext  , useLocation, Outlet,
import ui from '../../ui.js';


// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules'; //,EffectFade 
import { Swiper, SwiperSlide } from 'swiper/react'; //, useSwiper 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

export default function Videos({prop}) {

  
  let navigate = useNavigate();
  
  let params = useParams()
  console.log(params);
  let opts = params.menu
  console.log(params);
  console.log(opts);


  
  const postID = params.id;
  const popResize = ()=>{
    let $pop =  document.querySelector(".popup.videos");
    let pctnH =  $pop.offsetHeight || 0;
    let pbtnH =  $pop.querySelector(".pbt")?.offsetHeight || 0 ;
    let phtnH =  $pop.querySelector(".phd")?.offsetHeight || 0 ;
    pctnH = (pctnH - phtnH) || 0 ;
    console.log(pctnH  );
    $pop.querySelector(".pct").style.maxHeight = pctnH - pbtnH+"px" ; 
  }


  const [movs, setMovs] = useState(null);
  const loopSet = ()=> movs.results.length > 1 ? true : false;
  const movURL = `https://api.themoviedb.org/3/${opts}/${postID}/videos?language=ko&region=kr&language=ko&api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
  const fetchMov = () => {
    axios.get( movURL ).then(response => {
      console.log("영상" , response.data);
      setMovs( response.data);
    }).catch( e => { console.log(e); });
  };

  useEffect(() => {
    console.log(  document.querySelector(".popup.videos .pct").offsetHeight );
    fetchMov();
    
    popResize();
    
    window.addEventListener("resize",popResize);
    document.querySelector(".popup.videos").classList.add("ani","on");
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
    
    <article className="pop-layer b bottom popup videos">
      <div className="pbd">
        <div className="phd">
          <div className="inr">
              <div className="ptit">{movs?.title || movs?.name}</div>
          </div>
        </div>

        <button type="button" className="btn-pop-close back" onClick={ () => { navigate(-1) } } >{/* <i className="fa-regular fa-arrow-left"></i> */}<i className="fa-regular fa-xmark"></i></button>
        
       
        <div className="pct">
          <main className="poptents">
            <div className="videos-box">
              {movs && movs.results.length ? 
              <Swiper className="swiper-wrapper swiper slide" 
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, Autoplay,EffectFade, A11y]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              loop={loopSet()}
              lazy={ {enabled: true, loadPrevNext: true, loadPrevNextAmount: 3} } // 지금 loadPrevNext 옵션이 동작 안됨 ㅡㅡ; 
              observeParents = {true}
              observeSlideChildren = {true}
              observer = {true}
              // effect={"fade"}
              // autoplay={false}
              // autoplay={{ delay: 3000 ,waitForTransition:false, pauseOnMouseEnter: true ,disableOnInteraction: true}}
              wrapperTag="ul"
              pagination={{ clickable: true ,type:'fraction'}}
              // scrollbar={{ draggable: true }}
              // initialSlide={ Math.floor( Math.random() *10  ) } // 0 ~ 9
              // autoHeight={true}
              onSwiper={(swiper) => {
                console.log("initialize swiper", swiper);
                swiper.slideTo(params.nums , 0);
              }}
              onSlideChange={() => {/* console.log('slide change') */}} >
                {
                movs.results.filter( (item, i) => i < 100 ).reverse().map( (data, idx) => {  // .filter( (item, i) => i < 10 )
                  return (
                    <SwiperSlide tag="li" key={idx} className="swiper-slide pbox">
                      <div className="box">
                          <div className="pics">
                            <span className="ui-load-glx full"> <span className="gbx"> <em className="bx"> <i></i> <i></i> <i></i> <i></i> </em> </span> </span>
                            <iframe className='iframe' title={data.name} src={"//www.youtube.com/embed/"+data.key}  allow="autoplay; encrypted-media" allowFullScreen loading='lazy'></iframe>
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
