import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useSearchParams,useParams  } from 'react-router-dom';  // useParams ,useLocation , Link,useNavigate,

import axios from 'axios';
import ui from '/src/ui';
import ItemA from '/src/components/ItemA.jsx';
// import View from 'View.jsx';


export default function Search() {
  const [searchParams] = useSearchParams();
  let params = useParams();
  // let {state} = useLocation();
  console.log(params);
  const opts = params.menu;
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
    await axios.get(`https://api.themoviedb.org/3/genre/${opts}/list?language=ko&region=kr&api_key=${import.meta.env.VITE_REACT_APP_KEY}`).then(res =>{
      res.data.genres.forEach( d=> cate.genr[d.id] = d.name);
      // setCate(cate); 
    }).then( res =>{
      setCate(cate);
      console.log(cate);
    }).catch( error =>{
      console.log(error);
      setCate(null);
    });
  };
  // const keyword = "미녀";

  const [nowPage, nowPageSet] = useState({
    "pge":0,
    "tot":0
  })
  const inputRef = useRef();
  const fetchMoive = (page , kwd )=>{

    console.log( "검색어 " +keyword);
    console.log( "로드 " + page );
    inputRef.current.value = keyword;
    kwd = keyword
    
    let fetchURL = `https://api.themoviedb.org/3/search/${opts}?language=ko&region=kr&page=${page}&query=${kwd}&sort_by=release_date.desc&api_key=${import.meta.env.VITE_REACT_APP_KEY}`;
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
    document.querySelector('.header').classList.add("hide");
    setMlist([]);
    !keyword && !document.querySelector(".pop-layer") && inputRef.current.focus();
    window.addEventListener("scroll", scrollEvent);
    window.scrollTo(0, 0);
    return ()=>{
      document.querySelector('.header').classList.remove("hide");
      window.removeEventListener("scroll", scrollEvent);
    }
    // eslint-disable-next-line
  },[keyword,opts]);


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


  // let navigate = useNavigate();
  // const [stext ,stextSet]  = useState('');
  const goSearch = (e) => {
    keywordSet( inputRef.current?.value );
    // navigate(`/search/${opts}?search=${stext}`);
    window.history.replaceState(null, null, `#/search/${opts}?search=${inputRef.current?.value}`);
    setMlist([]);
    fetchMoive( 1 );
    e.preventDefault();
    document.querySelector(".movie-list").focus();
  }
  const onChange = (event) => {
    // stextSet(event.target.value )
    keywordSet(event.target.value )
    setMlist([]);
    // fetchMoive( 1 );
    const url = new URL(window.location);
    url.searchParams.set("search", event.target.value);
    console.log(url);
    // window.history.pushState({}, "", `#/search/${opts}?search=${event.target.value}`);
    // window.location.hash = `/search/${opts}?search=${event.target.value}`;
    window.history.replaceState(null, null, `#/search/${opts}?search=${event.target.value}`);
  } 
  
  console.log(mlist);

  
  console.log(  inputRef.current?.value );
  
  return (
  <>
    <Outlet />
    <div className="container page movie search">
      <main className="contents">
        <div className="schs-form">
          <div className="inr">
            <form className="form" onSubmit={ goSearch }>
              <div className="bts">
                <NavLink className="bt" to={`/search/movie?search=${keyword}`}>Movie</NavLink>
                <NavLink className="bt" to={`/search/tv?search=${keyword}`}>TV</NavLink>
              </div>
              <span className="input">
                <input type="text" placeholder="검색어를 입력하세요." onChange={onChange} id="input_kwd" ref={inputRef}/>
              </span>
              <button type="submit" className="bt-sch"><i className="fa-regular fa-search"></i></button>
            </form>
          </div>
        </div>
         
        <div className='movie-list' tabIndex="-1">
        { 
        
        mlist.length <= 0 && keyword ? 
          <div className="nodata"><i className="fa-solid fa-file-magnifying-glass"></i><p>검색 결과가 없습니다.</p></div> 
          :
          <>
          <ul className='list'>
          {
            mlist.map((data,num) =>{
              return(
                <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                  <ItemA data={data} cate={cate} opts={opts} />
                </li>
              )
            })
          }
          </ul>


          { mlist.length > 0 &&
          <div className={`ui-loadmore`}>
            <em><i className="fa-duotone fa-spinner"></i></em>
            <button onClick={ (e)=>{
              // setPage(page + 1)
              page = page + 1
              fetchMoive( page , e)
            }} type="button" className="btn-load" title="불러오기"><i className="fa-regular fa-rotate-right"></i></button>
          </div>
          }
          </>
        }     
        </div>
        
                
        { mlist.length > 0 &&
        <div className="page-set">
            <div className="inr"><div className="pg">{nowPage.pge} / {nowPage.tot}</div></div>
        </div>
        }

      </main>
    </div>
  </>  
  )
}