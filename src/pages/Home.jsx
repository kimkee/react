import React, {useEffect }from 'react'; // useState, , {useEffect }
import { Outlet} from 'react-router-dom';  // useParams,Link,  useSearchParams, useLocation 

import HomeTop from "../components/HomeTop.jsx";
import ListSet from "../components/ListSet.jsx";

export default function Home() {

  useEffect(() => {
    
    document.querySelector('.header')?.classList.add("trans");
    
    return ()=>{
      document.querySelector('.header')?.classList.remove("trans");
    }
    
  },[]);

  return (
  <>
    <Outlet />
  
    <div className="container page home">
      <main className="contents">
      <HomeTop />

      <ListSet opts={{list:'now_playing', cate: "0", title:'상영중'}} />

      <ListSet opts={{list: "popular", cate: "0", title: "인기영화"}} />

      <ListSet opts={{list: "popular", cate: "16", title: "애니메이션"}} />

      <ListSet opts={{list: "popular", cate: "99", title: "다큐멘터리"}} />

      <ListSet opts={{list: "popular", cate: "10770", title: "TV영화"}} />


      </main>
    </div>
  </>
  )
}
