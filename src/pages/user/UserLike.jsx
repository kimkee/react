import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,

// import axios from 'axios';
import { supabase } from '@/supabase.js';
import ui from '../../ui.js';
import StarPoint from '../../components/StarPoint';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules'; //,EffectFade 
import { Swiper, SwiperSlide } from 'swiper/react'; //, useSwiper 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

export default function UserLike({uInfo,user,swiper1dep}) {

  const [scrapMV, setScrapMV] = useState([]);
  const [scrapTV, setScrapTV] = useState([]);
  const [media, setMedia] = useState('movie');


  const [swiper, setSwiper] = useState(null);
  const updateSwiper = ()=> setTimeout(() => {
    // swiper?.update();
    // swiper?.updateAutoHeight();
    swiper1dep?.update();
    swiper1dep?.updateAutoHeight();
  }, 500);

  const mdChange = (num)=>{
    setMedia(num == 0 && 'movie' || num == 1 && 'tv')   
    updateSwiper()
  }
  const deleteScrap = async (opts, id) => {
    ui.loading.show('glx');
    console.log(opts, id); 
    const { error } = await supabase.from('TMDB_SCRAP').delete().eq('id', id).eq('mvtv', opts);
    if (error) {
      console.error("SCRAP 삭제 에러 :", error.message);
    }else{
      console.table("SCRAP 삭제 성공");
    }
    ui.loading.hide('glx');
  };

  const [scrapMvTot, setScrapMvTot] = useState(0);
  const [scrapTvTot, setScrapTvTot] = useState(0);
  const getMyScrapTotal = async (user_id, opts)=> {
    const { count, error } = await supabase
    .from('TMDB_SCRAP')
    .select('*', { count: 'exact', head: true })
    .eq('user_num', user_id)
    .eq('mvtv', opts);
    if (error) {
      console.error("행 수 조회 에러", error.message);
    } else {
      console.log("총 행 수:", count);
      opts == 'movie' && setScrapMvTot(count);
      opts == 'tv'    && setScrapTvTot(count);
    }
  }
  const pagingAmount = 39;
  const getMyScrap = async (user_id, opts, num)=> {
    console.log(user_id);
    num = num || pagingAmount;
    const data = await supabase
      .from('TMDB_SCRAP')
      .select("*")
      .order('created_at', { ascending: false })
      .eq('user_num', user_id)
      .eq('mvtv', opts)
      // .range(0,num)
      // .limit(20)
      .then((resusts) => { 
        console.log(resusts.data) 
        console.table("내 스크랩 조회 성공");
        opts == 'movie' && setScrapMV(resusts.data);
        opts == 'tv'    && setScrapTV(resusts.data);
      })
      .catch((error) => {
        console.error("내 스크랩 조회 에러", error.message);
      });
    // console.log(data);
    
  }
  const realtimeChannel = useRef('');
  const setupRealtimeListener = (tableName) => {
    realtimeChannel.current = supabase.channel(`public:${tableName}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, () => {
        getMyScrap(uInfo.id,'movie');
        getMyScrap(uInfo.id,'tv');
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
    getMyScrap(uInfo.id,'movie');
    getMyScrap(uInfo.id,'tv');
    getMyScrapTotal(uInfo.id,'movie');
    getMyScrapTotal(uInfo.id,'tv');
    setupRealtimeListener('TMDB_SCRAP');
      
    return ()=>{
      realtimeChannel.current?.unsubscribe();
    }
    // eslint-disable-next-line
  },[uInfo,swiper]);
  const gotoSlide = (num)=>{
    console.log(num);
    swiper.slideToLoop(num);
    // swiper1dep?.update()
  }
  return (
    <>
      <div className="movie-list user">
        <button onClick={()=>{updateSwiper()}} className='btn sm hidden'>S</button>
        
        <div className="tabs">
          <button className={`btn ${media == 'movie' ? 'active':''}`} onClick={()=>gotoSlide(0)}><em>Movie</em> <i>{scrapMvTot}</i></button>
          <button className={`btn ${media == 'tv' ? 'active':''}`} onClick={()=>gotoSlide(1)}><em>TV</em> <i>{scrapTvTot}</i></button>
        </div>
        <Swiper className="swiper-wrapper swiper pctn " 
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]} //EffectFade,
            spaceBetween={0}
            slidesPerView={1}
            loop={false}
            autoplay={false}
            wrapperTag="div"
            initialSlide={ 0 } 
            autoHeight={true}
            watchOverflow={true}
            observer={true}
            observeSlideChildren={true}
            observeParents={true}
            onSwiper={(swiper) => {
              console.log("initialize swiper", swiper);
              setSwiper(swiper);
              mdChange(swiper.realIndex)
              updateSwiper()
            }}
            onSlideChange={(swiper) => {
              console.log('slide change' , swiper.realIndex , swiper.activeIndex);
              mdChange(swiper.realIndex)
              updateSwiper()
            }}
          >
              
            <SwiperSlide tag="section" className="tablike mv">
              {scrapMV.length ?
              <>
              <ul className='list'>
                {scrapMV.map((data,num) =>{
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
              { scrapMV.length < scrapMvTot &&
              <div className="loading"><button type="button" onClick={()=>{getMyScrap(uInfo.id,'movie',scrapMV.length+pagingAmount)}} className='btn'>
                <i className="fa-solid fa-angle-down"></i> <b>더보기</b></button>
              </div>
              }
              </>
              :
              <div className="nodata">
                <i className="fa-solid fa-file-magnifying-glass"></i>
                <p> 스크랩된 컨텐츠가 없습니다.</p>
              </div>
              }
            </SwiperSlide>
            <SwiperSlide tag="section" className="tablike tv">
              {scrapTV.length ?
              <>
              <ul className='list'>
                {scrapTV.map((data,num) =>{
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
              { scrapTV.length < scrapTvTot &&
              <div className="loading"><button type="button" onClick={()=>{getMyScrap(uInfo.id,'tv',scrapTV.length+pagingAmount)}} className='btn'>
                <i className="fa-solid fa-angle-down"></i> <b>더보기</b></button>
              </div>
              }
              </>
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