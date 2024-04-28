import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,
import axios from 'axios';
import ui from '../../ui.js';
import Skeleton from '../../components/Skeleton.jsx';
import ItemB from '../../components/ItemB.jsx';
import CateMenu from '../../components/CateMenu.jsx';


export default function Lists() {
  // console.log(opts);

  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate();
  const opts = params.menu;
  const cateID = params.cate;
  cateID === undefined && navigate(`/${opts}/0`) ;
  // console.log(cateID);

  console.log( params , location.pathname)
  // let cateList;
  const cateList = cateID !== '0' ? `&with_genres=${cateID}` : ``;
  console.log(cateList);
 
  const [movieList, movieListSet] = useState([]);
  const [genrMenu, genrMenuSet] = useState([]);

  let page = 1;
  
  // const [cate, setCate] = useState({});
  // let cate = {};
  // const total;
  const getCate = async ()=>{
    await axios.get(`//api.themoviedb.org/3/genre/${opts}/list?language=ko&region=kr&api_key=${import.meta.env.VITE_TMDB_API_KEY}`).then(res =>{
      // console.log(res.data.genres);
      genrMenuSet(res.data.genres);
    });
  };
  
  const [nowPage, nowPageSet] = useState({ "pge":0, "tot":0 });
  const [loadActive, loadActiveSet] = useState(``);
  const [loadHide, loadHideSet] = useState(``);
  const [loadError, loadErrorSet] = useState(``);
  
  const fetchMoive = async (page)=>{
    
    // nowPageSet({ "pge":0, "tot":0 });
    //  vote_count.desc  추천순
    //  with_genres=16  장르별
    // /trending/movie/day
    // let fetchURL = `https://api.themoviedb.org/3/${opts}/popular?${cateList}&page=${page}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
    const fetchURL = `https://api.themoviedb.org/3/discover/${opts}?${cateList}&page=${page}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
    // let fetchURL = `https://api.themoviedb.org/3/trending/${opts}/week?${cateList}&page=${page}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
    // top_rated
    // 'https://api.themoviedb.org/3/movie/now_playing?page='+page+'&language=ko&region=kr&sort_by=release_date.desc&api_key=f76021076e8162ea929bd2cea62c6646'
    // 'https://api.themoviedb.org/3/tv/popular?page='+page+'&language=ko&region=kr&sort_by=release_date.desc&api_key=f76021076e8162ea929bd2cea62c6646'
    // 'https://api.themoviedb.org/3/movie/popular?page='+page+'&language=ko&region=kr&sort_by=release_date.desc&api_key=f76021076e8162ea929bd2cea62c6646'
    // setMlist([])
    await axios.get( fetchURL ).then(res =>{
      console.log(res.data);console.log( "로드 " + page );
      movieListSet( prevList => [...prevList, ...res.data.results] );
      console.log(`callStat : ${callStat} , page : ${page} , res.data.total_pages :  ${res.data.total_pages} `);
      callStat = true;
      console.log(`callStat : ${callStat} , page : ${page} , res.data.total_pages :  ${res.data.total_pages} `);
      loadErrorSet("");
      nowPageSet({ "pge":res.data.page, "tot":res.data.total_pages });
      if( res.data.total_pages <= page ) {
        callStat = false;
        loadHideSet(" hide");
      }else{
        loadHideSet("");
      };
      // document.querySelector(".ui-loadmore")?.classList.remove("active");
      loadActiveSet("");

    }).catch(e=>{
      console.log(e);
      callStat = true;
      loadErrorSet(" error");
    }); 
  }

  console.log(movieList);  
  
  useEffect( () => {

    movieListSet([])
    window.scrollTo(0,0);
    // ui.loading.show();
    fetchMoive(1);
    getCate();
    document.querySelector(".header").classList.remove("trans");
    window.addEventListener("scroll", scrollEvent);
    return ()=>{
      window.removeEventListener("scroll", scrollEvent);
    }
    // eslint-disable-next-line
  },[cateID, opts]);


  // const [callStat, callStatSet] = useState(true);
  let callStat = true;
  const scrollEvent = ()=> {
    const wHt = ui.viewport.height();
    const docH = ui.viewport.docHeight();
    const scr = ui.viewport.scrollTop() + wHt + 300;
    console.log(callStat +" =  "+  page);
    if (docH <= scr && callStat === true) {
      console.log("바닥도착");
      // console.log( page);
      // document.querySelector(".ui-loadmore")?.classList.add("active");
      loadActiveSet(" active");
      callStat = false;
      console.log(callStat);
      if(ui.lock.stat) {
        callStat = true;
        return
      };
      setTimeout( ()=> {
        // setPage( page + 1 );
        page = page + 1;
        fetchMoive( page   );
      } ,400 );
    }
  };
  

  // console.log(datas);
  // console.log(genr);
  // console.log(datas.results);
  // console.log(cate);
  //  if (!cate[12]) return;
  // console.log(dlist);

  return (
    <>
    <Outlet/>

    <div className="container page movie list">
      <main className="contents">

        <div className='poster-list'>
            

          { !movieList.length 
          ?
          <ul className='list skelt'>
            <Skeleton opts={ {type: 'movie-list', num: 20} } />
            {/* <div className="ui-loading-dot on"> <div className="bx"><em><i></i></em></div> </div> */}
          </ul>
          :
          <>
          <ul className='list'>
          {
            movieList.map((data,num) =>{
                return(
                  <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                    <ItemB data={data} />
                  </li>
                )
            })
          }
          </ul>
          <div className={`ui-loadmore${loadActive+loadHide+loadError}`}>
            <span className="ui-loading ui-load-glx">
              <span className="gbx"> <em className="bx"> <i></i> <i></i><i></i><i></i> </em> </span>
            </span>
            <button onClick={ (e)=>{ callStat = true; fetchMoive( page , e); } } type="button" className="btn-load">
              <i className="fa-regular fa-rotate-right"></i>
            </button>
          </div>
          </>
          }
        
        </div>
        
        <div className="page-set">
        { nowPage.tot > 0 &&
          <div className="inr"><div className="pg"><i className="p">{nowPage.pge}</i> <i className="s">/</i> <i className="t">{nowPage.tot}</i></div></div>
        }
        </div>

      </main>
    </div>
    <CateMenu menu={genrMenu} opts={opts} />
  </>
  )
}