import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';  // useParams
// import View from 'View.jsx';



export default function List() {

  const [datas, setDatas] = useState(null);
  const [genr, setGenr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let cate = {}; 

  const fetchDatas = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 datas 를 초기화하고
      setError(null);	
      setDatas(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/now_playing?language=ko&region=kr&page=1&sort_by=release_date.desc&page=1&api_key=f76021076e8162ea929bd2cea62c6646'
      );
      const getGenr = await axios.get(
        'https://api.themoviedb.org/3/genre/movie/list?language=ko&region=kr&api_key=f76021076e8162ea929bd2cea62c6646'
      );
      setDatas(response.data); // 데이터는 response.data 안에 들어있습니다.
      setGenr(getGenr.data); // 데이터는 getGenr.data 안에 들어있습니다.
      
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDatas();
    
  }, []);

  if (loading) return <div className="ui-loading-dot"> <div className="bx"><em><i></i></em></div> </div>;
  if (error) return <div className="ui-loading-dot"><p>에러가 발생했습니다</p></div>;

  // 아직 datas가 받아와 지지 않았을 때는 아무것도 표시되지 않도록 해줍니다.
  if (!datas || !genr) return null;
  
  genr.genres.forEach( d=> cate[d.id] = d.name);
  console.log(datas);
  console.log(genr);
  console.log(datas.results);
  return (
  <>
    <Outlet />
    <div className="container move">
      <main className="contents">
        <div className='movie-list'>
          <ul className='list'>
          {
            datas.results.map((data) =>{
              // console.log(data.poster_path);
              const img = data.poster_path ? data.poster_path : "/9DVtwkuxzCLGVMapioeJ4RflfyW.jpg";
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
                    <div className="bgs" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.backdrop_path})`}}></div>
                  </Link>
                </li>
              )
            })
          }
          </ul>
        </div>
      </main>
    </div>
  </>  
  )
}
