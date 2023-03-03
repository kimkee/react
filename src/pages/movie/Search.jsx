import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams  } from 'react-router-dom';  // useParams ,useLocation ,useParams, Link,

import axios from 'axios';
import ui from '../../ui';
import ItemA from '../../components/ItemA.jsx';
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
  // const keyword = "미녀";

  const [nowPage, nowPageSet] = useState({
    "pge":0,
    "tot":0
  })
  
  const fetchMoive = (page , kwd )=>{

    console.log( "검색어 " +keyword);
    console.log( "로드 " + page );

    kwd = keyword
    
    let fetchURL = `https://api.themoviedb.org/3/search/movie?language=ko&region=kr&page=${page}&query=${kwd}&sort_by=release_date.desc&api_key=${process.env.REACT_APP_KEY}`;
    if(keyword == null) {
      fetchURL = ''
      ui.loading.hide();
      return
    };

    axios.get( fetchURL ).then(res =>{
      
      console.log(res.data);
      setMlist( mlist => [...mlist,...res.data.results] );
      console.log(page + "=== " + res.data.total_pages );
      callStat = true;
      console.log(callStat);
      ui.loading.hide();
      nowPageSet({
        "pge":res.data.page,
        "tot":res.data.total_pages
      });
      if( res.data.total_pages <= page ) {
        callStat = false;
        document.querySelector(".ui-loadmore")?.classList.add("hide");
      };
      document.querySelector(".ui-loadmore")?.classList.remove("active");
      
    }).catch(e=>{
      console.log(e);
      ui.loading.hide();
      document.querySelector(".ui-loadmore")?.classList.add("error");
    }); 
  }

  useEffect(() => {
    getCate();
    ui.loading.show();
    fetchMoive(page);
    document.querySelector('.header').classList.add("trans");
    document.querySelector("#input_kwd").focus();
    window.addEventListener("scroll", scrollEvent);
    return ()=>{
      document.querySelector('.header').classList.remove("trans");
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
      if(ui.lock.stat) {
        callStat = true;
        return
      };
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
    <div className="container page movie search">
      <main className="contents">
        <div className="schs-form">
          <div className="inr">
            <form className="form" onSubmit={ goSearch }>
              <h2 className="tts">검색</h2>
              <span className="input">
                <input type="text" placeholder="영화 제목을 입력하세요." onChange={onChange} id="input_kwd"/>
              </span>
              <button type="submit" className="bt-sch"><i className="fa-regular fa-search"></i></button>
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
              return(
                <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                  <ItemA data={data} cate={cate} />
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
                
        <div className="page-set">
          <div className="inr"><div className="pg">{nowPage.pge} / {nowPage.tot}</div></div>
        </div>

      </main>
    </div>
  </>  
  )
}