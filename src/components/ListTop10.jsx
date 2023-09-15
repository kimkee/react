
import React, { useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import axios from 'axios';

import ui from '../ui.js';
import StarPoint from '../components/StarPoint';


export default  function ListSet({opts}){
  
  const [mlist, setMlist] = useState([]);
  // console.log(opts);
  let cateList;
  cateList = opts.cate !== '0' ? `&with_genres=${opts.cate}` : ``;
  

  const fetchMoive = ()=>{
    console.log( "로드 ");
    //  vote_count.desc  추천순
    //  with_genres=16  장르별
    // /trending/movie/day
    const fetchURL = `https://api.themoviedb.org/3/${opts.list}?page=1${cateList}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

    axios.get( fetchURL ).then(res =>{
      console.log(res.data);
      setMlist( predata => [...predata, ...res.data.results] );
      // console.log( mlist );
    }).catch(e=>{
      console.log(e);
    }); 
  }

  useEffect(() => {
    fetchMoive(1);
    
    return ()=>{
      
    }
    // eslint-disable-next-line
  },[]);

  return(
    <>
      <section className="sect mnList topic">
        <div className="hbox">
          <h3 className="stit">{opts.title}</h3>
        </div>
        <div className="inr">
          <div className="slide">
            <ul>
              { mlist?.filter( (item, idx) => idx < 20 ).map( (data, idx) => {
                const img = `//image.tmdb.org/t/p/w154${data.poster_path}`;
                return (
                  <li key={idx}  className="pbox">
                    <Link className="box" to={`${opts.media}/${data.id}`}>
                      <div className="pics">
                        <img src={`${img}`} alt="" className='img' 
                          onError={ e => e.target.src=`${import.meta.env.VITE_APP_PUBLIC_URL}img/common/non_poster.png` } 
                        />
                      </div>
                      <div className="info"><StarPoint point={data.vote_average} /></div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}