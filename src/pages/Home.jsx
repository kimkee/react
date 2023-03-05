import React, {useEffect }from 'react'; // useState, , {useEffect }
import { Outlet} from 'react-router-dom';  // useParams,Link,  useSearchParams, useLocation 
import ui from '../ui';
import HomeTop from "../components/HomeTop.jsx";
import ListSet from "../components/ListSet.jsx";
import ListTop10 from "../components/ListTop10.jsx";

export default function Home() {
  
  const scrollEvent = ()=> {
    const header = document.querySelector('.header');
    const scr = parseInt( ui.viewport.scrollTop() );
    if ( ui.lock.stat) return;
    if( scr > 100){
      header.classList.add("trans");
    }else{
      header.classList.remove("trans");
    }
  };
  
  useEffect(() => {
    const header = document.querySelector('.header');
    header.classList.add("home");
    window.addEventListener("scroll",scrollEvent);    
    return ()=>{
      header.classList.remove("home");
      window.removeEventListener("scroll",scrollEvent);
    }
    
  },[]);

  return (
  <>
    <Outlet />
  
    <div className="container page home">
      <main className="contents">
      <HomeTop />

      <ListTop10 opts={{list:"/trending/movie/week", cate: "0", title:'Weekly TOP 20'}} />

      <ListSet opts={{list: "movie/popular", cate: "0", title: "인기영화"}} />

      <ListSet opts={{list: "movie/popular", cate: "16", title: "애니메이션"}} />

      <ListSet opts={{list: "movie/popular", cate: "99", title: "다큐멘터리"}} />

      <ListSet opts={{list: "movie/popular", cate: "10770", title: "TV영화"}} />


      </main>
    </div>
  </>
  )
}
