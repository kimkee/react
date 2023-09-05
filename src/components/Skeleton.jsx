
import React, { useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import axios from 'axios';

export default  function Skeleton({opts}){
  
  const list = [];
  // let i = 0;
  // while ( i <= opts.num) {
  //   list.push(<li key={i}><div className="box"><div className="cont"><div className="pics"></div></div><div className="tits"></div></div></li>);
  //   i++;
  // }
  for (let i = 0; i <= opts.num ; i++) {
    list.push(<li key={i}><div className="box"><div className="cont"><div className="pics"></div></div><div className="tits"></div></div></li>);
    // opts.type == 'movie-list' ? list.push(<li key={i}><div className="box"><div className="cont"><div className="pics"></div></div><div className="tits"></div></div></li>) : null;
  }

  useEffect(() => {
    console.log(list);
    return ()=>{
      
    }
    // eslint-disable-next-line
  },[]);



  return(
    <> 
      {list}
    </>
  )
}