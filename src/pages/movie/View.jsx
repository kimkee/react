import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate  } from 'react-router-dom';

export default function View() {
   
  useEffect(() => {
    fetchDatas();
    popResize();
    window.addEventListener("resize",popResize);
    return () => {
      window.removeEventListener("resize",popResize);
      console.log('컴포넌트가 화면에서 사라짐');
    };
  },[]);

  let params = useParams()
  let navigate = useNavigate();
  console.log(params , params.id);
  const postID = params.id;
  const popResize = ()=>{
    let $pop =  document.querySelector(".pop-layer");
    // console.log($pop);
    let pctnH =  $pop.offsetHeight || 0;
    let pbtnH =  $pop.querySelector(".pbt")?.offsetHeight || 0 ;
    let phtnH =  $pop.querySelector(".phd")?.offsetHeight || 0 ;
    pctnH = (pctnH - phtnH) || 0 ;
    console.log(pctnH  );
    $pop.querySelector(".pct").style.height = pctnH - pbtnH+"px" ; 
  }


  const [datas, setDatas] = useState(null);
  const [genr, setGenr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let movieData = {};
  const fetchDatas = async () => {
    setLoading(true)
    await axios.get(
      'https://api.themoviedb.org/3/movie/'+postID+'?language=ko&region=kr&moive_id=505642&api_key=f76021076e8162ea929bd2cea62c6646'
    ).then(response => {
      "성공"
      setDatas(response.data);
      setLoading(false);
      console.log(datas.title);
    }).catch( e => {
      console.log(e);
    });
  };

  // if (loading) return <div>로딩중..</div>; 
  
  const [bgImg, setBgImg] = useState('/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg');
  const MovieInfo =({data},id)=>{
    console.log( data);
    if(!data)  return 

    setBgImg(data.backdrop_path);
    return (
      <>
        
        <p>{data.poster_path}</p>
        <p>{data.backdrop_path}</p>
        <p>{data.title}</p>
        <p>{data.overview}</p>
        <p>{data.overview}</p>
      </>
    )
  }
  // if (loading) return <div>로딩중..</div>; 
  // if (error) return <div>에러가 발생했습니다</div>;

  // 아직 datas가 받아와 지지 않았을 때는 아무것도 표시되지 않도록 해줍니다.
  // if (!movieData) return null;
  console.log(movieData);


  return (
  <>
    <article className="pop-layer a on bottom popup movie view">
      <div className="pbd">
        <button type="button" className="btn-pop-close" onClick={ () => { navigate(-1) } } ><i className="fa-regular fa-xmark"></i></button>
        {/* style={{background: `url(https://image.tmdb.org/t/p/w500${bgImg}) no-repeat`}} */}
        <div className="pct">
          <div className="bgs" style={{background: `url(https://image.tmdb.org/t/p/w500${bgImg}) no-repeat`}}></div>
          <main className="poptents">
            <MovieInfo data={datas} id={params.id} />
            
          </main>
        </div>
      </div>
    </article>
  </>
  )
}
