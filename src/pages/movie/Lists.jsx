import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,
import axios from 'axios';
import ui from '../../ui';
import ItemB from '../../components/ItemB.jsx';
import CateMenu from '../../components/CateMenu.jsx';


export default function Lists() {


  let params = useParams()
  let navigate = useNavigate();
  const cateID = params.cate;
  console.log(params.cate);
  cateID === undefined && navigate('/movie/0') ;

  console.log(cateID )
  let cateList;
  cateList = cateID !== '0' ? `&with_genres=${cateID}` : ``;
  console.log(cateList);
 
  const [mlist, setMlist] = useState([]);
  const [genrMenu, genrMenuSet] = useState([]);

  let page = 1;
  
  
  
  const [cate, setCate] = useState({});
  // let cate = {};
  // const total;
  const getCate = async ()=>{
    let cate = {
      genr:{}
    }
    await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=ko&region=kr&api_key=${process.env.REACT_APP_KEY}`).then(res =>{
      res.data.genres.forEach( d=> cate.genr[d.id] = d.name);
      console.log(res.data.genres);
      genrMenuSet(res.data.genres);
      // setCate(cate); 
    }).then( res =>{
      setCate(cate);
      console.log(cate);
    });
  };
  // const keyword = "미녀";
  
  const [nowPage, nowPageSet] = useState({
    "pge":0,
    "tot":0
  })
  
  const fetchMoive = (page)=>{
    
    console.log( "로드 " + page );
    //  vote_count.desc  추천순
    //  with_genres=16  장르별
    // /trending/movie/day
    let fetchURL = `https://api.themoviedb.org/3/movie/popular?${cateList}&page=${page}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${process.env.REACT_APP_KEY}`;
    // let fetchURL = `https://api.themoviedb.org/3/discover/movie?page=${page}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${process.env.REACT_APP_KEY}`;
    // let fetchURL = `https://api.themoviedb.org/3/trending/movie/day?page=${page}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${process.env.REACT_APP_KEY}`;
    // top_rated
    // 'https://api.themoviedb.org/3/movie/now_playing?page='+page+'&language=ko&region=kr&sort_by=release_date.desc&api_key=f76021076e8162ea929bd2cea62c6646'
    // 'https://api.themoviedb.org/3/tv/popular?page='+page+'&language=ko&region=kr&sort_by=release_date.desc&api_key=f76021076e8162ea929bd2cea62c6646'
    // 'https://api.themoviedb.org/3/movie/popular?page='+page+'&language=ko&region=kr&sort_by=release_date.desc&api_key=f76021076e8162ea929bd2cea62c6646'
    // setMlist([])
    axios.get( fetchURL ).then(res =>{
      console.log(res.data);
      setMlist( mlist => [...mlist,...res.data.results] );
      console.log(page + "=== " + res.data.total_pages );
      callStat = true;
      console.log(callStat);
      // ui.loading.hide();
      nowPageSet({
        "pge":res.data.page,
        "tot":res.data.total_pages
      });
      if( res.data.total_pages <= page ) {
        callStat = false;
        document.querySelector(".ui-loadmore")?.classList.add("hide");
      }else{
        document.querySelector(".ui-loadmore")?.classList.remove("hide");

      };
      document.querySelector(".ui-loadmore")?.classList.remove("active");


    }).catch(e=>{
      console.log(e);
      // ui.loading.hide();
      document.querySelector(".ui-loadmore")?.classList.add("error");
    }); 
  }

  
  useEffect( () => {

    setMlist([])
    window.scrollTo(0,0);
    // ui.loading.show();
    fetchMoive(page);
    getCate();
    
    window.addEventListener("scroll", scrollEvent);
    return ()=>{
      window.removeEventListener("scroll", scrollEvent);
    }
    // eslint-disable-next-line
  },[cateID]);


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
    <Outlet />
    <div className="container page movie list">
      <main className="contents">

        <CateMenu menu={genrMenu}/>


        <div className='poster-list'>
            
          { !mlist.length 
          ?
            <div className="ui-loading-dot on"> <div className="bx"><em><i></i></em></div> </div>
          :
          <>
          <ul className='list'>            
          {
            mlist.map((data,num) =>{
                return(
                  <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                    <ItemB data={data} cate={cate} />
                  </li>
                )
            })
          }
          </ul>
          <div className="ui-loadmore">
            <em><i className="fa-duotone fa-spinner"></i></em>
            <button onClick={ (e)=>{ fetchMoive( page + 1 , e) /* setPage(page + 1) */ } } type="button" className="btn-load">
              <i className="fa-regular fa-rotate-right"></i>
            </button>
          </div>
          </>
          }
        
        </div>
        
        <div className="page-set">
          <div className="inr"><div className="pg">{nowPage.pge} / {nowPage.tot}</div></div>
        </div>
      </main>
    </div>
  </>  
  )
}