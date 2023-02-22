import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate  } from 'react-router-dom';
import ui from '../../ui';
export default function View() {

  let params = useParams()
  let navigate = useNavigate();
  let kkk = process.env.PUBLIC_URL
  
  const postID = params.id;
  const popResize = ()=>{
    let $pop =  document.querySelector(".pop-layer");
    let pctnH =  $pop.offsetHeight || 0;
    let pbtnH =  $pop.querySelector(".pbt")?.offsetHeight || 0 ;
    let phtnH =  $pop.querySelector(".phd")?.offsetHeight || 0 ;
    pctnH = (pctnH - phtnH) || 0 ;
    console.log(pctnH  );
    $pop.querySelector(".pct").style.maxHeight = pctnH - pbtnH+"px" ; 
  }

  const [datas, setDatas] = useState(null);
  const [bgImg, setBgImg] = useState('');
  
  const fetchURL = 'https://api.themoviedb.org/3/movie/'+postID+'?language=ko&region=kr&moive_id=505642&api_key=f76021076e8162ea929bd2cea62c6646';
  const fetchDatas = () => {
    axios.get( fetchURL ).then(response => {
      setDatas(response.data);
      setBgImg('https://image.tmdb.org/t/p/w500'+response.data.backdrop_path);
    }).catch( e => {
      console.log(e);
    });
  };
  useEffect(() => {
    fetchDatas();
    popResize();
    window.addEventListener("resize",popResize);
    // console.log(ui.ui().aaa);
    console.log(kkk);
    ui.lock.using(true);
    return () => {
      window.removeEventListener("resize",popResize);
      console.log('컴포넌트가 화면에서 사라짐');
      ui.lock.using(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  const MovieInfo =({data},id)=>{
    console.log( data);
    console.log(process.env.PUBLIC_URL);
    if(!data)  return ;
    return (
      <>
        <div className="info">
          <div className="desc">
            <p className="tit">{data.title}</p>
            <p className="sit">{data.tagline}</p>
            <p className="tio">{data.original_title}</p>
            <ul className="lst">
              <li className="vot">
                <i className="fa-regular fa-thumbs-up"></i>
                <b>평점</b> : {data.vote_average}</li>
              <li className="opn">
                <i className=" fa-regular fa-camera-movie"></i>
                <b>개봉</b> : {data.release_date}</li>
              <li className="tim">
                <i className="fa-regular fa-timer"></i>
                <b>시간</b> : {data.runtime} 분 </li> 
            </ul>
          </div>
          <div className="thum">
            <div className="pics"><img src={'https://image.tmdb.org/t/p/w500'+data.poster_path} alt={data.title} className="img" /></div>
          </div>
        </div>
        <div className="vinf">{data.overview}</div>
      </>
    )
  }


  return (
  <>
    <article className="pop-layer c on bottom popup movie view">
      <div className="pbd">
        <button type="button" className="btn-pop-close back" onClick={ () => { navigate(-1) } } ><i className="fa-regular fa-xmark"></i></button>
        <div className="pct">
        <div className="bgs" style={{backgroundImage: `url(${bgImg}) `}}></div>
          <main className="poptents">
            <MovieInfo data={datas} id={params.id} />
          </main>
        </div>
      </div>
    </article>
  </>
  )
}
