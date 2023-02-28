import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom'; //,useOutletContext  
import ui from '../../ui';
export default function View() {

  let params = useParams()
  let navigate = useNavigate();

  
  const [cate, setCate] = useState({});
  const getCate = async ()=>{
    let cate = {
      genr:{}
    }
    await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=ko&region=kr&api_key=${process.env.REACT_APP_KEY}`).then(res =>{
      res.data.genres.forEach( d=> cate.genr[d.id] = d.name);
      // setCate(cate); 
    }).then( res =>{
      setCate(cate);
      console.log(cate);
    });
  };


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
  const [casts, setCasts] = useState(null);
  const [bgImg, setBgImg] = useState('');
  
  const fetchURL = `https://api.themoviedb.org/3/movie/${postID}?language=ko&region=kr&api_key=${process.env.REACT_APP_KEY}`;
  const fetchDatas = () => {
    axios.get( fetchURL ).then(response => {
      setDatas(response.data);
      let bgDm = response.data.backdrop_path ? response.data.backdrop_path : response.data.poster_path;
      setBgImg('https://image.tmdb.org/t/p/w500'+bgDm);
    }).catch( e => {
      console.log(e);
    });
  };
  const castURL = `https://api.themoviedb.org/3/movie/${postID}/credits?&region=kr&language=ko&api_key=${process.env.REACT_APP_KEY}`;
  const fetchCast = () => {
    axios.get( castURL ).then(response => {
      console.log("배우");
      console.log(response.data);
      setCasts( () => response.data);
      
    }).catch( e => {
      console.log(e);
    });
  };




  useEffect(() => {
    getCate();
    fetchDatas();
    fetchCast();
    popResize();
    window.addEventListener("resize",popResize);
    ui.lock.using(true);
    return () => {
      window.removeEventListener("resize",popResize);
      console.log('컴포넌트가 화면에서 사라짐');
      ui.lock.using(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  // console.log(datas);
  // if(!datas)  return ;
  
  const MovieInfo =({data,cate})=>{
    console.log( data);
    console.log( cate.genr);
    
    console.log( casts);
    if(!data)  return <div><div className="ui-loading-dot on"> <div className="bx"><em><i></i></em></div> </div></div>;
    
    return (
      <>
        <div className="info">
          <div className="desc">
            <p className="tit">{data.title}</p>
            <p className="sit">{data.tagline}</p>
            <p className="tio">{data.original_title}</p>
            <ul className="lst">
              <li className="star">
                <em className="ui-star" dangerouslySetInnerHTML={ {__html:  ui.star.set(data.vote_average)} } ></em>
                
              </li>
              <li className="cate">
              
                
                  {/* {cate?.genr} */}
                  {data.genres.map( item => <em className="ico" key={item.id}> {cate.genr ? cate.genr[item.id] : null }</em> )}
                
                
              
              </li>
              <li className="vot">
                <i className="fa-regular fa-thumbs-up"></i>
                <b>평점</b> : {data.vote_average} / 10
              </li>
              <li className="opn">
                <i className=" fa-regular fa-camera-movie"></i>
                <b>개봉</b> : {data.release_date}</li>
              <li className="tim">
                <i className="fa-regular fa-timer"></i>
                <b>시간</b> : {data.runtime} 분 </li> 
            </ul>
          </div>
          <div className="thum">
            <div className="pics"><img src={'https://image.tmdb.org/t/p/w300'+data.poster_path} alt={data.title} className="img" onError={(e)=>{e.target.src=`${process.env.PUBLIC_URL}/img/common/non_poster.png`}}/></div>
          </div>
        </div>
        {data.overview ? 
        <div className="vinf">{data.overview}</div>
        : null}

        {casts?.cast.length ?
        <div className="cast">
          <h4 className="tts">출연</h4>
          <div className="lst">
            {
              casts?.cast.filter( (item, i) => i < 4 ).map( b => {
                return (
                  <div key={b.cast_id} className='profile'>
                    <div className="pics"><img src={'https://image.tmdb.org/t/p/w200'+b.profile_path} alt={b.name} className="img"  onError={(e)=>{e.target.src=`${process.env.PUBLIC_URL}/img/common/user.png`}}/></div>
                    <div className="name">{b.name}</div>
                    <div className="carc">{b.character}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
        :null}
        
        {casts?.crew.length ?
        <div className="cast">
          <h4 className="tts">스텝</h4>
          <div className="lst">
            {
              casts?.crew.filter( (item, i) => i < 4 ).map( b => {
                return (
                  <div key={b.credit_id} className='profile'>
                    <div className="pics"><img src={'https://image.tmdb.org/t/p/w200'+b.profile_path} alt={b.name} className="img"  onError={(e)=>{e.target.src=`${process.env.PUBLIC_URL}/img/common/user.png`}}/></div>
                    <div className="name">{b.name}</div>
                    <div className="carc">{b.known_for_department}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
        :null}
      </>
    )
  }

  return (
  <>
    <article className="pop-layer c on bottom popup movie view">
      <div className="pbd">
        <button type="button" className="btn-pop-close back" onClick={ () => { navigate(-1) } } ><i className="fa-regular fa-xmark"></i></button>
        {/* <div className="phd">
          <div className="inr">
            <div className="ptit">{datas?.title}</div>
          </div>
        </div> */

        }
        <div className="pct">
        <div className="bgs" style={{backgroundImage: `url(${bgImg}) `}}></div>
          <main className="poptents">
            
            <MovieInfo data={datas} cast={casts}  cate={cate}/>
          </main>
        </div>
      </div>
    </article>
  </>
  )
}
