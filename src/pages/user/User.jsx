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
export default function User({prop}) {
  
  const params = useParams();
  
  const location = useLocation();
  const navigate = useNavigate();
  const uid = params.uid;
  
  const { user, myinfo } = prop;
  
  const [uInfo, setUInfo] = useState();
  
  const viewUser = async ()=> {
    console.log(uid);
    
    const { data: _info, error: myinfoError }  = await supabase.from('MEMBERS').select("*").eq('id', uid).order('created_at', { ascending: true });
    setUInfo(_info[0])
      
    
    console.log(user);
    console.log(uInfo);

    

    // this.gotoSlide(0,0);
    // document.querySelector(".page.user")?.classList.add("load");
    // document.querySelector(".header .htit")?.innerText = uInfo?.nick || ``;
    ui.loading.hide();
  }

  const [swiper, setSwiper] = useState(null);
  const [spIdx, setSpIdx] = useState(null);
  // console.log(`spIdx   ${spIdx}`);
  const updateSwiper = ()=> setTimeout(() => swiper?.update() , 100);
  const gotoSlide = (num)=>{
    console.log(num);
    // swiper.slideTo(num);
    swiper.slideToLoop(num);
  }
  useEffect( () => {
    // window.scrollTo(0,0);
    viewUser();
    window.addEventListener('hashchange', viewUser);
    ui.loading.show(`glx`);  
    return ()=>{
      window.removeEventListener('hashchange', viewUser);
    }
    // eslint-disable-next-line
  },[uid]);


  if(!uInfo){return}
  return (
    <>
    <Outlet/>

    <div className="container page user view">
      <main className="contents">
        
        {uInfo ?
        <div className="profile">
          <div className="user">
            <Link to={'/user/'+params.uid} className="pic">
              <img src={uInfo.profile_picture} className="img" />
              {uInfo.provider == 'google' && <i className="fa-brands fa-google"></i>}
              {uInfo.provider == 'github' && <i className="fa-brands fa-github"></i>}
              {uInfo.provider == 'kakao'  && <i className="fa-solid fa-comment"></i>}
            </Link>
            <div className="info">
              <div className="num b"><b className="n">{uInfo.bbsNum||0}</b><p className="t">Post</p></div>    
              <div className="num p"><b className="n">{uInfo.photoNum||0}</b><p className="t">Reply</p></div>    
              <div className="num l"><b className="n">{uInfo.tmdb_movie_scrap.length + uInfo.tmdb_tv_scrap.length ||0}</b><p className="t">Liked</p></div>    
            </div>
          </div>
          <div className="desc">
            <span className="txt"><i className="fa-regular fa-calendar-days"></i> Join : {ui.dateForm(uInfo.created_at)}</span>
            {uInfo.email && <span className="txt"><i className="fa-regular fa-envelope"></i> {uInfo.email}</span>}
          </div>
            { user?.id == uInfo.user_id &&
          <div className="bts">
              <Link to="/user/signout" className="btn sm logout"><i className="fa-regular fa-right-from-bracket"></i>Logout</Link>
          </div>
            }
        </div>
        :
        <Loading opts={'dot'} />
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