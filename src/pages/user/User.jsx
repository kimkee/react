import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

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
// import axios from 'axios';
import ui from '../../ui.js';
import UserPost from './UserPost.jsx';
import UserLike from './UserLike.jsx';
import UserFolw from './UserFolw.jsx';

import { supabase } from '@/supabase.js';
import Loading from '../../components/Loading.jsx';

import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, } from 'recoil';
import { postCout} from '@/atom.js';

export default function User({prop}) {
  const [postCoutVal, setPostCoutVal] = useRecoilState(postCout);

  const params = useParams();
  const param_id = params.uid;
  
  const { user, myinfo } = prop;
  
  const [uInfo, setUInfo] = useState();
  
  const viewUser = async ()=> {
    ui.loading.show(`glx`);
    console.log(param_id);
    const { data, error }  = await supabase.from('MEMBERS').select("*").eq('id', param_id).order('created_at', { ascending: true });
    setUInfo(data[0]);
    console.log(uInfo);
    ui.loading.hide();
  }

  const [swiper, setSwiper] = useState(null);
  const [spIdx, setSpIdx] = useState(null);
  const updateSwiper = ()=> {
    swiper?.update()    
  };
  const gotoSlide = (num)=>{
    console.log(num);
    swiper.slideToLoop(num);
  }
  useEffect( () => {
    // window.scrollTo(0,0);
    viewUser();    
    return ()=>{};
    // eslint-disable-next-line
  },[param_id]);

  return (
    <>
    <Outlet/>

    <div className="container page user view">
      <main className="contents">
        
        {uInfo ?
        <div className="profile">
          <div className="user">
            <Link to={'/user/'+params.uid} className="pic">
              <img src={uInfo.profile_picture} className="img" onError={ui.error.user} />
              {uInfo.provider == 'google' && <i className="fa-brands fa-google"></i>}
              {uInfo.provider == 'github' && <i className="fa-brands fa-github"></i>}
              {uInfo.provider == 'kakao'  && <i className="fa-solid fa-comment"></i>}
            </Link>
            <div className="info">
              <div className="num b"><b className="n">{postCoutVal && postCoutVal?.posts}</b><p className="t">Post </p></div>    
              <div className="num p"><b className="n">{postCoutVal && postCoutVal?.reviews}</b><p className="t">Review</p></div>    
              <div className="num l"><b className="n">{postCoutVal && postCoutVal?.scraps}</b><p className="t">Scrap</p></div>
            </div>
          </div>
          <div className="desc">
            <span className="txt"><i className="fa-regular fa-calendar-days"></i> Join : {ui.dateForm(uInfo.created_at)}</span>
            {uInfo.email && <span className="txt"><i className="fa-regular fa-envelope"></i> {uInfo.email}</span>}
          </div>
          { myinfo?.user_id == uInfo.user_id &&
            <div className="bts">
                <Link to="/user/signout" className="btn sm logout"><i className="fa-regular fa-right-from-bracket"></i>Logout</Link>
            </div>
          }  
        </div>
        :
        <div className="profile"><Loading opts={{type:'glx',cls:'abs'}} /></div>
        }

        {
          uInfo ?<div className="user-post">
          <ul className="menu">
            <li className={spIdx == 0 ? "active" : ""}>
              <button type="button" className="bt" onClick={()=>gotoSlide(0)}><span><i className="fa-regular fa-bookmark"></i></span></button>
            </li>
            <li className={spIdx == 1 ? "active" : ""}>
              <button type="button" className="bt" onClick={()=>gotoSlide(1)}><span><i className="fa-regular fa-list"></i></span></button>
            </li>
            <li className={spIdx == 2 ? "active" : ""}>
              <button type="button" className="bt" onClick={()=>gotoSlide(2)}><span><i className="fa-regular fa-users"></i></span></button>
            </li>
          </ul>
          <Swiper className="swiper-wrapper swiper pctn " 
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]} //EffectFade,
            spaceBetween={0}
            slidesPerView={1}
            // navigation
            loop={false}
            // effect={"fade"}
            autoplay={false}
            // autoplay={{ delay: 3000 ,waitForTransition:false, pauseOnMouseEnter: true ,disableOnInteraction: false}}
            wrapperTag="div"
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            initialSlide={ 0 } // 0 ~ 9
            autoHeight={true}
            watchOverflow={true}
            observer={true}
            observeSlideChildren={true}
            observeParents={true}
            onSwiper={(swiper) => {
              console.log("initialize swiper", swiper);
              setSwiper(swiper);
              setSpIdx(0)
              updateSwiper();
              // swiper.slideTo( Math.floor( Math.random() *10 ) );
            }}
            onSlideChange={(swiper) => {
              console.log('slide change' , swiper.realIndex , swiper.activeIndex);
              setSpIdx(swiper.realIndex)
              updateSwiper();
              // gotoSlide(swiper.realIndex);
            }}
          >
            <SwiperSlide tag="section" className="ctn like">
              <UserLike uInfo={uInfo} user={user} swiper1dep={swiper} />
            </SwiperSlide>
            <SwiperSlide tag="section" className="ctn post">
              <UserPost uInfo={uInfo} user={user} swiper1dep={swiper} />
            </SwiperSlide>
            <SwiperSlide tag="section" className="ctn repl">
              <UserFolw uInfo={uInfo} user={user} swiper1dep={swiper} />
            </SwiperSlide>
          </Swiper>
        </div>
        :null}


          
      </main>
    </div>
  </>
  )
}