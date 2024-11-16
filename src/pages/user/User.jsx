import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

import {db} from '../../firebaseConfig.js';
import { collection, query, getDocs, orderBy, getDoc, doc, where } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
// import { atom } from 'recoil';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, } from 'recoil';
import store from '../../store.js';
import {atomStore,textState,sss} from '../../atom.js';

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
export default function User({prop}) {
  
  const params = useParams();
  
  const location = useLocation();
  const navigate = useNavigate();
  const uid = params.id;
  const [atomStoreVal, setAtomStore] = useRecoilState(atomStore);
  
  const { user, myinfo } = prop;
  
  const [uInfo, setUInfo] = useState();
  
  const viewUser = async (ids)=> {
    console.log(params.id);
    
    const { data: _info, error: myinfoError }  = await supabase.from('MEMBERS').select("*").eq('id', ids).order('created_at', { ascending: true });
    setUInfo(_info[0])
      
    
    console.log(uInfo);

    ui.loading.show(`glx`);

    // this.gotoSlide(0,0);
    // document.querySelector(".page.user")?.classList.add("load");
    // document.querySelector(".header .htit")?.innerText = uInfo?.nick || ``;
    ui.loading.hide();
  }

  const [swiper, setSwiper] = useState(null);
  const [spIdx, setSpIdx] = useState(null);
  // console.log(`spIdx   ${spIdx}`);
  const gotoSlide = (num)=>{
    console.log(num);
    // swiper.slideTo(num);
    swiper.slideToLoop(num);
  }
  useEffect( () => {
    // window.scrollTo(0,0);
    viewUser(uid);
    
    // document.querySelector(".header").classList.remove("trans");
    // window.addEventListener("scroll", scrollEvent);
    
    
    
    return ()=>{
      // window.removeEventListener("scroll", scrollEvent);
    }
    // eslint-disable-next-line
  },[uid]);


  // if(!uInfo){return}
  return (
    <>
    <Outlet/>

    <div className="container page user view">
      <main className="contents">
        
        {uInfo ?
        <div className="profile">
          <div className="user">
            <Link to={'/user/'+params.id} className="pic"><img src={uInfo.profile_picture} className="img" /></Link>
            <div className="info">
              <div className="num b"><b className="n">{uInfo.bbsNum||0}</b><p className="t">Post</p></div>    
              <div className="num p"><b className="n">{uInfo.photoNum||0}</b><p className="t">Reply</p></div>    
              <div className="num l"><b className="n">{uInfo.liked||0}</b><p className="t">Liked</p></div>    
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
        :null}

        <div className="user-post">
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
              // swiper.slideTo( Math.floor( Math.random() *10 ) );
            }}
            onSlideChange={(swiper) => {
              console.log('slide change' , swiper.realIndex , swiper.activeIndex);
              setSpIdx(swiper.realIndex)
              // gotoSlide(swiper.realIndex);
            }}
          >
            <SwiperSlide tag="section" className="ctn like">
              {/* <UserLike uInfo={uInfo} swiper={swiper} /> */}
            </SwiperSlide>
            <SwiperSlide tag="section" className="ctn post">
              <UserPost />
            </SwiperSlide>
            <SwiperSlide tag="section" className="ctn repl">
              <UserFolw />

            </SwiperSlide>
          </Swiper>
        </div>


          
      </main>
    </div>
  </>
  )
}