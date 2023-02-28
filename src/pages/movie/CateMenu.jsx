import React, { useState, useEffect } from 'react';
import { NavLink ,useParams} from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
// import ui from '../../ui';
import { Navigation, Pagination,FreeMode ,A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'; //, useSwiper 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ItemA({menu}) {
  let params = useParams()
  // let navigate = useNavigate();
  const [swiper, setSwiper] = useState(null);
  // const nexto = () => { swiper.slideTo( 3 , 0 ); };
  const cateID = params.cate;

  useEffect(() => {
    swiper?.slideTo(  swiper?.activeIndex  );
    console.log(  swiper?.activeIndex  );
    if( swiper?.activeIndex ){
      swiper?.slideTo(  swiper?.activeIndex  );
    }
    return ()=>{
      
    }
    // eslint-disable-next-line
  },[swiper,cateID]);


  return (
  <>
    <div className="cate-box">
      <div className="inr">
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
          onSwiper={(swiper) => {
            console.log("initialize swiper", swiper);
            setSwiper(swiper);
            // swiper.slideTo( Math.floor( Math.random() *10 ) );
          }}
        >

          {
            menu.map( item => {
              return (
                <SwiperSlide tag="li" key={item.id}  className="swiper-slide pbox">
                  <NavLink type="button" className={ item.id === cateID ? "bt active" : "bt " } to={'/movie/'+item.id}> { [item.name]  }</NavLink>
                </SwiperSlide>
              )
            })
          }
              
        </Swiper>
      </div>
    </div>
  </>  
  )
}