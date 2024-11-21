import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useParams } from 'react-router-dom';

export default function CateMenu({menu, opts}) {
  let params = useParams()
  const [slideActive, slideActiveSet] = useState(0);
  const cateBoxRef = useRef(null);
  const activeBtnRef = useRef(null);

  const goSlide = (num) => {
    const catebox = cateBoxRef.current;
    const cateboxWid = catebox.offsetWidth * 0.5;
    const btnAct = activeBtnRef.current;
    const btnActLeft = btnAct?.offsetLeft;
    const btnActWid = btnAct?.offsetWidth * 0.5;

    const scr = btnActLeft - cateboxWid + btnActWid;
    catebox.scrollTo(scr, 0);

    slideActiveSet(num);
    console.log("slideActive == " + slideActive + "  " + btnActLeft);
  };
  const cateID = params.cate;
  useEffect(() => {
    goSlide(slideActive);
    return () => { }
  }, [cateID, slideActive, menu, opts]);

  return (
  <>
    <div className={"cate-box " + cateID}>
      <div className="inr" ref={cateBoxRef}>
        <ul className="list">
          <li data-index="0" className={ "0" === cateID ? "active" : null }>
            <NavLink type="button" className="bt" to={`/list/${opts}/0`} ref={cateID === "0" ? activeBtnRef : null}>전체</NavLink>
          </li>
          { menu.map( (item,idx) => { 
            return (
              <li data-index={idx+1} key={item.id} cate={item.id} className={ item.id.toString() === cateID ? "active" : null }>
                <NavLink 
                  type="button" 
                  className="bt" 
                  to={`/list/${opts}/${item.id}`}
                  ref={item.id.toString() === cateID ? activeBtnRef : null}
                > 
                  { item.name } 
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  </>  
  )
}