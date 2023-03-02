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

export default function CateMenu({menu}) {
  let params = useParams()
  // let navigate = useNavigate();
  const [swiper, setSwiper] = useState(null);
  const [slideActive, slideActiveSet] = useState(null);
  const goSlide = (num) => { 
    document.querySelectorAll(".cate-box ul>li .bt.active").forEach( bt => {
      num = parseInt( bt.closest("li").getAttribute("data-index") );
    })
    slideActiveSet(  num  )
    console.log(num);
    swiper?.slideTo( slideActive , 100 );
    console.log("goSlide");
  };
  const cateID = params.cate;
  console.log(slideActive);
  useEffect(() => {
    goSlide(slideActive)
    return ()=>{
    }
    // eslint-disable-next-line
  },[swiper,cateID,slideActive,menu]);

  return (
  <>
    <div className="cate-box">
      <div className="inr">
        {/* <button onClick={goSlide}>SSSSS</button> */}
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
          }}
        >

            <SwiperSlide tag="li" data-index="0" className="swiper-slide pbox">
              <NavLink type="button" className={ "bt" } to={'/movie/0'}>전체</NavLink>
            </SwiperSlide>
          { menu.map( (item,idx) => {
            return (
            <SwiperSlide tag="li" data-index={idx+1} key={item.id}  className="swiper-slide pbox">
              <NavLink type="button" className={ item.id === cateID ? "bt active" : "bt " } to={'/movie/'+item.id}> { [item.name]  }</NavLink>
            </SwiperSlide>
            )
          })}
              
        </Swiper>
      </div>
    </div>
  </>  
  )
}