import React, { useState, useEffect } from 'react';
import { NavLink ,useParams} from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
// import ui from '/src/ui.js';
import { Navigation, Pagination,FreeMode ,A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'; //, useSwiper 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function CateMenu({menu, opts}) {
  let params = useParams()
  // let navigate = useNavigate();
  // const [swiper, setSwiper] = useState(null);
  const [slideActive, slideActiveSet] = useState(0);
  const goSlide = (num) => { 
    // document.querySelectorAll(".cate-box ul>li .bt.active").forEach( bt => {
    //   num = parseInt( bt.closest("li").getAttribute("data-index") );
    // });
    const catebox = document.querySelector(".cate-box>.inr");
    const cateboxWid = catebox.offsetWidth * 0.5;
    const btnAct = document.querySelector(".cate-box ul>li .bt.active");
    const btnActLeft = btnAct?.offsetLeft;
    const btnActWid = btnAct?.offsetWidth * 0.5;

    const scr = btnActLeft - cateboxWid + btnActWid;
    catebox.scrollTo( scr , 0);

    slideActiveSet(  num  );
    // swiper?.slideTo( slideActive , 100 );
    console.log("slideActive == " + slideActive + "  " + btnActLeft);
  };
  const cateID = params.cate;
  useEffect(() => {
    goSlide(slideActive);
    return ()=>{
    }
    // eslint-disable-next-line
  },[cateID,slideActive,menu,opts]);

  return (
  <>
    <div className={"cate-box " + cateID}>
      <div className="inr">
        
        <ul className="list">
          <li data-index="0" className={ "0" === cateID ? "active" : null }>
            <NavLink type="button" className={ "bt" } to={`/list/${opts}/0`}>전체</NavLink>
          </li>
          { menu.map( (item,idx) => { return (
          <li data-index={idx+1} key={item.id} cate={item.id} className={ item.id.toString() === cateID ? "active" : null }>
            <NavLink type="button" className="bt" to={`/list/${opts}/${item.id}`}> { item.name } </NavLink>
          </li>
          ) })}
        </ul>
        
      </div>
    </div>
  </>  
  )
}