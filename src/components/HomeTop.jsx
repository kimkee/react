
import React, { useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import axios from 'axios';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper'; //,EffectFade 

import { Swiper, SwiperSlide } from 'swiper/react'; //, useSwiper 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import ui from '../ui.js';
import StarPoint from '../components/StarPoint';


export default  function HomeTop({opts}){
  console.log(opts);
  let page = Math.floor( Math.random() *3 )+1;
  const [mlist, setMlist] = useState([]);
  const fetchMoive = (page)=>{
    ui.loading.show();
   
    const fetchURL = `https://api.themoviedb.org/3/${opts.opts}/now_playing?language=ko&region=kr&page=${page}&sort_by=release_date.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
    axios.get( fetchURL ).then(res =>{
      console.log(res.data);
      setMlist( mlist => [...mlist,...res.data.results] );
      // console.log( mlist );
      console.log(page + "=== " + res.data.total_pages );
      
      ui.loading.hide();
      if( res.data.total_pages <= page ) {
        document.querySelector(".ui-loadmore")?.classList.add("hide");
      };
    }).catch(e=>{
      console.log(e);
      ui.loading.hide();
      document.querySelector(".ui-loadmore")?.classList.add("error");
    }); 
  }

  
  const [swiper, setSwiper] = useState(null);
  const nexto = () => {
    swiper?.slideTo( Math.floor( Math.random() *10 ) , 0 );
  };

  useEffect(() => {
    fetchMoive(page);
    nexto();
    
    window.addEventListener("scroll", scrollHome);
    return ()=>{
      window.removeEventListener("scroll", scrollHome);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  const scrollHome = ()=> {
    const val = parseInt( ui.viewport.scrollTop()/1.8 );
    if ( ui.lock.stat) return;
    document.querySelectorAll(".page.home .sect.mnTop .slide ul>li .box .pics").forEach(element => {
      element.style.transform = 'translate3D(0rem , 0'+val+'rem , 0rem)';
      // element.style.transform = parseInt(scr/1.5)+"rem";
    });
    // console.log(scr );
  };

  console.log(MY_GLOBAL_VARIABLE);



  return(
    <>
      
      <section className="sect mnTop">
      

        <div className="inr" id="slide">
          
          <Swiper className="swiper-wrapper swiper slide" 
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]} //EffectFade,
            spaceBetween={0}
            slidesPerView={1}
            // navigation
            loop={true}
            effect={"fade"}
            // autoplay={false}
            autoplay={{ delay: 3000 ,waitForTransition:false, pauseOnMouseEnter: true ,disableOnInteraction: false}}
            wrapperTag="ul"
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            // initialSlide={ Math.floor( Math.random() *10  ) } // 0 ~ 9
            autoHeight={false}
            onSwiper={(swiper) => {
              console.log("initialize swiper", swiper);
              setSwiper(swiper);
              swiper.slideTo( Math.floor( Math.random() *10 ) );
            }}
            onSlideChange={() => {/* console.log('slide change') */}}   >
              {
                mlist?.filter( (item, i) => i < 10 ).map( (data, idx) => {
                  const img = 'https://image.tmdb.org/t/p/w780'+data.poster_path ;
                  return (
                    <SwiperSlide tag="li" key={idx}  className="swiper-slide pbox">
                      <Link className="box" to={`${opts.opts}/${data.id}`}>
                          <div className="pics"><img src={`${img}`} alt="" className='img' onError={(e)=>{e.target.src=`${import.meta.env.VITE_REACT_APP_PUBLIC_URL}img/common/non_poster.png`}} /></div>
                          <div className="info">
                            <div className="star">
                              <StarPoint point={data.vote_average} />
                            </div>
                            <div className="tit">{data.title}</div>
                          </div>
                          <div className="screen"></div>
                      </Link>
                    </SwiperSlide>
                  )
                })
              }
          </Swiper>
        </div>
      </section>
    </>
  )
}