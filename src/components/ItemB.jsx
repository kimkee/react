import React from 'react';
import { Link } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation

import StarPoint from '../components/StarPoint';

// Movie, TV 리스트 유닛
export default function ItemB({data,cate}) {
  // console.log(data);
  // console.log(cate.genr);
  
  const img = `//image.tmdb.org/t/p/w200/${data.poster_path}`;
  const tit = data.title || data.name;
  const errImg = e => e.target.src=`${import.meta.env.VITE_APP_PUBLIC_URL}img/common/non_poster.png` ;
  return (
  <>
    <Link className={`box`} to={""+data.id}>
      <div className="cont">
        <div className="pics"><img src={`${img}`} alt={tit} className='img' onError={errImg}/></div>
        <div className="desc">
          <StarPoint point={data.vote_average} />
        </div>
      </div>
      <div className="tits">{tit}</div>
      
    </Link>
  </>  
  )
}