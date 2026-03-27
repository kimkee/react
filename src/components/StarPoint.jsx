import React, { useState, useEffect } from 'react'; //useState, useEffect
import {} from 'react-router-dom'; // Link  , useLocation, useSearchParams,useParams, useSearchParams

// import ui from '/src/ui.js';

export default function StarPoint({point, cls}) {
  // const [res, resSet] = useState(null) ;
  const clss = cls ? cls : '';
  
  const n = parseFloat((Math.round(point * 100) / 100).toFixed(1)) / 2;
  const stars = [0, 0.5 , 1 , 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
  let res = 0;
  stars.reverse().forEach(p => { 
    if (n <= p) {
      res = p;
    } 
  });

  const renderStars = (rating = 0) => {
    const elements = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      elements.push(<i className="fa-solid fa-star" key={`full-${i}`}></i>);
    }
    if (rating % 1 !== 0) {
      elements.push(<i className="fa-solid fa-star-half" key={`half`}></i>);
    }
    return elements;
  };

  return (
    <em className={"ui-star "+clss} data-point={point}  role="img" aria-label={`평점 ${point}/10점 만점`}> 
      <span className='fgstar' dara-star={res}> 
        { renderStars(res) }
      </span>
      <span className='bgstar'>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </span>
      {/* <span className="point" style={{'position':'absolute','right':'110%', top:'0px', display:'inline-block'}}>{res}</span> */}
    </em>
  )
}
