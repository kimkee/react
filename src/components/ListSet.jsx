
import React, { useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import axios from 'axios';

// import Swiper core and required modules
// import { Navigation, Pagination, Scrollbar, FreeMode, A11y } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react'; //, useSwiper 

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import ui from '../ui.js';
// import StarPoint from '/src/components/StarPoint';


export default  function ListSet({opts}){
  
  const [mlist, setMlist] = useState([]);
  console.log(opts);
  let cateList;
  cateList = opts.cate !== '0' ? `&with_genres=${opts.cate}` : ``;
  

  const fetchMoive = (page)=>{
    ui.loading.show();
    

    console.log( "로드 ");
    //  vote_count.desc  추천순
    //  with_genres=16  장르별
    // /trending/movie/day
    const fetchURL = `https://api.themoviedb.org/3/${opts.list}?page=1${cateList}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

    axios.get( fetchURL ).then(res =>{
      console.log(res.data);
      setMlist( mlist => [...mlist,...res.data.results] );
      // console.log( mlist );
      console.log(page + "=== " + res.data.total_pages );
      
      
      ui.loading.hide();
      if( res.data.total_pages <= page ) {
      
        document.querySelector(".ui-loadmore")?.classList.add("hide");
      };


    }).catch(e=>{
      console.log(e);
      ui.loading.hide();
      document.querySelector(".ui-loadmore")?.classList.add("error");
    }); 
  }

  
  // const [swiper, setSwiper] = useState(null);
  // const nexto = () => {
  //   swiper.slideTo( Math.floor( Math.random() *10 ) , 0 );
  // };

  useEffect(() => {
    fetchMoive(1);
    // swiper.slideTo(2);
    
    return ()=>{
      
    }
    // eslint-disable-next-line
  },[]);



  return(
    <>
      
      <section className="sect mnList">

        <Link  to={`/list/${opts.opts}/${opts.cate || 0}`} className="hbox">
          <h3 className="stit">{opts.title}</h3>
          <span className="more"><i className="fa-regular fa-chevron-right"></i></span>
        </Link>

        <div className="inr">
          
          <div className="slide">
            <ul>
                {
                  mlist?.filter( (item, i) => i < 20 ).map( (data, idx) => {
                    const img = `https://image.tmdb.org/t/p/w154${data.poster_path}` ;
                    return (
                      <li key={idx}  className="pbox">
                        <Link className="box" to={`${opts.opts}/${data.id}`}>
                            <div className="pics"><img src={`${img}`} alt="" className='img' onError={(e)=>{e.target.src=`${import.meta.env.VITE_APP_PUBLIC_URL}img/common/non_poster.png`}} /></div>
                            <div className="info">
                              {/* <StarPoint point={data.vote_average} /> */}
                              {/* <div className="tit">{data.title}</div> */}
                            </div>
                            {/* <div className="screen"></div> */}
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