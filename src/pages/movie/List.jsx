import React, { useState, useEffect } from 'react';
import { Link, Outlet, useSearchParams, useLocation } from 'react-router-dom';  // useParams
import axios from 'axios';
import ui from '../../ui';
// import View from 'View.jsx';


export default function List() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('search'));


  // const [keyword, keywordSet ] = useState('');

  let keyword = searchParams.get('search') 
  let {state} = useLocation();
  console.log(state);

  
  
  const [mlist, setMlist] = useState([]);
  // const [page, setPage] = useState(1);
  let page = 1;
  
  
  const [cate, setCate] = useState({});
  // const total;
  const getCate = ()=>{
    axios.get('https://api.themoviedb.org/3/genre/movie/list?language=ko&region=kr&api_key=f76021076e8162ea929bd2cea62c6646').then(res =>{
      res.data.genres.forEach( d=> cate[d.id] = d.name);
      setCate(cate => cate); 
    });
  };
  // const keyword = "미녀";
  let fetchURL;
  let word;
  
  const fetchMoive = (page)=>{
    ui.loading.show();
    if (state) { setMlist([])} 
    console.log( "검색어 " +keyword);
    console.log( "로드 " + page );
    
    if(keyword){
      word = keyword;
      fetchURL = 'https://api.themoviedb.org/3/search/movie?page='+page+'&language=ko&region=kr&query='+word+'&api_key=f76021076e8162ea929bd2cea62c6646';
    }else{
      fetchURL = 'https://api.themoviedb.org/3/movie/popular?page='+page+'&language=ko&region=kr&sort_by=release_date.desc&api_key=f76021076e8162ea929bd2cea62c6646';
    }

    // 'https://api.themoviedb.org/3/movie/now_playing?page='+page+'&language=ko&region=kr&sort_by=release_date.desc&api_key=f76021076e8162ea929bd2cea62c6646'
    // 'https://api.themoviedb.org/3/tv/popular?page='+page+'&language=ko&region=kr&sort_by=release_date.desc&api_key=f76021076e8162ea929bd2cea62c6646'
    // 'https://api.themoviedb.org/3/movie/popular?page='+page+'&language=ko&region=kr&sort_by=release_date.desc&api_key=f76021076e8162ea929bd2cea62c6646'

    axios.get( fetchURL ).then(res =>{
      console.log(res.data);
      setMlist( mlist => [...mlist,...res.data.results] );
      console.log( mlist );
      console.log(page + "=== " + res.data.total_pages );
      callStat = true;
      console.log(callStat);
      ui.loading.hide();
      if( res.data.total_pages <= page ) {
        callStat = false;
        document.querySelector(".ui-loadmore").classList.add("hide");
      };


    }).catch(e=>{
      console.log(e);
      ui.loading.hide();
      document.querySelector(".ui-loadmore").classList.add("error");
    }); 
  }

  useEffect(() => {
    ui.viewport.scrollTop();
    getCate();
    fetchMoive(page);
    
    window.addEventListener("scroll", scrollEvent);
    return ()=>{
      window.removeEventListener("scroll", scrollEvent);
    }
    // eslint-disable-next-line
  },[]);


  // const [callStat, callStatSet] = useState(true);
  let callStat = true;
  const scrollEvent = ()=> {
    const wHt = ui.viewport.height();
    const docH = ui.viewport.docHeight();
    const scr = ui.viewport.scrollTop() + wHt + 10;
    console.log(callStat +" =  "+  page);
    if (docH <= scr && callStat === true) {
      console.log("바닥도착");
      // console.log( page);
      document.querySelector(".ui-loadmore")?.classList.add("active");
      callStat = false;
      console.log(callStat);
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
  // if (!cate) return null;
  // console.log(dlist);

  return (
  <>
    <Outlet />
    <div className="container move">
      <main className="contents">
        <div className='movie-list'>
            
          <ul className='list'>
            
          {
            
            mlist.map((data,num) =>{
              // console.log(data.poster_path);
              const img = data.poster_path ? data.poster_path : "/9DVtwkuxzCLGVMapioeJ4RflfyW.jpg";
              const bgs = data.backdrop_path ? data.backdrop_path : data.poster_path;
              return(
                <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                  <Link className="box" to={"/movie/"+data.id}>
                    <div className="cont">
                      <div className="pics"><img src={`https://image.tmdb.org/t/p/w200${img}`} alt="" className='img'/></div>
                      <div className="desc">
                        <div className="tits">{data.title}</div>
                        <div className="text">{data.overview}</div>
                      </div>
                    </div>
                    <div className="info">
                      <div className="dd">
                        <div className="cate">
                          <span className="txt">
                            {data.genre_ids.map( item => <em className="ico" key={item}> {cate[item]}</em> )}
                          </span>
                          
                        </div>
                      </div>
                      <div className="dd">
                        <div className="hits">
                           <em>
                              
                              <b>{data.id} </b>
                            </em>
                          <em><i className="fa-regular fa-heart"></i> <b>{data.vote_average}</b></em>
                        </div>
                        <div className="date"><i className="fa-regular fa-calendar-days"></i> <b>{data.release_date}</b></div>
                      </div>
                    </div>
                    <div className="bgs" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${bgs})`}}></div>
                  </Link>
                </li>
              )
            })
          }
          </ul>

          <div className="ui-loadmore">
            <em><i className="fa-duotone fa-spinner"></i></em>
            <button onClick={ (e)=>{
              // setPage(page + 1)
              
              fetchMoive( page + 1 , e)
            }} type="button" className="btn-load" title="불러오기"><i className="fa-regular fa-rotate-right"></i></button>
          </div>

        </div>
      </main>
    </div>
  </>  
  )
}