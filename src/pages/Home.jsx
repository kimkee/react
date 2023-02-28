import React, {useEffect }from 'react'; // useState, , {useEffect }

import ProjectTop from "../components/HomeTop.jsx";
import { Outlet} from 'react-router-dom';  // useParams,Link,  useSearchParams, useLocation 

export default function HomeTop() {

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
      <ProjectTop />
        
      </main>
    </div>
  </>
  )
}
