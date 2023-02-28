import React from 'react';
import { Link } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
// import ui from '../../ui';
import { Navigation, Pagination,FreeMode ,A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'; //, useSwiper 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ItemA({menu}) {
  
  return (
  <>
    <div className="cate-box">
      <Swiper className="swiper-wrapper" 
            // install Swiper modules
            modules={[Navigation, Pagination,FreeMode, A11y]}
            spaceBetween={0}
            slidesPerView={'auto'}
            // slidesPerGroup={5}
            slidesPerGroupAuto={true}
            freeMode={true}
            // navigation
            loop={false }
            wrapperTag="ul"
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            // initialSlide={ Math.floor( Math.random() *10  ) } // 0 ~ 9
            autoHeight={false}
          >

            {
              menu.map( item => {
                return (
                  <SwiperSlide tag="li" key={item.id}  className="swiper-slide pbox">
                    <Link className="bt" /* to={"/"+item.id} */> { [item.name]  }</Link>
                  </SwiperSlide>
                )
              })
            }
            
      </Swiper>
      
    </div>
  </>  
  )
}