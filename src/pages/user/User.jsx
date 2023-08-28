import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

import {db} from '../../firebaseConfig.js';
import { collection, query, getDocs, orderBy, getDoc, doc, where } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
// import { atom } from 'recoil';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, } from 'recoil';
import store from '../../store.js';
import {textState,sss} from '../../atom.js';

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


console.log(textState , sss);

/* const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
}); */

function TextInput() {
  const [text, setText] = useRecoilState(textState);
  const [sssVal, setSssVal] = useRecoilState(sss);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
      <br /> {sssVal.a}
      <br /> {sssVal.b}
    </div>
  );
}


export default function User() {
  let params = useParams()
  
  console.log(params);
  let location = useLocation()
  let navigate = useNavigate();
  let uid = params.id;
  const [uInfo, setUInfo] = useState({});

  const viewUser = async (ids)=> {
    const docRef = doc(db, 'member', ids);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUInfo({
        id : docSnap.id,
        uid : docSnap.data().uid,
        nick : docSnap.data().nick,
        avatar : docSnap.data().avatar,
        email : docSnap.data().email,
        date : ui.dateForm( docSnap.data().date.toDate() ),
        liked : docSnap.data().liked.length ,
      })
      
    } else {
      console.log("No such document!");
    }

    // this.gotoSlide(0,0);
    document.querySelector(".page.user").classList.add("load");
    document.querySelector(".header .htit").innerText = uInfo.nick || ``;
    ui.loading.hide();
  }

  const menuSlide = useRef()

  const [swiper, setSwiper] = useState(null);
  const [spIdx, setSpIdx] = useState(0);
  const gotoSlide = (num)=>{
    console.log(num , menuSlide);
    swiper.slideTo(num);
    menuSlide.current.querySelector("li").classList.add("sfdfsd")
  }

  useEffect( () => {
    window.scrollTo(0,0);
    
    // document.querySelector(".header").classList.remove("trans");
    // window.addEventListener("scroll", scrollEvent);
    console.log( uid , params);
    viewUser(uid);
    return ()=>{
      // window.removeEventListener("scroll", scrollEvent);
    }
    // eslint-disable-next-line
  },[uInfo.nick]);

  console.log(store);
  return (
    <>
    <Outlet/>

    <div className="container page user view">
      <main className="contents">
        
        {store?.state ?
        <div className="profile">
          <div className="user">
            <span className="pic"><img src={store.state.avatar[uInfo.avatar]} className="img" /></span>
            <div className="info">
              <div className="num b"><b className="n">{uInfo.bbsNum||0}</b><p className="t">Post</p></div>    
              <div className="num p"><b className="n">{uInfo.photoNum||0}</b><p className="t">Reply</p></div>    
              <div className="num l"><b className="n">{uInfo.liked||0}</b><p className="t">Liked</p></div>    
            </div>
          </div>
          <div className="desc">
            <span className="txt"><i className="fa-regular fa-calendar-days"></i> Join : {uInfo.date}</span>
            <span className="txt"><i className="fa-regular fa-envelope"></i> {uInfo.email}</span>
          </div>
        </div>
        :null}

        <div className="post">
          <ul className="menu" ref={menuSlide}>
            <li className={spIdx == 0 ? "active" : ""}>
              <button type="button" className="bt" onClick={()=>gotoSlide(0)}><span><i className="fa-regular fa-heart"></i></span></button>
            </li>
            <li className={spIdx == 1 ? "active" : ""}>
              <button type="button" className="bt" onClick={()=>gotoSlide(1)}><span><i className="fa-regular fa-list"></i></span></button>
            </li>
            <li className={spIdx == 2 ? "active" : ""}>
              <button type="button" className="bt" onClick={()=>gotoSlide(12)}><span><i className="fa-regular fa-user"></i></span></button>
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
            // autoplay={false}
            autoplay={{ delay: 3000 ,waitForTransition:false, pauseOnMouseEnter: true ,disableOnInteraction: false}}
            wrapperTag="div"
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            // initialSlide={ Math.floor( Math.random() *10  ) } // 0 ~ 9
            autoHeight={false}
            onSwiper={(swiper) => {
              console.log("initialize swiper", swiper);
              setSwiper(swiper);
              // swiper.slideTo( Math.floor( Math.random() *10 ) );
            }}
            onSlideChange={(swiper) => {
              console.log('slide change' , swiper.realIndex);
              setSpIdx(swiper.realIndex)
              gotoSlide(swiper.realIndex);
            }}
          >
            <SwiperSlide tag="div" className="swiper-slide ctn b">
              좋아요
            </SwiperSlide>
            <SwiperSlide tag="div" className="swiper-slide ctn l">
              댓글
              <TextInput />
            </SwiperSlide>
            <SwiperSlide tag="div" className="swiper-slide ctn p">
              
              <div className="bts bot">
                <Link to="/user/signout" className="btn logout"><i className="fa-regular fa-right-from-bracket"></i>Logout</Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>


          
      </main>
    </div>
  </>
  )
}