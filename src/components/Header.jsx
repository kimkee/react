
import React, {useState,  useEffect, useRef } from 'react'; //
import {Link, NavLink, useParams, useLocation, useNavigate} from 'react-router-dom'; // ,useParams,useLocation

export default function Header({prop}) {

  let params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, myinfo } = prop;

  
  useEffect(() => {
    console.log(user, myinfo);
    return ()=>{ }
  },[user,myinfo ]);
  // console.table(prop);
 
  return (
	  <header className={`header ${prop.headerType}`}>
      <div className="inr">
        <div className="ldt">
         
          { prop.headerType == "main" 
            ? <h1 className="logo"> <Link to={`/home/`} className="btlogo"><i className="fa-brands fa-vuejs"></i></Link></h1> 
            : <button type="button" className="bt back" onClick={()=>navigate(-1)}><i className="fa-regular fa-arrow-left"></i>뒤로</button>
          }
          
          {/* {store2.state.userInfo.stat+""} */}

        </div>
        <div className="rdt">
          {/*            
          { ( user?.id && myinfo?.id) ?
            <NavLink to={`/user/${myinfo.id}`} className={"user"}> 
              <span className="pic"><img alt="" className="img" src={ myinfo.profile_picture} /></span>
              <span className="txt">{ myinfo.username }</span>
            </NavLink>
          :
            <NavLink to={`/user/signin`} className={"bt login"}><i className="fa-regular fa-user"></i><em>Login</em></NavLink>
          }
          */}
          
          
          <button type="button" className="bt gnb"><i className="fa-regular fa-bars"></i><b>메뉴</b></button>
        </div>
      </div>
    </header>
  )
}
