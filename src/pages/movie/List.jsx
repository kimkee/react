import React, { useState, useEffect } from 'react';
import { Outlet, useSearchParams, useLocation } from 'react-router-dom';  // Link,useParams
import axios from 'axios';
import ui from '../../ui';
import ItemB from './ItemB.jsx';


export default function List() {
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get('search'));


  // const [keyword, keywordSet ] = useState('');

  let keyword = searchParams.get('search') 
  let {state} = useLocation();
  // console.log(state);

  
  
  const [mlist, setMlist] = useState([]);
  // const [page, setPage] = useState(1);
  let page = 1;
  
  
  const [cate, setCate] = useState({});
  // let cate = {};
  // const total;
  const getCate = async ()=>{
    let cate = {
      genr:{}
    }
    await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=ko&region=kr&api_key=f76021076e8162ea929bd2cea62c6646').then(res =>{
      res.data.genres.forEach( d=> cate.genr[d.id] = d.name);
      // setCate(cate); 
    }).then( res =>{
      setCate(cate);
      console.log(cate);
    });
  };
  // const keyword = "미녀";
  let fetchURL;
  
  const fetchMoive = (page)=>{
    ui.loading.show();
    if (state) { setMlist([])} 
    console.log( "검색어 " +keyword);
    console.log( "로드 " + page );
    
    fetchURL = 'https://api.themoviedb.org/3/movie/popular?page='+page+'&language=ko&region=kr&sort_by=release_date.desc&api_key=f76021076e8162ea929bd2cea62c6646';

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

  useEffect( () => {
    window.scrollTo(0,0);
    fetchMoive(page);
    getCate();
    
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
        <div className='poster-list'>
            
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