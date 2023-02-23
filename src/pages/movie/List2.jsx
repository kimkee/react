import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';  // useParams
// import View from 'View.jsx';



export default function List() {
  const [genr, setGenr] = useState(null);
  
  const [mlist, setMlist] = useState([]);
  const [page, setPage] = useState(1);
  let cate = {}; 

  const getCate = ()=>{
    axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?language=ko&region=kr&api_key=f76021076e8162ea929bd2cea62c6646'
    ).then(res =>{
      setGenr(res.data)
      console.log(res.data);
      res.data.genres.forEach( d=> cate[d.id] = d.name);
      console.log(cate);
    });
  }
  
  
  
  const fetchMoive = (page)=>{
    axios.get(
      'https://api.themoviedb.org/3/movie/now_playing?language=ko&region=kr&page=1&sort_by=release_date.desc&page='+page+'&api_key=f76021076e8162ea929bd2cea62c6646'
    ).then(res =>{
      
      console.log(res.data);
      
      setMlist([...mlist,...res.data.results]);

      
    }).catch(e=>{}); 
  }

  useEffect(() => {
    fetchMoive(page);
    getCate();
    // eslint-disable-next-line
  },[]);


  

  // console.log(datas);
  // console.log(genr);
  // console.log(datas.results);
  
  // console.log(dlist);
  return (
  <>
    <Outlet />
    <div className="container move">
      <main className="contents">
        <div className='movie-list'>
          <ul className='list'>
          {
            mlist.map((data) =>{
              // console.log(data.poster_path);
              const img = data.poster_path ? data.poster_path : "/9DVtwkuxzCLGVMapioeJ4RflfyW.jpg";
              console.log(data.genre_ids);
              return(
                <li key={data.id}>
                  <Link className="box" to={""+data.id}>
                    <div className="cont">
                      <div className="pics"><img src={`https://image.tmdb.org/t/p/w200${img}`} alt="" className='img'/></div>
                      <div className="desc">
                        <div className="tits">{data.title}</div>
                        <div className="text">{data.overview}</div>
                      </div>
                    </div>
                    <div className="info">
                      <div className="dd">
                        <div className="user">
                          <span className="txt">
                            <i className="fa-regular fa-list"></i>
                            {data.genre_ids.map( item => <em key={item}> {cate[item]}</em> )}
                          </span>
                          
                        </div>
                      </div>
                      <div className="dd">
                        <div className="hits">
                           <em>
                              <i className="fa-regular fa-list"></i>
                              <b>{data.id} </b>
                            </em>
                          <em><i className="fa-regular fa-heart"></i> <b>{data.vote_average}</b></em>
                        </div>
                        <div className="date"><i className="fa-regular fa-calendar-days"></i> <b>{data.release_date}</b></div>
                      </div>
                    </div>
                    <div className="bgs" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${img})`}}></div>
                  </Link>
                </li>
              )
            })
          }
          </ul>

          <div className="ui-loadmore active">
            {/* <em><i className="fa-duotone fa-spinner"></i></em> */}
            <button onClick={ (e)=>{
              setPage(page + 1)
              fetchMoive( page + 1   , e)
            }} type="button" className="btn-load" title="불러오기"><i className="fa-regular fa-rotate-right"></i></button>
          </div>

        </div>
      </main>
    </div>
  </>  
  )
}
