import React from 'react';
import { Link } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation

import StarPoint from "./StarPoint.jsx";


export default function ItemB({data,cate}) {
  // console.log(data);
  // console.log(cate.genr);
  
  const img = 'https://image.tmdb.org/t/p/w200'+data.poster_path;
  // const bgs = data.backdrop_path ? data.backdrop_path : data.poster_path;
  return (
  <>
    
    <Link className={`box`} to={""+data.id}>
      <div className="cont">
        <div className="pics"><img src={`${img}`} alt="" className='img' onError={(e)=>{e.target.src=`${process.env.REACT_APP_PUBLIC_URL}img/common/non_poster.png`}}/></div>
        <div className="desc">
          
          <StarPoint point={data.vote_average} />

          {/* <div className="cate">
              {data.genre_ids.map( item => <em className="ico" key={item}> {  cate.genr ? cate.genr[item] : null  } </em> )}
            </div> */}
        </div>
      </div>
            <div className="tits">{data.title}</div>
      
    </Link>
  </>  
  )
}