import React, {useEffect }from 'react'; // useState, , {useEffect }
import { Outlet} from 'react-router-dom';  // useParams,Link,  useSearchParams, useLocation 
import ui from '../ui.js';
import HomeTop from "../components/HomeTop.jsx";
import ListSet from "../components/ListSet.jsx";
import ListTop10 from "../components/ListTop10.jsx";

import { db } from '../firebaseConfig.js';
import { collection, query, doc, getDoc, getDocs, orderBy, limit } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';


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

  const readBbs = async (nums)=> {
    const q = query(collection(db, "bbs"), orderBy("timestamp", "desc"), limit(nums));
    const querySnapshot = await getDocs(q);    
    querySnapshot.forEach( (doc) => {
      console.log( doc.data().title );
    });
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const header = document.querySelector('.header');
    header.classList.add("home");
    window.addEventListener("scroll",scrollEvent);

    readBbs(10);

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

        <HomeTop opts={{opts:"movie"}} />

        <ListTop10 opts={{opts:"movie",list:"/trending/movie/week", cate: "0", title:'Weekly 영화 TOP 20'}} />

        <ListSet opts={{opts:"movie", list: "discover/movie", cate: "16", title: "영화/애니메이션"}} />

        <ListSet opts={{opts:"movie", list: "discover/movie", cate: "10402", title: "영화/음악"}} />

        <ListSet opts={{opts:"movie", list: "discover/movie", cate: "99", title: "영화/다큐멘터리"}} />

        <ListTop10 opts={{opts:"tv",list:"/trending/tv/week", cate: "0", title:'Weekly TV TOP 20'}} />
        
        <ListSet opts={{opts:"tv", list: "discover/tv", cate: "16", title: "TV/애니메이션"}} />
        
        <ListSet opts={{opts:"tv", list: "discover/tv", cate: "10764", title: "TV/Reality"}} />
        
        <ListSet opts={{opts:"tv", list: "discover/tv", cate: "80", title: "TV/범죄"}} />

      </main>
    </div>
  </>
  )
}
