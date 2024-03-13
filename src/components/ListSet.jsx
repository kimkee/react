import React, { useState, useEffect, useRef } from 'react';
import { Link  } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import axios from 'axios';
import ui from '../ui.js';

export default  function ListSet({opts}){
  
  const [mlist, setMlist] = useState([]);
 
  const cateList = opts.cate !== '0' ? `&with_genres=${opts.cate}` : ``;
  
  const fetchMoive = ()=>{
    const fetchURL = `https://api.themoviedb.org/3/${opts.list}?page=1${cateList}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
    axios.get( fetchURL ).then(res =>{
      console.log(res.data);
      setMlist( res.data.results );
    }).catch(e=>{
      console.log(e);
    }); 
  }

  const scrollBox = useRef();
  const goScroll = (e)=>{
    const isNext = e.currentTarget.classList.contains('next');
    const minus = isNext  ? 1 : -1;
    const scAmt = (scrollBox.current.offsetWidth - 100) * minus;
    console.log( scAmt , scrollBox.current , minus);
    scrollBox.current.scrollLeft += scAmt;
  }
  const handleWheel = (event)=> {
    event.preventDefault();
    scrollBox.current.scrollLeft += event.deltaY;
  }
  const [isNavPrev, setIsNavPrev] = useState(false);
  const [isNavNext, setIsNavNext] = useState(false);
  const handeScroll = ()=> {
    const box = scrollBox.current;
    const amount = (box.scrollLeft / (box.scrollWidth - box.offsetWidth)*100 || 0);
    console.log( amount );
    setIsNavPrev( amount == 0 ? true : false);
    setIsNavNext( amount >= 100 ? true : false);
  }

  useEffect(() => {
    handeScroll();
    fetchMoive();
    // eslint-disable-next-line
  },[]);


  return(
    <>
      
      <section className="sect mnList">

        <div className="hbox">
          <Link  className="link" to={`/list/${opts.media}/${opts.cate || 0}`}>
            <h3 className="stit">{opts.title}</h3>
            <span className="more"><i className="fa-regular fa-chevron-right"></i></span>
          </Link>
          <div className="bt-nav">
            <button type="button" disabled={isNavPrev}  className="bt prev" onClick={goScroll}><i className="fa-solid fa-caret-left"></i></button>
            <button type="button" disabled={isNavNext} className="bt next" onClick={goScroll}><i className="fa-solid fa-caret-right"></i></button>
          </div>
        </div>

        <div className="inr" ref={scrollBox} 
          onMouseEnter={ ()=>scrollBox.current.addEventListener('wheel', handleWheel) }
          onMouseLeave={ ()=>scrollBox.current.removeEventListener('wheel', handleWheel) }
          onScroll={ handeScroll }
        >
          <div className="slide">
            <ul>
                {
                  mlist?.filter( (item, i) => i < 20 ).map( (data, idx) => {
                    const img = `//image.tmdb.org/t/p/w154${data.poster_path}` ;
                    const tit = data.title || data.name;
                    return (
                      <li key={idx}  className="pbox">
                        <Link className="box" to={`${opts.media}/${data.id}`}>
                            <div className="pics"><img src={`${img}`} alt={tit} className='img' onError={ui.error.poster} /></div>
                        </Link>
                      </li>
                    )
                  })
                }
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}