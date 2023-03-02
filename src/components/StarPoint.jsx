import React, { useState, useEffect } from 'react'; //useState, useEffect
import {} from 'react-router-dom'; // Link  , useLocation, useSearchParams,useParams, useSearchParams

// import ui from '../ui';

export default function StarPoint({point}) {
  const [res, resSet] = useState(null) ;
  
  const stars = [0, 0.5 , 1 , 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
  
  const setPoint = ()=>{
    let n = (Math.round( point * 100) / 100).toFixed(1) / 2 ;
    let r = 0;
    stars.reverse().forEach( p => n <= p ? r = p :null );
    // console.log(n , r);
    resSet( r );
  }

  useEffect( () => {
    setPoint();
    // eslint-disable-next-line
  },[]);
  
  return (
    <em className="ui-star"> 
    
    { res === 0  &&
      <>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i> 
      </>
    }

    { res === 0.5  &&
      <>
      <i className="fa-duotone fa-star-sharp-half"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      </>
    }

    { res === 1  &&
      <>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      </>
    }

    { res === 1.5  &&
      <>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp-half"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      </>
    } 
    { res === 2 && 
      <>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      </>
    }

    { res === 2.5 &&
      <>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp-half"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      </>
    }
    { res === 3 && 
      <>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      </>
    }
    { res === 3.5 &&
      <>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp-half"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      </>
    }
    { 
      res === 4 &&
      <>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp"></i>
      </> 
    }
    { 
      res === 4.5 &&
      <>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-duotone fa-star-sharp-half"></i>
      </> 
    }
    { 
      res === 5 &&
      <>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      <i className="fa-solid fa-star-sharp"></i>
      </> 
    }

    </em>
  )
}
