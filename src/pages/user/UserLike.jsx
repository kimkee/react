import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

// import axios from 'axios';
import { supabase } from '@/supabase.js';
import ui from '../../ui.js';
import StarPoint from '../../components/StarPoint';
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

export default function UserLike({uInfo,user}) {

  // const [newScrapMovie, setNewScrapMovie] = useState([]);
  const [newScrapMV, setNewScrapMV] = useState([]);
  const [newScrapTV, setNewScrapTV] = useState([]);
  const [media, setMedia] = useState('movie');

  const mediaList = (opts) => {
    console.log(opts);
    setNewScrapMV( uInfo.tmdb_movie_scrap );
    setNewScrapTV( uInfo.tmdb_tv_scrap );

    setTimeout(() => swiper?.update() , 100); 
    // console.log(newScrapMovie);
  };
  const mdChange = (num)=>{
    setMedia(num == 0 && 'movie' || num == 1 && 'tv')   
  }
  const deleteScrap = async (opts, data) => {
    ui.loading.show('glx');
    data = {
      id: data.id,
      title: data.title || data.name,
      poster_path: data.poster_path,
      overview: data.overview,
      vote_average: data.vote_average,
      release_date: data.release_date || data.first_air_date,
    }
    console.log(opts, data);
  
    let data_scrap = [];
    if (opts == `movie`){
      data_scrap = uInfo.tmdb_movie_scrap || [data] 
    }
    if (opts == `tv`){
      data_scrap = uInfo.tmdb_tv_scrap || [data] 
    }

  
    data_scrap = [...data_scrap, data].filter(item => item.id != data.id);
    if (opts == `movie`){
      setNewScrapMV(data_scrap);
      uInfo.tmdb_movie_scrap = data_scrap;
    }
    if (opts == `tv`){
      setNewScrapTV(data_scrap);
      uInfo.tmdb_tv_scrap = data_scrap;
    }
     
    console.log(data_scrap); 
  
    // const docRef = doc(db, 'member', uInfo.id);
    if (opts == `movie`){
      const { data, error } = await supabase
      .from('MEMBERS')
      .update({ tmdb_movie_scrap: data_scrap })
      .eq('id', uInfo.id)
      .select()
      console.log(data);
      ui.loading.hide('glx');
      console.log(error);
    }
    
    if (opts == `tv`){
      const { data, error } = await supabase
      .from('MEMBERS')
      .update({ tmdb_tv_scrap: data_scrap })
      .eq('id', uInfo.id)
      .select()
      console.log(data);
      ui.loading.hide('glx');
      console.log(error);
    }

  };  

  useEffect( () => {
    console.log(uInfo , user);
    mediaList(media);
    // setNewScrapMovie( uInfo.tmdb_movie_scrap )
    return ()=>{
      
    }
    // eslint-disable-next-line
  },[uInfo]);

  // if (!uInfo ) { return false }
  // if (!newScrapMovie) { return false }
  const [swiper, setSwiper] = useState(null);
  const [spIdx, setSpIdx] = useState(null);
  // console.log(`spIdx   ${spIdx}`);
  const gotoSlide = (num)=>{
    console.log(num);
    // swiper.slideTo(num);
    swiper.slideToLoop(num);
  }
  return (
    <>
      <div className="movie-list user">
        <div className="tabs">
          <button className={`btn ${media == 'movie' ? 'active':''}`} onClick={()=>gotoSlide(0)}><em>Movie</em> <i>{uInfo.tmdb_movie_scrap.length}</i></button>
          <button className={`btn ${media == 'tv' ? 'active':''}`} onClick={()=>gotoSlide(1)}><em>TV</em> <i>{uInfo.tmdb_tv_scrap.length}</i></button>
        </div>

        <Swiper className="swiper-wrapper swiper pctn " 
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]} //EffectFade,
            spaceBetween={0} slidesPerView={1} loop={false}
            autoplay={false} wrapperTag="div" initialSlide={ 0 } 
            autoHeight={true} watchOverflow={true} observer={true} observeSlideChildren={true} observeParents={true}
            onSwiper={(swiper) => {
              console.log("initialize swiper", swiper);
              setSwiper(swiper);
              setSpIdx(swiper.realIndex)
              mdChange(swiper.realIndex)
              // swiper.slideTo( Math.floor( Math.random() *10 ) );
            }}
            onSlideChange={(swiper) => {
              console.log('slide change' , swiper.realIndex , swiper.activeIndex);
              setSpIdx(swiper.realIndex)
              mdChange(swiper.realIndex)
              // gotoSlide(swiper.realIndex);
            }}
          >
            <SwiperSlide tag="section" className="tablike mv">
              {newScrapMV.length ?
              <ul className='list'>
                {newScrapMV.map((data,num) =>{
                    const imgpath = '//image.tmdb.org/t/p/w92';
                    const img = imgpath + data.poster_path;
                    const tit = data.title || data.name;
                    return(
                      <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                        <div className="box">
                          <Link className="cont"  to={`${media}/${data.id}`}>
                            <div className="pics"><img src={`${img}`} alt={tit} onError={ui.error.poster} className='img'/></div>
                            {/* <div className="desc">
                              
                              <div className="text">{data.overview}</div>
                            </div> */}
                            <div className="dd">
                            <div className="tits">{data.title || data.name}</div>
                              <div className="hits">
                                <StarPoint point={data.vote_average} />
                                <em><i className="fa-regular fa-thumbs-up"></i> 평점 : <b>{data.vote_average}</b></em>
                              </div>
                              <div className="date"><i className="fa-regular fa-calendar-days"></i> <b>{data.release_date || data.first_air_date}</b></div>
                            </div>
                          </Link>
                          <div className="bts">
                            { uInfo?.user_id == user?.id &&
                              <button type="button" className="bt" onClick={ ()=> ui.confirm('삭제할까요?',{ybt:'네',nbt:'아니오', ycb:()=>deleteScrap(media, data)}) }><span><i className="fa-regular fa-close"></i></span></button>
                            }
                          </div>
                        </div>
                      </li>
                    )
                }).reverse()}
                
              </ul>
              :
              <div className="nodata">
                <i className="fa-solid fa-file-magnifying-glass"></i>
                <p> 스크랩된 컨텐츠가 없습니다.</p>
              </div>
              }
            </SwiperSlide>
            <SwiperSlide tag="section" className="tablike tv">
              {newScrapTV.length ?
              <ul className='list'>
                {newScrapTV.map((data,num) =>{
                    const imgpath = '//image.tmdb.org/t/p/w92';
                    const img = imgpath + data.poster_path;
                    const tit = data.title || data.name;
                    return(
                      <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                        <div className="box">
                          <Link className="cont"  to={`${media}/${data.id}`}>
                            <div className="pics"><img src={`${img}`} alt={tit} onError={ui.error.poster} className='img'/></div>
                            {/* <div className="desc">
                              
                              <div className="text">{data.overview}</div>
                            </div> */}
                            <div className="dd">
                              <div className="tits">{data.title || data.name}</div>
                              <div className="hits">
                                <StarPoint point={data.vote_average} />
                                <em><i className="fa-regular fa-thumbs-up"></i> 평점 : <b>{data.vote_average}</b></em>
                              </div>
                              <div className="date"><i className="fa-regular fa-calendar-days"></i> <b>{data.release_date || data.first_air_date}</b></div>
                            </div>
                          </Link>
                          <div className="bts">
                            { uInfo?.user_id == user?.id &&
                              <button type="button" className="bt" onClick={ ()=> ui.confirm('삭제할까요?',{ybt:'네',nbt:'아니오', ycb:()=>deleteScrap(media, data)}) }><span><i className="fa-regular fa-close"></i></span></button>
                            }
                          </div>
                        </div>
                      </li>
                    )
                }).reverse()}
                
              </ul>
              :
              <div className="nodata">
                <i className="fa-solid fa-file-magnifying-glass"></i>
                <p> 스크랩된 컨텐츠가 없습니다.</p>
              </div>
              }
            </SwiperSlide>
          </Swiper>


        
      </div>
    </>
  )
}