
import React, { useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import axios from 'axios';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react'; //, useSwiper 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ui from '../ui';


export default  function ListSet({opts}){
  let page = Math.floor( Math.random() *4 )+1;
  const [mlist, setMlist] = useState([]);
  console.log(opts);
  const fetchMoive = (page)=>{
    ui.loading.show();
    

    console.log( "로드 " + page );
    //  vote_count.desc  추천순
    //  with_genres=16  장르별
    // /trending/movie/day
    const fetchURL = `https://api.themoviedb.org/3/movie/${opts.list}?page=1&with_genres=${opts.cate}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${process.env.REACT_APP_KEY}`;

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

  
  // const [swiper, setSwiper] = useState(null);
  // const nexto = () => {
  //   swiper.slideTo( Math.floor( Math.random() *10 ) , 0 );
  // };

  useEffect(() => {
    fetchMoive(page);
    // swiper.slideTo(2);
    
    return ()=>{
      
    }
    // eslint-disable-next-line
  },[]);



  return(
    <>
      
      <section className="sect mnList">

        <h3 className="sectit">{opts.title}</h3>
        

        <div className="inr">
          
          <Swiper className="swiper-wrapper swiper slide" 
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={5}
            slidesPerGroup={5}
            slidesPerGroupAuto={true}
            // navigation
            loop={false }
            wrapperTag="ul"
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            // initialSlide={ Math.floor( Math.random() *10  ) } // 0 ~ 9
            autoHeight={true}
            onSwiper={(swiper) => {
              console.log("initialize swiper", swiper);
              // setSwiper(swiper);
              // swiper.slideTo( Math.floor( Math.random() *10 ) );
            }}
            onSlideChange={() => console.log('slide change')}   >
              {
                mlist?.filter( (item, i) => i < 20 ).map( (data, idx) => {
                  const img = 'https://image.tmdb.org/t/p/w154'+data.poster_path ;
                  return (
                    <SwiperSlide tag="li" key={idx}  className="swiper-slide pbox">
                      <Link className="box" to={"/"+data.id}>
                          <div className="pics"><img src={`${img}`} alt="" className='img' onError={(e)=>{e.target.src=`${process.env.PUBLIC_URL}/img/common/non_poster.png`}} /></div>
                          <div className="info">
                            {/* <div className="star">
                              <em className="ui-star" dangerouslySetInnerHTML={ {__html:  ui.star.set(data.vote_average)} } ></em>
                            </div> */}
                            {/* <div className="tit">{data.title}</div> */}
                          </div>
                          {/* <div className="screen"></div> */}
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