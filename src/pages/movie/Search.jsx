import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, Link, useSearchParams,useParams  } from 'react-router-dom';  // useParams ,useLocation , Link,useNavigate,

import axios from 'axios';
import ui from '../../ui.js';
import ItemA from '../../components/ItemA.jsx';
// import View from 'View.jsx';


export default function Search() {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const opts = params.menu;
  const [keyword, keywordSet] = useState(searchParams.get('search'));
  const [schList, schListSet] = useState([]);
  // const [page, setPage] = useState(1);
  let page = 1;
  const [cate, setCate] = useState({});
  // const total;
  const getCate = async ()=>{
    
    await axios.get(`https://api.themoviedb.org/3/genre/${opts}/list?language=ko&region=kr&api_key=${import.meta.env.VITE_TMDB_API_KEY}`).then(res =>{
      // console.log(res.data.genres);  
      const mcate = {};
      res.data.genres.forEach( d => mcate[d.id] = d.name );
      setCate(mcate);
      // console.log(mcate);
    }).catch( error =>{
      console.log(error);
      setCate(null);
    });
  };
  // const keyword = "미녀";

  const [nowPage, nowPageSet] = useState({ "pge":0, "tot":0 })
  const [loadActive, loadActiveSet] = useState(``);
  const [loadHide, loadHideSet] = useState(``);
  const [loadError, loadErrorSet] = useState(``);
  const inputRef = useRef();
  
  const fetchMoive = (page , kwd )=>{

    console.log( "검색어 " +keyword);
    console.log( "로드 " + page );
    inputRef.current.value = keyword;
    kwd = keyword || '';
    
    const fetchURL = `https://api.themoviedb.org/3/search/${opts}?language=ko&region=kr&page=${page}&query=${kwd}&sort_by=release_date.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

    axios.get( fetchURL ).then(res =>{
      console.log(res.data);
      schListSet( prevList => [...prevList,...res.data.results] );
      console.log(page + "=== " + res.data.total_pages );
      callStat = true;
      console.log(callStat);
      ui.loading.hide();
      nowPageSet({ "pge":res.data.page, "tot":res.data.total_pages });
      if( res.data.total_pages <= page ) {
        callStat = false;
        loadHideSet("hide");
      }else{
        loadHideSet("");
      };
      loadActiveSet("");
      
    }).catch(e=>{
      console.log(e);
      ui.loading.hide();
      loadErrorSet("error");
    }); 
  }

  useEffect(() => {
    getCate();
    ui.loading.show();
    fetchMoive(page);
    document.querySelector('.header').classList.add("hide");
    schListSet([]);
    !keyword && !document.querySelector(".pop-layer") && inputRef.current.focus();
    window.addEventListener("scroll", scrollEvent);
    window.scrollTo(0, 0);
    showKwdList()
    // document.addEventListener("focus", openClick);
    document.querySelectorAll("*").forEach( (element)=> element.addEventListener("focus", openClick) );
    document.addEventListener("touchstart", openClick);

    return ()=>{
      document.querySelector('.header').classList.remove("hide");
      window.removeEventListener("scroll", scrollEvent);
      document.querySelectorAll("*").forEach( (element)=> element.removeEventListener("focus", openClick) );
      document.removeEventListener("touchstart", openClick);
    }
    // eslint-disable-next-line
  },[keyword,opts]);

  const openClick = (e)=>{
    // console.log(e.target);
    if ( e.target.closest(".schs-form") ) {
        return
      }else{
        // schsForm?.current.classList.remove("open");
      }
  }


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
      loadActiveSet("active");
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
    window.history.replaceState(null, null, `#/search/${opts}?search=${inputRef.current?.value}`);
    schListSet([]);
    fetchMoive( 1 );
    e.preventDefault();
    document.querySelector(".movie-list").focus();
    kwdStorage(inputRef.current?.value);
    // keyWordBox.current.classList.remove("open");
  }
  const goRecentSearch = (txt)=>{
    inputRef.current.value = txt;
    keywordSet( txt )
    window.history.replaceState(null, null, `#/search/${opts}?search=${txt}`);
    // setMlist([]);
    // fetchMoive( 1,txt );
    const url = new URL(window.location);
    url.searchParams.set("search", txt);
    // keyWordBox.current.classList.remove("open");
  }
  const onChange = (event) => {
    keywordSet(event.target.value )
    schListSet([]);
    const url = new URL(window.location);
    url.searchParams.set("search", event.target.value);
    console.log(url);
    window.history.replaceState(null, null, `#/search/${opts}?search=${event.target.value}`);
    // keyWordBox.current.classList.remove("open");
  }

  const keyWordBox = useRef();
  const schsForm = useRef();
  const [kwdLists, setKeywords] = useState([]);
  const kwdStorage =(k) =>{
    const keyArr = JSON.parse( localStorage.getItem("keyword") || '["스타워즈","포레스트 검프"]' );
    k.trim() !== '' ? keyArr.unshift(k) : null;
    const nkeyArr = [...new Set(keyArr)].slice(0, 10);
    localStorage.setItem("keyword", JSON.stringify( nkeyArr ) )
    setKeywords(nkeyArr)
  }

  const showKwdList =(k) =>{
    const keyArr = JSON.parse( localStorage.getItem("keyword") || '["스타워즈","포레스트 검프"]' );
    const nkeyArr = [...new Set(keyArr)];
    setKeywords(nkeyArr)
    schsForm.current?.classList.add("open");
    kwdLists.current?.classList.add("open");
  }

  const delRecentKwd =(txt) =>{
    const newArray = kwdLists.filter(item => item !== txt);
    localStorage.setItem("keyword", JSON.stringify( newArray ) );
    setKeywords(newArray);
    keyWordBox.current.classList.add("open");
    setTimeout(() => inputRef.current.focus());
    // e.preventDefault();
    return false;
  }
  const delFormText =(e,txt) =>{
    console.log(e);
    inputRef.current.value = "";
    inputRef.current.focus();
    keywordSet(``)
    window.history.replaceState(null, null, `#/search/${opts}?search=`);
  }
  
  // console.log(mlist);
  // console.log(kwdLists);
  
  console.log(  inputRef.current?.value );
  
  return (
  <>
    <Outlet />
    <div className="container page movie search">
      <main className="contents">
        <div className="schs-form" ref={schsForm}>
          <div className="inr">
            <form className="form" onSubmit={ goSearch }>
              <div className="bts">
                <NavLink className="bt" to={`/search/movie?search=${keyword}`}>Movie</NavLink>
                <NavLink className="bt" to={`/search/tv?search=${keyword}`}>TV</NavLink>
              </div>
              <span className="input">
                <input type="text" placeholder="검색어를 입력하세요." 
                  ref={inputRef}
                  required maxLength={12} 
                  onMouseDown={showKwdList}
                  onChange={onChange}
                  onInvalid={ (e)=> e.preventDefault() }
                />
                <button type="button" className="bt-del" title='삭제' onClick={delFormText} >
                  <i className="fa-regular fa-xmark"></i>
                </button>
              </span>
              <button type="submit" className="bt-sch" title='검색'><i className="fa-regular fa-search"></i></button>
              
            </form>
          </div>
        </div>
        <div className={  kwdLists.length > 0 ? `recent-kwds open` : `recent-kwds` } ref={keyWordBox}>
          {
            kwdLists.length < 1 
            ? ``
            : <ul className="lst">
              { kwdLists.map( kwd => {
                return (
                  <li key={kwd}>
                    <button className="kwd" type="button" onClick={ ()=> goRecentSearch(kwd) }>{kwd}</button>
                    <button className="del" type="button" onClick={ ()=> delRecentKwd(kwd) }><i className="fa-regular fa-xmark"></i></button>
                  </li>
                )
              }) }
            </ul>
          }
        </div>

        <div className='movie-list' tabIndex="-1">
        { 
        
        schList.length <= 0  ? 
          <div className="nodata">
            <i className="fa-solid fa-file-magnifying-glass"></i>
            { keyword ? <p> ‟{keyword}” 검색 결과가 없습니다.</p> : <p> 검색어를 입력하세요.</p> } 
          </div>
          :
          <>
          <ul className='list'>
          {
            schList.map((data,num) =>{
              return(
                <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                  <ItemA data={data} cate={cate} />
                </li>
              )
            })
          }
          </ul>

          { schList.length > 0 &&
          <div className={`ui-loadmore ${loadActive} ${loadHide}  ${loadError}`}>
            <em><i className="fa-duotone fa-spinner"></i></em>
            <button onClick={ (e)=>{
              callStat = true;
              fetchMoive( page , e);
            }} type="button" className="btn-load" title="불러오기"><i className="fa-regular fa-rotate-right"></i></button>
          </div>
          }
          </>
        }     
        </div>
                
        <div className="page-set">
        { schList.length > 0 &&
            <div className="inr"><div className="pg">{nowPage.pge} / {nowPage.tot}</div></div>
        }
        </div>

      </main>
    </div>
  </>  
  )
}