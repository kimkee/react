import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useSearchParams  } from 'react-router-dom';  // useParams ,useLocation ,useParams,

import axios from 'axios';
import ui from '../../ui';
// import View from 'View.jsx';


export default function Search() {
  const [searchParams] = useSearchParams();
  // let params = useParams();
  // let {state} = useLocation();
  // console.log(state);
  let [keyword,keywordSet] = useState(searchParams.get('search'));
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

  const fetchMoive = (page , kwd )=>{
    
    ui.loading.show();
    
    console.log( "검색어 " +keyword);
    console.log( "로드 " + page );

    kwd = keyword
    
    fetchURL = 'https://api.themoviedb.org/3/search/movie?language=ko&region=kr&page='+page+'&query='+kwd+'&api_key=f76021076e8162ea929bd2cea62c6646';
    if(keyword == null) {
      fetchURL = ''
      ui.loading.hide();
      return
    };
    

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
        document.querySelector(".ui-loadmore")?.classList.add("hide");
      };

      
    }).catch(e=>{
      console.log(e);
      ui.loading.hide();
      document.querySelector(".ui-loadmore")?.classList.add("error");
    }); 
  }

  useEffect(() => {
    getCate();
    fetchMoive(page);
    document.querySelector("#input_kwd").focus();
    window.addEventListener("scroll", scrollEvent);
    return ()=>{
      window.removeEventListener("scroll", scrollEvent);
    }
    // eslint-disable-next-line
  },[keyword]);


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
      // console.log(callStat);
      setTimeout( ()=> {
        // setPage( page + 1 );
        page = page + 1;
        fetchMoive( page );
      } ,400 );
    }
  };
  

  // console.log(datas);
  // console.log(genr);
  // console.log(datas.results);
  // console.log(cate);
  // if (!cate) return null;
  // console.log(dlist);
  let navigate = useNavigate();
  const [stext ,stextSet]  = useState('');
  const goSearch = (e) => {
    keywordSet( document.querySelector("#input_kwd")?.value );
    navigate('/search/?search='+stext);
    setMlist([]);
    fetchMoive( 1 );
    e.preventDefault();
    document.querySelector(".movie-list").focus();
  }
  const onChange = (event) => {
    stextSet(event.target.value )
    keywordSet(event.target.value )
    setMlist([]);
    // fetchMoive( 1 );
  } 
  
  console.log(  document.querySelector("#input_kwd")?.value );


  console.log(mlist);
 

  return (
  <>
    <Outlet />
    <div className="container move search">
      <main className="contents">
        <div className="schs-form">
          <div className="inr">
            <form className="form" onSubmit={ goSearch }>
              <span className="input">
                <input type="text" placeholder="영화 제목을 입력하세요." onChange={onChange} id="input_kwd"/>
              </span>
              <button type="submit" className="btn bt-sch"><i className="fa-regular fa-search"></i></button>
            </form>
          </div>
        </div>
        { 
        
        mlist.length <= 0 || !keyword ? (
        <div className="nodata"><p>검색 결과가 없습니다.</p></div>)
         : 
        <div className='movie-list' tabIndex="-1">
          <ul className='list'>
          {
            mlist.map((data,num) =>{
              // console.log(data.poster_path);
              const img = data.poster_path ? data.poster_path : "/9DVtwkuxzCLGVMapioeJ4RflfyW.jpg";
              
              const bgs = data.backdrop_path ? data.backdrop_path : data.poster_path;
              return(
                <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                  <Link className="box" to={"/search/"+data.id}>
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
              page = page + 1
              fetchMoive( page , e)
            }} type="button" className="btn-load" title="불러오기"><i className="fa-regular fa-rotate-right"></i></button>
          </div>

        </div>
        
        }
      </main>
    </div>
  </>  
  )
}