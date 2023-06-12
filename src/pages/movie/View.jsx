import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Outlet,useParams, useNavigate, Link} from 'react-router-dom'; //,useOutletContext  , useLocation
import ui from '/src/ui';
import StarPoint from '/src/components/StarPoint';
import ViewElips from './ViewElips';
import ViewRev from './ViewRev';
export default function View({prop}) {
  
  
  let params = useParams()
  console.log(params);
  let opts = params.menu
  let navigate = useNavigate();
  prop.page = prop.page || 'page' ;
  
  console.log(params , opts);
  const [cate, setCate] = useState({});
  const getCate = async ()=>{
    let cate = {
      genr:{}
    }
    await axios.get(`https://api.themoviedb.org/3/genre/${opts}/list?language=ko&region=kr&api_key=${import.meta.env.VITE_TMDB_API_KEY}`).then(res =>{
      res.data.genres.forEach( d=> cate.genr[d.id] = d.name);
      // setCate(cate); 
    }).then( res =>{ setCate(cate); console.log(cate); });
  };


  const postID = params.id;
  const popResize = ()=>{
    let $pop =  document.querySelector(".popup.movie");
    let pctnH =  $pop.offsetHeight || 0;
    let pbtnH =  $pop.querySelector(".pbt")?.offsetHeight || 0 ;
    let phtnH =  $pop.querySelector(".phd")?.offsetHeight || 0 ;
    pctnH = (pctnH - phtnH) || 0 ;
    console.log(pctnH  );
    $pop.querySelector(".pct").style.height = pctnH - pbtnH+"px" ; 
  }


  const [datas, setDatas] = useState(null);
  const [casts, setCasts] = useState(null);
  const [moves, setMovs] = useState(null);
  const [bgImg, setBgImg] = useState('');
  
  const fetchURL = `https://api.themoviedb.org/3/${opts}/${postID}?language=ko&region=kr&api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=images&include_image_language=en,null`;
  const fetchDatas = () => {
    axios.get( fetchURL ).then(response => {
      console.log("영화정보" , response.data);
      setDatas(response.data);
      let bgDm = response.data.backdrop_path ? response.data.backdrop_path : response.data.poster_path;
      setBgImg('https://image.tmdb.org/t/p/w780'+bgDm);
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

  
  const scrollEvent = ()=> {
    const scr = parseInt( document.querySelector(".popup.movie .pct").scrollTop );
    if( scr > 50){
      document.querySelector(".popup.movie .phd").classList.add("trans");
      document.querySelector(".floatpop")?.classList.add("on-top");
    }else{
      document.querySelector(".popup.movie .phd").classList.remove("trans");
      document.querySelector(".floatpop")?.classList.remove("on-top");
    }
  };
  const isPage = ()=> prop.page === "list" || prop.page === "search" || prop.page === "home"
  const goTop = ()=>{
    document.querySelector(".popup.movie .pct").scrollTo(0,0);
  }
  const imgError = (e)=> {
    (e)=>{console( e + "썸네일 없음")} 
  }
  useEffect(() => {
    goTop();
    console.log(  document.querySelector(".pct").offsetHeight );
    getCate();
    fetchDatas();
    fetchCast();
    fetchMov();
    popResize();
    document.querySelector(".popup.movie .pct").addEventListener("scroll",scrollEvent);
    window.addEventListener("resize",popResize);
    document.querySelector(".popup.movie").classList.add("ani","on");
    ui.lock.using(true); 

    return () => {
      window.removeEventListener("resize",popResize);
      console.log('컴포넌트가 화면에서 사라짐');
      ui.lock.using(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params.id]);
  
  // console.log(datas);
  // if(!datas)  return ;
  // console.log( txtHt );
  // if(!datas || !casts)  return <div><div className="ui-loading-dot on"> <div className="bx"><em><i></i></em></div> </div></div>;

  return (
  <>
    <Outlet/>
    <article className={`pop-layer a bottom popup movie view ${ isPage() ? '' : 'page'} `}>
      <div className="pbd">
        <div className="phd">
          <div className="inr">
              <div className="ptit">{datas?.title || datas?.name}</div>
          </div>
        </div>
        {
          isPage() ?
          <button type="button" className="btn-pop-close back" onClick={ () => { navigate(-1) } } ><i className="fa-regular fa-arrow-left"></i>{/* <i className="fa-regular fa-xmark"></i> */}</button>
        :
          <button type="button" className="btn-pop-close home" onClick={ () => { navigate("/home/") } } ><i className="fa-solid fa-house"></i>{/* <i className="fa-regular fa-xmark"></i> */}</button>
        }
        
        <div className="bgs" style={{backgroundImage: `url(${bgImg}) `}}></div>
        <div className="pct">
          <main className="poptents">
            
            { !datas && !casts && !moves &&
              <div className="m-info"><div className="ui-loading-dot on"> <div className="bx"><em><i></i></em></div> </div></div>
            }
            { datas && casts && moves &&
              <div className="m-info">
                
                <div className="info">
                  <div className="desc">
                    
                    {datas.title && <p className="tit">{datas.title}</p>}
                    {datas.tagline && <p className="sit">{datas.tagline}</p>}
                    {datas.original_title && <p className="tio">{datas.original_title}</p>}

                    {datas.name && <p className="tit">{datas.name}</p>}
                    {datas.original_name && <p className="tio">{datas.original_name}</p>}

                    <div className="star">
                      <StarPoint point={datas.vote_average} />
                    </div>
                    <div className="cate">
                      {datas.genres.map( item => <em className="ico" key={item.id}> {cate.genr ? cate.genr[item.id] : null }</em> )}
                    </div>
                    <ul className="lst">
                      <li className="vot"> 
                        <i className="fa-regular fa-thumbs-up"></i> <b>평점</b> : {datas.vote_average} / 10 
                      </li>
                      {datas.release_date &&
                      <li className="opn">
                        <i className=" fa-regular fa-camera-movie"></i>  <b>개봉</b> : {datas.release_date}
                      </li>}
                      {datas.first_air_date &&
                      <li className="opn">
                        <i className=" fa-regular fa-camera-movie"></i>  {datas.first_air_date} ~ {datas.last_air_date}
                      </li>}
                      
                      {datas.runtime && 
                      <li className="tim">
                        <i className="fa-regular fa-timer"></i> <b>시간</b> : {datas.runtime} 분
                      </li>} 
                      {datas.number_of_seasons && 
                      <li className="tim">
                        <i className="fa-regular fa-timer"></i> <b>시즌</b> : {datas.number_of_seasons}개  - <b>에피소드</b> : {datas.number_of_episodes}개
                      </li>} 
                      {datas.homepage && 
                      <li className="web">
                        <i className="fa-regular fa-globe"></i> <a  className="lk" href={datas.homepage } target="_blank" rel="noopener noreferrer">{datas.homepage}</a>
                      </li>} 
                    </ul>
                  </div>
                  <div className="thum">
                    <Link to={`./poster/0`} className="pics"><img src={'https://image.tmdb.org/t/p/w300'+datas.poster_path} alt={datas.title} className="img" onError={(e)=>{e.target.src=`${import.meta.env.VITE_REACT_APP_PUBLIC_URL}img/common/non_poster.png`}}/></Link>
                  </div>
                </div>
                
                {datas.overview && <ViewElips overview={datas.overview} /> }
                
                {casts.cast.length ?
                <div className="sect cast">
                  <h4 className="tts">출연진</h4>
                  <div className="lst">
                    {
                      casts.cast.filter( (item, i) => i < 999 ).map( b => {
                        return (
                          <Link to={`./person/${b.id}`} key={b.credit_id} className='profile'>
                            <div className="pics"><img src={'https://image.tmdb.org/t/p/w92'+b.profile_path} alt={b.name} className="img"  onError={(e)=>{e.target.src=`${import.meta.env.VITE_REACT_APP_PUBLIC_URL}img/common/user.png`}} loading="lazy" /></div>
                            <div className="name">{b.name}</div>
                            <div className="carc">{b.character}</div>
                          </Link>
                        )
                      })
                    }
                  </div>
                </div>
                : null}
                
                {casts.crew.length ?
                <div className="sect cast">
                  <h4 className="tts">제작진</h4>
                  <div className="lst">
                    {
                      casts.crew.filter( (item, i) => i < 999 ).map( b => {
                        return (
                          <Link to={`./person/${b.id}`} key={b.credit_id} className='profile'>
                            <div className="pics"><img src={'https://image.tmdb.org/t/p/w92'+b.profile_path} alt={b.name} className="img"  onError={(e)=>{e.target.src=`${import.meta.env.VITE_REACT_APP_PUBLIC_URL}img/common/user.png`}} loading="lazy" /></div>
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
                  <h4 className="tts">포스터 : {datas.images.posters.length+1}</h4>
                  <div className="lst">
                    <div className='box' data-index={0}>
                      <Link to={`./poster/0`}  className='pic'><img src={'https://image.tmdb.org/t/p/w300'+datas.poster_path} alt={datas.title} className="img" onError={(e)=>{e.target.src=`${import.meta.env.VITE_REACT_APP_PUBLIC_URL}img/common/non_poster.png`}} loading="lazy" /></Link> 
                    </div>
                    {
                    datas.images.posters.map((img,idx) => {
                      return(
                      <div key={idx} className='box' data-index={idx+1}>
                        <Link to={`./poster/${idx+1}`}  className='pic'><img src={'https://image.tmdb.org/t/p/w300'+img.file_path} alt={img.name} className="img" onError={(e)=>{e.target.src=`${import.meta.env.VITE_REACT_APP_PUBLIC_URL}img/common/non_poster.png`}} loading="lazy" /></Link> 
                      </div>
                      )
                    })
                    }
                  </div>
                </div>
                : null}

                {moves.results.length > 0 ?
                <div className="sect movs">
                  <h4 className="tts">영상</h4>
                  <div className="lst">
                    {
                      moves.results.filter( (item, i) => i < 10 ).reverse().map( b => {
                        return (
                          <div className="box" key={b.id}>
                            <a className="pic" href={"//www.youtube.com/embed/"+b.key} target="_blank">
                              <span className="msg"><span className="tit">{b.name}</span></span>
                              <i className="ico fa-solid fa-play"></i>
                              <img className="img" src={"//i.ytimg.com/vi/"+b.key+"/hqdefault.jpg"} onError={ (e)=>{ e.target.src=`${import.meta.env.VITE_REACT_APP_PUBLIC_URL}img/common/user.png` } } alt={b.name} />
                            </a>
                            {/* <iframe className='iframe' title={b.id} src={"//www.youtube.com/embed/"+b.key}   allow="autoplay; encrypted-media" allowFullScreen></iframe> */}
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                : null}


                <ViewRev postID={postID} opts={opts}/>

                {datas.production_companies.length ? 
                <>
                <div className="sect comp">
                  {
                    datas.production_companies.map(comp => {
                      return comp.logo_path 
                      ? 
                      <span key={comp.id} className='logo'><img src={'https://image.tmdb.org/t/p/w92'+comp.logo_path} alt={comp.name} className="img" /></span> 
                      : 
                      <span key={comp.id} className='logo'>{comp.name}</span> 
                    })
                  }
                </div>
                </>
                : null}

              </div> 
              
            }

          </main>
        </div>
      
        <div className="floatpop">
          <button type="button" className="bt top" onClick={goTop}><i className="fa-solid fa-arrow-up"></i><em>위로</em></button>
        </div>
      </div>
    </article>
  </>
  )
}
