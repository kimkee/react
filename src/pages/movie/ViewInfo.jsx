import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import {Outlet,useParams, useNavigate, Link } from 'react-router-dom'; //,useOutletContext  , useLocation
import ui from '../../ui.js';
import StarPoint from '../../components/StarPoint';
import ViewElips from './ViewElips';
import ViewRev from './ViewRev';
import ViewCtls from './ViewCtls';
import Skeleton from '../../components/Skeleton';
import Loading from '../../components/Loading';
export default function ViewInfo({user, myinfo, postID, popTitle }) {
  
  const params = useParams();

  const opts = params.menu;

  const [datas, setDatas] = useState(null);
  const [casts, setCasts] = useState(null);
  const [moves, setMovs] = useState(null);
  const [bgImg, setBgImg] = useState('');
  const fetchURL = `https://api.themoviedb.org/3/${opts}/${postID}?language=ko&region=kr&api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=videos,images&include_image_language=en,null`;
  const fetchDatas = () => {
    axios.get( fetchURL ).then(response => {
      console.log("영화정보" , response.data);
      setDatas(response.data);
      let bgDm = response.data.backdrop_path ? response.data.backdrop_path : response.data.poster_path;
      setBgImg('https://image.tmdb.org/t/p/w780'+bgDm);

      // 팝업 헤더에 제목
      popTitle(response.data.title || response.data.name);
      document.querySelector(`[property="og:description"]`).content = response.data.title || response.data.name
    }).catch( e => { console.log(e); });
  };

  const castURL = `https://api.themoviedb.org/3/${opts}/${postID}/credits?&region=kr&language=ko&api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
  const fetchCast = () => {
    axios.get( castURL ).then(response => {
      console.log("출연,제작" , response.data);
      setCasts( response.data);
    }).catch( e => { console.log(e); });
  };

  const movURL = `https://api.themoviedb.org/3/${opts}/${postID}/videos?language=ko&region=kr&language=ko&api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
  const fetchMov = () => {
    axios.get( movURL ).then(response => {
      console.log("영상" , response.data);
      setMovs( response.data);
    }).catch( e => { console.log(e); });
  };

  // const goTop = ()=> ui.scrollTo(".popup.movie .pct", 0, 200 ) ;

  const goScroll = (e)=>{
    const scrollBox = e.currentTarget.closest(".sect").querySelector(".lst");
    const isNext = e.currentTarget.classList.contains('next');
    const minus = isNext  ? 1 : -1;
    const scAmt = (scrollBox.offsetWidth - 100) * minus;
    console.log( scAmt , scrollBox , minus);
    scrollBox.scrollLeft += scAmt;
  }
  useEffect(() => {
    // goTop();
    fetchDatas();
    fetchCast();
    fetchMov();
    return () => {

    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params.id]);
  
  // console.log(datas);
  // if(!datas)  return ;
  // console.log( txtHt );
  // if(!datas || !casts)  return <div><div className="ui-loading-dot on"> <div className="bx"><em><i></i></em></div> </div></div>;
  const refrashDatas = ()=>{
    setDatas(null);
    setCasts(null);
    setMovs(null);
    ui.loading.show('glx');
    window.setTimeout(() => { 
      fetchDatas();
      fetchCast();
      fetchMov();
      ui.loading.hide('glx');
    },500)
  }
  return (
  <>
    <div className="movie-detail">
      <div className="bgs" style={{backgroundImage: `url(${bgImg})`}}></div>
      { 
        !datas || !casts || !moves
        ?
        <Skeleton opts={ {type: 'movie-detail'} } />
        :
        <div className="m-info">
          <div className="info">
            <div className="desc">
              <p className="tit">
                {datas.title || datas.name} 
                <button className='refresh' onClick={refrashDatas}><i className="fa-solid fa-rotate"></i></button>
              </p>
              {datas.tagline && <p className="sit">{datas.tagline}</p>}
              <p className="tio">{datas.original_title || datas.original_name}</p>

              {/* {datas.name && <p className="tit">{datas.name} </p>} */}
              {/* {datas.original_name && <p className="tio">{datas.original_name}</p>} */}

              
              
              <div className="star">
                <StarPoint point={datas.vote_average} />
              </div>
              <div className="cate">
                {datas.genres.map( item => <em className="ico" key={item.id}> {item.name }</em> )}
              </div>
              <ul className="lst">
                <li className="vot"> 
                  <i className="fa-regular fa-thumbs-up"></i> <b>평점</b> : {datas.vote_average} / 10 
                </li>
                {datas.release_date ?
                <li className="opn">
                  <i className=" fa-regular fa-camera-movie"></i>  <b>개봉</b> : {datas.release_date}
                </li>:null}
                {datas.first_air_date ?
                <li className="opn">
                  <i className=" fa-regular fa-camera-movie"></i>  {datas.first_air_date} ~ {datas.last_air_date}
                </li>:null}
                {datas.runtime ? 
                <li className="tim">
                  <i className="fa-regular fa-timer"></i> <b>시간</b> : {datas.runtime} 분
                </li>:null} 
                {datas.number_of_seasons ?
                <li className="tim">
                  <i className="fa-regular fa-timer"></i> <b>시즌</b> : {datas.number_of_seasons}개  - <b>에피소드</b> : {datas.number_of_episodes}개
                </li>:null}
                {datas.homepage ?
                <li className="web">
                  <i className="fa-regular fa-globe"></i> <a  className="lk" href={datas.homepage } target="_blank" rel="noopener noreferrer">{datas.homepage}</a>
                </li>:null}
              </ul>
            </div>
            <div className="thum">
              <Link to={`./poster/0`} className="pics"><img src={'//image.tmdb.org/t/p/w300'+datas.poster_path} alt={datas.title||datas.name} className="img" onError={ui.error.poster}/></Link>
            </div>
          </div>
          <ViewCtls datas={datas} postID={postID} opts={opts} />

          {datas.overview && <ViewElips overview={datas.overview} /> }
          
          {casts.cast.length ?
          <div className="sect cast">
            <div className="hbox">
              <h4 className="tts">출연진</h4>
              <div className="bt-nav">
                <button type="button" className="bt prev" onClick={goScroll}><i className="fa-solid fa-caret-left"></i></button>
                <button type="button" className="bt next" onClick={goScroll}><i className="fa-solid fa-caret-right"></i></button>
              </div>
            </div>
            <div className="lst">
              {
                casts.cast.filter( (item, i) => i < 999 ).map( b => {
                  return (
                    <Link to={`./person/${b.id}`} key={b.credit_id} className='profile'>
                      <div className="pics"><img src={`//image.tmdb.org/t/p/w92${b.profile_path}`} alt={b.name} className="img"  onError={ui.error.user} loading="lazy" /></div>
                      <div className="name">{b.name}</div>
                      <div className="carc">{b.character}</div>
                    </Link>
                  )
                })
              }
            </div>
          </div>
          : null}


          {moves.results.length > 0 ?
          <div className="sect movs">
            <div className="hbox">
              <h4 className="tts">영상</h4>
              <div className="bt-nav">
                <button type="button" className="bt prev" onClick={goScroll}><i className="fa-solid fa-caret-left"></i></button>
                <button type="button" className="bt next" onClick={goScroll}><i className="fa-solid fa-caret-right"></i></button>
              </div>
            </div>
            <div className="lst">
              {
                moves.results.filter( (item, i) => i < 100 ).reverse().map( (mov,idx) => {
                  return (
                    <div className="box" key={mov.id}>
                      <Link to={`./videos/${idx}`} className="pic" >
                        <span className="msg"><span className="tit">{mov.name}</span></span>
                        <i className="ico fa-solid fa-play"></i>
                        <img className="img" src={`//i.ytimg.com/vi/${mov.key}/hqdefault.jpg`}   alt={mov.name} loading="lazy" />
                        {/* <img className="img" src={`//i.ytimg.com/vi/${mov.key}/sddefault.jpg`}   alt={mov.name} loading="lazy" /> */}
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          </div>
          : null}

          {casts.crew.length ?
          <div className="sect cast">
            <div className="hbox">
              <h4 className="tts">제작진</h4>
              <div className="bt-nav">
                <button type="button" className="bt prev" onClick={goScroll}><i className="fa-solid fa-caret-left"></i></button>
                <button type="button" className="bt next" onClick={goScroll}><i className="fa-solid fa-caret-right"></i></button>
              </div>
            </div>
            <div className="lst">
              {
                casts.crew.filter( (item, i) => i < 999 ).map( b => {
                  return (
                    <Link to={`./person/${b.id}`} key={b.credit_id} className='profile'>
                      <div className="pics"><img src={`//image.tmdb.org/t/p/w92${b.profile_path}`} alt={b.name} className="img"  onError={ui.error.user} loading="lazy" /></div>
                      <div className="name">{b.name}</div>
                      <div className="carc">{b.known_for_department}</div>
                    </Link>
                  )
                })
              }
            </div>
          </div>
          : null}


          {datas.images.posters.length ? 
          <div className="sect post">
            <div className="hbox">
              <h4 className="tts">포스터 : {datas.images.posters.length+1}</h4>
              <div className="bt-nav">
                <button type="button" className="bt prev" onClick={goScroll}><i className="fa-solid fa-caret-left"></i></button>
                <button type="button" className="bt next" onClick={goScroll}><i className="fa-solid fa-caret-right"></i></button>
              </div>
            </div>
            <div className="lst">
              <div className='box' data-index={0}>
                <Link to={`./poster/0`} className='pic'><img src={`//image.tmdb.org/t/p/w300${datas.poster_path}`} alt={datas.title} className="img" onError={ui.error.poster} loading="lazy" /></Link> 
              </div>
              {
              datas.images.posters.map((img,idx) => {
                return(
                <div key={idx} className='box' data-index={idx+1}>
                  <Link to={`./poster/${idx+1}`} className='pic'><img src={`//image.tmdb.org/t/p/w300${img.file_path}`} alt={img.name} className="img" onError={ui.error.poster} loading="lazy" /></Link> 
                </div>
                )
              })
              }
            </div>
          </div>
          : null}

          <ViewRev datas={datas} user={user} myinfo={myinfo} postID={postID} opts={opts}/>

          {datas.production_companies.length ? 
          <>
          <div className="sect comp">
            {
              datas.production_companies.map(comp => {
                return comp.logo_path 
                ? 
                <span key={comp.id} className='logo'><img src={`//image.tmdb.org/t/p/w92${comp.logo_path}`} alt={comp.name} className="img" /></span> 
                : 
                <span key={comp.id} className='logo'>{comp.name}</span> 
              })
            }
          </div>
          </>
          : null}

        </div>
      }
    </div>
  </>
  )
}
