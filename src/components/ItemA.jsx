import React from 'react';
import { Link } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import StarPoint from '../components/StarPoint';
// import ui from '/src/ui.js';


// 검색 결과 유닛
export default function ItemA({data,cate}) {
  // console.log(data);
  // console.log(cate);
  const imgpath = '//image.tmdb.org/t/p/w200';
  const img = imgpath + data.poster_path;
  const bgs = data.backdrop_path ? imgpath + data.backdrop_path : imgpath + data.poster_path;
  const tit = data.title || data.name;

  return (
  <>
    <Link className="box" to={`${data.id}`}>
      <div className="cont">
        <div className="pics"><img src={`${img}`} alt={tit} onError={ui.error.poster} className='img'/></div>
        <div className="desc">
          <div className="tits">{tit}</div>
          <div className="text">{data.overview}</div>
        </div>
      </div>
      <div className="info">
        <div className="dd">
          <div className="cate">
            <span className="txt">
              {data.genre_ids.map( item => <em className="ico" key={item}> {  cate[item] } </em> )}
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