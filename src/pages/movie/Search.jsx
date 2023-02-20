import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Search() {

const [datas, setDatas] = useState(null);
const [genr, setGenr] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchDatas = async () => {
  try {
  // 요청이 시작 할 때에는 error 와 datas 를 초기화하고
  setError(null);	
  setDatas(null);
  // loading 상태를 true 로 바꿉니다.
  setLoading(true);
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/now_playing?api_key=f76021076e8162ea929bd2cea62c6646&language=ko&region=kr&page=1&sort_by=release_date.desc&page=1'
  );
  const getGenr = await axios.get(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=f76021076e8162ea929bd2cea62c6646&language=ko&region=kr'
  );
  setDatas(response.data); // 데이터는 response.data 안에 들어있습니다.
  setGenr(getGenr.data); // 데이터는 response.data 안에 들어있습니다.
  } catch (e) {
    setError(e);
  }
  setLoading(false);
};

  useEffect(() => {
    fetchDatas();
  }, []);

  if (loading) return <div>로딩중..</div>; 
  if (error) return <div>에러가 발생했습니다</div>;

  // 아직 datas가 받아와 지지 않았을 때는 아무것도 표시되지 않도록 해줍니다.
  if (!datas) return null;
  console.log(datas);
let cate = {}; 
genr.genres.forEach( d=>{
  cate[d.id] = d.name;
  });
  console.log(cate[16]);
  console.log(genr);
  console.log(datas.results);
  return (
  <div className="container move">
    <main className="contents">
      <div className='movie-list'>
        검색
      </div>
    </main>
  </div>
  )
}
