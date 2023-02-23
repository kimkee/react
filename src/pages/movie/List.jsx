import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';  // useParams
import axios from 'axios';
import ui from '../../ui';
// import View from 'View.jsx';



export default function List() {
  
  const [mlist, setMlist] = useState([]);
  const [page, setPage] = useState(1);
  const [total, totalSet] = useState(9999);
  const [cate, setCate] = useState({});
  // const total;
  const getCate = ()=>{
    axios.get('https://api.themoviedb.org/3/genre/movie/list?language=ko&region=kr&api_key=f76021076e8162ea929bd2cea62c6646').then(res =>{
      res.data.genres.forEach( d=> cate[d.id] = d.name);
      setCate(cate); 
    });
  };
  
  
  
  const fetchMoive = (page)=>{
    ui.loading.show();
    setPage(page);
    
    axios.get(
      'https://api.themoviedb.org/3/movie/now_playing?language=ko&region=kr&page=1&sort_by=release_date.desc&page='+page+'&api_key=f76021076e8162ea929bd2cea62c6646'
    ).then(res =>{
      // console.log(page);
      console.log(res.data);
      totalSet(res.data.total_pages);
      setMlist([...mlist,...res.data.results]);
      console.log([...mlist,...res.data.results]);
      ui.loading.hide();
      if( total <= page ) {
        document.querySelector(".ui-loadmore").classList.add("hide");
      };


    }).catch(e=>{
      console.log(e);
    }); 
  }

  useEffect(() => {
    getCate();
    fetchMoive(page);
    // eslint-disable-next-line
  },[]);


  

  // console.log(datas);
  // console.log(genr);
  // console.log(datas.results);
  // console.log(cate);
  // if (!cate) return null;
  // console.log(dlist);
  return (
  <>
    <Outlet />
    <div className="container move">
      <main className="contents">
        <div className='movie-list'>
          <ul className='list'>
          {
            mlist.map((data,num) =>{
              // console.log(data.poster_path);
              const img = data.poster_path ? data.poster_path : "/9DVtwkuxzCLGVMapioeJ4RflfyW.jpg";
              return(
                <li key={data.id+num}>
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
                        <div className="cate">
                          <span className="txt">
                            {data.genre_ids.map( item => <em className="ico" key={item}> {cate[item]}</em> )}
                          </span>
                          
                        </div>
                      </div>
                      <div className="dd">
                        <div className="hits">
                           <em>
                              
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