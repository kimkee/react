import React, { useState, useEffect,useRef } from 'react';
import {Outlet,useParams, useNavigate } from 'react-router-dom'; //,useOutletContext  , useLocation
import ui from '../../ui.js';
import ViewInfo from './ViewInfo';

export default function View({prop}) {
  
  let params = useParams()
  let navigate = useNavigate();
  prop.page = prop.page || 'page' ;
  // console.log(prop);

  const postID = params.id;

  const [scr, setScr] = useState(0);
  const scrollEvent = (e)=> setScr( parseInt( e.target.scrollTop ) ) ;

  const isPage = ()=> prop.page === "list" || prop.page === "search" || prop.page === "home"
  const goTop = ()=> ui.scrollTo(".popup.movie .pct", 0, 200 );
  const noTransition = ()=> window.history.state?.idx > 0 ? '' : 'no-transition';

  useEffect(() => {
    ui.loading.show('glx');
    goTop();
    popResize();
    window.addEventListener("resize",popResize);
    popup.current.classList.add("ani","on");
    ui.lock.using(true);
    console.log(prop.myinfo);
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

  const popup = useRef();
  const popResize = ()=>{;
    const $pop  =  popup.current;
    const pctnH =  $pop.offsetHeight;
    const phdtH =  $pop.querySelector(".phd").offsetHeight;
    console.log( pctnH ,phdtH );
    $pop.querySelector(".pct").style.height = pctnH-phdtH+"px" ; 
  }

  const [parentTit, setParentTit] = useState('');
  const popTitle = text => setParentTit(text);
  if (parentTit) {
    setTimeout(() => ui.loading.hide(), 500);
  }

  const pctRef = useRef(null);
    // article 전체 영역 휠 → pct 스크롤로 위임
  const handleWheel = (e) => {
    if (e.shiftKey) return;
    const pct = pctRef.current;
    if (!pct) return;
    pct.scrollTop += e.deltaY;
  };

  return (
  <>
    <Outlet/>
    <article ref={popup} onWheel={handleWheel} className={`pop-layer a bottom popup movie view ${ isPage() ? '' : 'page'} ${noTransition()}`}>
      <div className="pbd">
        <div className={`phd ${ scr > 50 ? 'trans' : ''}`} >
          <div className="inr">
              <div className="ptit">{parentTit}</div>
              {/* <button type="button" className="btn-share" onClick={shareLink} ><i className="fa-regular fa-share-nodes"></i></button> */}
          </div>
        </div>
        {
          isPage() && window.history.state?.idx > 0 ?
          <button type="button" className="btn-pop-close back" onClick={ () => { navigate(-1) } } ><i className="fa-solid fa-arrow-left"></i></button>
          :
          <button type="button" className="btn-pop-close home" onClick={ () => { navigate("/home/") } } ><i className="fa-brands fa-react"></i></button>
        }
        
        <div ref={pctRef} className="pct" onScroll={scrollEvent}>
          <main className="poptents">
            
            <ViewInfo user={prop.user} myinfo={prop.myinfo} postID={postID} popTitle={popTitle} />

          </main>
        </div>
      
        <div className={`floatpop ${ scr > 50 ? 'on-top' : ''}`}>
          <button type="button" className="bt top" onClick={goTop}><i className="fa-solid fa-arrow-up"></i><em>위로</em></button>
        </div>
      </div>
    </article>
  </>
  )
}
