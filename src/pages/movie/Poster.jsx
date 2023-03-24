import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Outlet,useParams, useNavigate} from 'react-router-dom'; //,useOutletContext  , useLocation
import ui from '../../ui';
import ViewElips from './ViewElips';
import ViewRev from './ViewRev';
export default function View() {
  let params = useParams()
  let navigate = useNavigate();
  const opts = params.opts;
  
  console.log(params);

  const postID = params.id;
  const popResize = ()=>{
    let $pop =  document.querySelector(".popup.poster");
    let pctnH =  $pop.offsetHeight || 0;
    let pbtnH =  $pop.querySelector(".pbt")?.offsetHeight || 0 ;
    let phtnH =  $pop.querySelector(".phd")?.offsetHeight || 0 ;
    pctnH = (pctnH - phtnH) || 0 ;
    console.log(pctnH  );
    $pop.querySelector(".pct").style.maxHeight = pctnH - pbtnH+"px" ; 
  }


  const [datas, setDatas] = useState(null);
  const [pstImg, pstImgSet] = useState('');
  
  const fetchURL = `https://api.themoviedb.org/3/${opts}/${postID}?language=ko&region=kr&api_key=${process.env.REACT_APP_KEY}&append_to_response=images&include_image_language=en,null`;
  const fetchDatas = () => {
    axios.get( fetchURL ).then(response => {
      console.log("영화정보" , response.data);
      setDatas(response.data);
      let bgDm = response.data.poster_path ? response.data.poster_path : response.data.backdrop_path;
      pstImgSet('https://image.tmdb.org/t/p/w780'+bgDm);
    }).catch( e => { console.log(e); });
  };

  useEffect(() => {
    console.log(  document.querySelector(".popup.poster .pct").offsetHeight );
    fetchDatas();
    
    popResize();
    
    window.addEventListener("resize",popResize);
    document.querySelector(".popup.poster").classList.add("ani","on");
    ui.lock.using(true); 

    return () => {
      window.removeEventListener("resize",popResize);
      ui.lock.using(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  // console.log(datas);
  // if(!datas)  return ;
  // console.log( txtHt );
  // if(!datas || !casts)  return <div><div className="ui-loading-dot on"> <div className="bx"><em><i></i></em></div> </div></div>;

  return (
  <>
    
    <article className="pop-layer c bottom popup poster">
      <div className="pbd">
        <div className="phd">
          <div className="inr">
              <div className="ptit">{datas?.title || datas?.name}</div>
          </div>
        </div>

        <button type="button" className="btn-pop-close back" onClick={ () => { navigate(-1) } } >{/* <i className="fa-regular fa-arrow-left"></i> */}<i className="fa-regular fa-xmark"></i></button>
        
                {/* {pstImg &&
                  <img src={pstImg} className="img" alt={datas?.title || datas?.name} />
                } */}        
        <div className="pct">
          <main className="poptents">
            <div className="poster-box">
              {datas && datas.images.posters.length ? 
              <>
                <div className='pics'>
                  <div  className='pic'><img src={pstImg} className="img" alt={datas?.title || datas?.name} /></div> 
                </div>
                {
                  datas.images.posters.map((img,idx) => {
                    return(
                    <div key={idx} className='pics'>
                      <div  className='pic'><img src={'https://image.tmdb.org/t/p/w780'+img.file_path} alt={img.name} className="img" onError={(e)=>{e.target.src=`${process.env.REACT_APP_PUBLIC_URL}img/common/non_poster.png`}} /></div> 
                    </div>
                    )
                  })
                }
              </>
              :null}
            </div>
            {/* <p>{params?.id}</p>
            <p>{params?.cate}</p>
            <p>{params?.opts}</p> */}

          </main>
        </div>
      
      </div>
    </article>
  </>
  )
}
