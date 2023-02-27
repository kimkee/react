import React from 'react';
import { Link } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import ui from '../../ui';



export default function ItemA({data,cate}) {
  // console.log(data);
  // console.log(cate.genr);
  
  const img = 'https://image.tmdb.org/t/p/w200'+data.poster_path;
  const bgs = data.backdrop_path ? data.backdrop_path : data.poster_path;
  return (
  <>
    <Link className="box" to={"/search/"+data.id}>
      <div className="cont">
        <div className="pics"><img src={`${img}`} alt="" className='img' onError={(e)=>{e.target.src=`${process.env.PUBLIC_URL}/img/common/non_poster.png`}}/></div>
        <div className="desc">
          <div className="tits">{data.title}</div>
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
            
            <em className="ui-star" dangerouslySetInnerHTML={ {__html: ui.star.set(data.vote_average)} }></em>
            <em><i className="fa-regular fa-heart"></i> <b>{data.vote_average}</b></em>
          </div>
          <div className="date"><i className="fa-regular fa-calendar-days"></i> <b>{data.release_date}</b></div>
        </div>
      </div>
      <div className="bgs" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${bgs})`}}></div>
    </Link>
  </>  
  )
}