import React from 'react';
import { Link } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation

import StarPoint from '../components/StarPoint';

// Movie, TV 리스트 유닛
export default function ItemB({data}) {
  // console.log(data);
  
  const img = `//image.tmdb.org/t/p/w200/${data.poster_path}`;
  const tit = data.title || data.name;

  return (
  <>
    <Link className={`box`} to={""+data.id}>
      <div className="cont">
        <div className="pics"><img src={`${img}`} alt={tit} className='img' onError={ui.error.poster}/></div>
        <div className="desc">
          <StarPoint point={data.vote_average} />
        </div>
      </div>
      <div className="tits">{tit}</div>
      
    </Link>
  </>  
  )
}