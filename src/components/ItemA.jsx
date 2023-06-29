import React from 'react';
import { Link } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import StarPoint from '../components/StarPoint';
// import ui from '/src/ui.js';



export default function ItemA({data,cate,opts}) {
  // console.log(data);
  // console.log(cate.genr);
  const imgpath = 'https://image.tmdb.org/t/p/w200';
  const img = data.poster_path ? imgpath + data.poster_path : `${import.meta.env.VITE_APP_PUBLIC_URL}img/common/non_poster.png`;
  const bgs = data.backdrop_path ? imgpath + data.backdrop_path : imgpath + data.poster_path;
  return (
  <>
    <Link className="box" to={`/search/${opts}/${data.id}`}>
      <div className="cont">
        <div className="pics"><img src={`${img}`} alt="" className='img' onError={(e)=>{e.target.src=`${import.meta.env.VITE_APP_PUBLIC_URL}img/common/non_poster.png`}}/></div>
        <div className="desc">
          <div className="tits">{data.title || data.name}</div>
          <div className="text">{data.overview}</div>
        </div>
      </div>
      <div className="info">
        <div className="dd">
          <div className="cate">
            <span className="txt">
              {data.genre_ids.map( item => <em className="ico" key={item}> {  cate.genr ? cate.genr[item] : null  } </em> )}
            </span>
            
          </div>
        </div>
        <div className="dd">
          <div className="hits">
            <StarPoint point={data.vote_average} />
            <em><i className="fa-regular fa-heart"></i> <b>{data.vote_average}</b></em>
          </div>
          <div className="date"><i className="fa-regular fa-calendar-days"></i> <b>{data.release_date || data.first_air_date}</b></div>
        </div>
      </div>
      <div className="bgs" style={{backgroundImage: `url(${bgs})`}}></div>
    </Link>
  </>  
  )
}