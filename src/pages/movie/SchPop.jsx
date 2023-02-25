import React, { useState, useEffect } from 'react';
import {useParams, useNavigate  } from 'react-router-dom';
import ui from '../../ui';
export default function View() {
  
  let params = useParams()
  let navigate = useNavigate();

  useEffect(() => {

    ui.lock.using(true);
    return () => {
      ui.lock.using(false);
      console.log('컴포넌트가 화면에서 사라짐');
    };

  },[]);
  
  console.log(params);
  // if(!datas)  return ;
  const [stext ,stextSet]  = useState('');
  const goSearch = () => {
    navigate('/movie/?search='+stext);
  }
  
  const onChange = (event) => {
    stextSet(event.target.value )
    console.log(event.target.value);
    
  } 


  return (
  <>
    <article className="pop-layer c on bottom popup sch">
      <div className="pbd">
        <button type="button" className="btn-pop-close back" onClick={ () => { navigate(-1) } } ><i className="fa-regular fa-xmark"></i></button>
        <div className="phd">
          <div className="inr">
            <div className="ptit">검색</div>
          </div>
        </div>
        <div className="pct">
          <main className="poptents">
            <input type="search" placeholder="검색어를 입력하세요." onChange={onChange} />
            <button type="button" onClick={ goSearch } className="bt-sch"><i className="fa-regular fa-search"></i></button>
          </main>
        </div>
      </div>
    </article>
  </>
  )
}
