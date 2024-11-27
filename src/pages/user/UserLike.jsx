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

export default function UserLike({uInfo,user,swiper1dep}) {

  // const [newScrapMovie, setNewScrapMovie] = useState([]);
  const [newScrapMV, setNewScrapMV] = useState([]);
  const [newScrapTV, setNewScrapTV] = useState([]);
  const [media, setMedia] = useState('movie');

  const updateSwiper = ()=> setTimeout(() => {
    swiper?.update()
    swiper1dep?.update()
  } , 150);
  const mediaList = (opts) => {
    console.log(opts);
    // setNewScrapMV( uInfo.tmdb_movie_scrap );
    // setNewScrapTV( uInfo.tmdb_tv_scrap );

    updateSwiper()
    // console.log(newScrapMovie);
  };
  const mdChange = (num)=>{
    setMedia(num == 0 && 'movie' || num == 1 && 'tv')   
    updateSwiper()
  }
  const deleteScrap = async (opts, id) => {
    ui.loading.show('glx');
    console.log(opts, id); 
    const { error } = await supabase.from('TMDB_SCRAP').delete()
      .eq('id', id).eq('mvtv', opts);
    if (error) {
      console.error("SCRAP 삭제 에러 :", error.message);
    }else{
      console.table("SCRAP 삭제 성공");
      // getMyScrap(uInfo.id);
    }
    ui.loading.hide('glx');
  };

  const getMyScrap = async (user_id)=> {
    console.log(user_id);
    const { data, error }  = await supabase.from('TMDB_SCRAP').select("*").order('created_at', { ascending: false })
      .eq('user_num', user_id);
    if (error) {
      console.error("내 스크랩 조회 에러 Error selecting data:", error.message);
    }else{
      console.log(data);
      console.table("내 스크랩 조회 성공 Data selected successfully:");
      // setMyScrap(data);
      setNewScrapMV(data.filter((data)=>data.mvtv == 'movie'))
      setNewScrapTV(data.filter((data)=>data.mvtv == 'tv'))
    
    }
    updateSwiper()
    setTimeout(updateSwiper, 1000);
  }
  const realtimeChannel = useRef('');
  const setupRealtimeListener = (tableName) => {
    realtimeChannel.current = supabase.channel(`public:${tableName}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, () => {
        getMyScrap(uInfo.id);
        console.log(`${tableName} 업데이트`);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to ${tableName} changes`);
        }
      });
  };
  useEffect( () => {
    console.log(uInfo , user);
    // mediaList(media);
    getMyScrap(uInfo.id);
    setupRealtimeListener('TMDB_SCRAP');
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
          <button className={`btn ${media == 'movie' ? 'active':''}`} onClick={()=>gotoSlide(0)}><em>Movie</em> <i>{newScrapMV.length}</i></button>
          <button className={`btn ${media == 'tv' ? 'active':''}`} onClick={()=>gotoSlide(1)}><em>TV</em> <i>{newScrapTV.length}</i></button>
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
              mdChange(swiper.realIndex)
            }}
            onSlideChange={(swiper) => {
              console.log('slide change' , swiper.realIndex , swiper.activeIndex);
              mdChange(swiper.realIndex)
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
                          <Link className="cont"  to={`${data.mvtv}/${data.idmvtv}`}>
                            <div className="pics"><img src={`${img}`} alt={tit} onError={ui.error.poster} className='img'/></div>
                            <div className="dd">
                            <div className="tits">{data.title || data.name}</div>
                              <div className="hits">
                                <StarPoint point={data.vote_average} />
                                <em><i className="fa-regular fa-thumbs-up"></i> <b>{data.vote_average}</b></em>
                              </div>
                              <div className="date"><b>{data.release_date || data.first_air_date}</b></div>
                            </div>
                          </Link>
                          <div className="bts">
                            { uInfo?.user_id == user?.id &&
                              <button type="button" className="bt" onClick={ ()=> ui.confirm('삭제할까요?',{ybt:'네',nbt:'아니오', ycb:()=>deleteScrap(data.mvtv, data.id)}) }>
                                <span><i className="fa-solid fa-trash-can"></i></span>
                              </button>
                            }
                          </div>
                        </div>
                      </li>
                    )
                })}
                
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
                          <Link className="cont"  to={`${data.mvtv}/${data.idmvtv}`}>
                            <div className="pics"><img src={`${img}`} alt={tit} onError={ui.error.poster} className='img'/></div>
                            <div className="dd">
                              <div className="tits">{data.title || data.name}</div>
                              <div className="hits">
                                <StarPoint point={data.vote_average} />
                                <em><i className="fa-regular fa-thumbs-up"></i> <b>{data.vote_average}</b></em>
                              </div>
                              <div className="date"><b>{data.release_date || data.first_air_date}</b></div>
                            </div>
                          </Link>
                          <div className="bts">
                            { uInfo?.user_id == user?.id &&
                              <button type="button" className="bt" onClick={ ()=> ui.confirm('삭제할까요?',{ybt:'네',nbt:'아니오', ycb:()=>deleteScrap(data.mvtv, data.id)}) }>
                                <span><i className="fa-solid fa-trash-can"></i></span>
                              </button>
                            }
                          </div>
                        </div>
                      </li>
                    )
                })}
                
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