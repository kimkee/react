import React, {useEffect }from 'react'; // useState, , {useEffect }
import { Outlet} from 'react-router-dom';  // useParams,Link,  useSearchParams, useLocation 

import HomeTop from "../components/HomeTop.jsx";

export default function Home() {

  useEffect(() => {
    
    document.querySelector('.header').classList.add("trans");
    
    return ()=>{
      document.querySelector('.header').classList.remove("trans");
    }
    
  },[]);

  return (
  <>
    <Outlet />
  
    <div className="container page home">
      <main className="contents">
      <HomeTop />
        
      </main>
    </div>
  </>
  )
}
