
import React, { useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import axios from 'axios';

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
import ui from '../ui';


export default  function HomeTop({cate , renderTech}){
  let page = Math.floor( Math.random() *4 )+1;
  const [mlist, setMlist] = useState([]);
  const fetchMoive = (page)=>{
    ui.loading.show();
    

    console.log( "로드 " + page );
    
    const fetchURL = `https://api.themoviedb.org/3/movie/now_playing?language=ko&region=kr&page=${page}&sort_by=release_date.desc&api_key=${process.env.REACT_APP_KEY}`;

    axios.get( fetchURL ).then(res =>{
      console.log(res.data);
      setMlist( mlist => [...mlist,...res.data.results] );
      console.log( mlist );
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
    // swiper?.slideTo(2);
    nexto()
    return ()=>{
      
    }
    // eslint-disable-next-line
  },[]);



  return(
    <>
      
      <section className="sect mnTop">
      

        <div className="inr" id="slide">
          
          <Swiper className="swiper-wrapper swiper slide" 
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, Autoplay,EffectFade, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            // navigation
            loop={true}
            effect={"fade"}
            // autoplay={false}
            autoplay={{ delay: 3000 ,waitForTransition:false, pauseOnMouseEnter: true ,disableOnInteraction: true}}
            wrapperTag="ul"
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            // initialSlide={ Math.floor( Math.random() *10  ) } // 0 ~ 9
            autoHeight={true}
            onSwiper={(swiper) => {
              console.log("initialize swiper", swiper);
              setSwiper(swiper);
              swiper.slideTo( Math.floor( Math.random() *10 ) );
            }}
            onSlideChange={() => console.log('slide change')}   >
              {
                mlist?.filter( (item, i) => i < 10 ).map( (data, idx) => {
                  const img = 'https://image.tmdb.org/t/p/w780'+data.poster_path ;
                  return (
                    <SwiperSlide tag="li" key={idx}  className="swiper-slide pbox">
                      <Link className="box" to={"/"+data.id}>
                          <div className="pics"><img src={`${img}`} alt="" className='img' onError={(e)=>{e.target.src=`${process.env.PUBLIC_URL}/img/common/non_poster.png`}} /></div>
                          <div className="info">
                            <div className="star">
                              <em className="ui-star" dangerouslySetInnerHTML={ {__html:  ui.star.set(data.vote_average)} } ></em>
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