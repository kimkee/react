
import React, {  useEffect } from 'react'; //useState,
import {Link, NavLink, useParams, useLocation, useNavigate} from 'react-router-dom'; // ,useParams,useLocation
import ui from '/src/ui.js';
import store from '../store.js';

export default function Header({prop}) {
  console.log(prop.headerType + "===================================");
  let params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(params);
  location.pathname
  console.log(params , location);
  
  
  useEffect(() => {
    
    // let cls = location.pathname === '/' ? "trans" : "";
    // document.querySelector(".header")?.classList.add(cls)
    // document.querySelector(".header .htit")?.innerText = store.state.userInfo.nick;
    return ()=>{
      
    }
    
  });


  const test =()=>{
    ui.confirm("리액트 보다 쀼가 짱입니까?",{
      ycb:function(){
        console.log("컴펌 예");
        window.location.href = "https://kimkee.github.io/vue"
      },
      ncb:function(){
        console.log("컴펌 아뇨");
      },
      ybt:"마자요!",
      nbt:"아니오!",
    });
  }
  return (
	  <header className={`header ${prop.headerType}`}>
      <div className="inr">
        <div className="ldt">
          
          { prop.headerType == "main" 
            ? <h1 className="logo"> <Link to={`/home/`} className="btlogo"><i className="fa-brands fa-vuejs"></i></Link></h1> 
            : <button type="button" className="bt back" onClick={()=>navigate(-1)}><i className="fa-regular fa-arrow-left"></i>뒤로</button>
          }
          
          { params.id ? <h3 className="htit">{store.state.userInfo.nick}</h3> : null }

        </div>
        <div className="rdt">
          
          { store.state.userInfo.stat ? 
            <NavLink to={`/user/${store.state.userInfo.uid}`} className={"user"}> 
              <span className="pic"><img alt="" className="img" src={ store.state.avatar[store.state.userInfo.avatar] || store.state.userInfo.photoURL} /></span>
              <span className="txt">{store.state.userInfo.nick}</span>
              
            </NavLink>
            :
            <NavLink to={`/user/signin`} className={"bt"}><i className="fa-regular fa-user"></i><em>Login</em></NavLink>
          }
          
          <button type="button" onClick={test} className="bt gnb"><i className="fa-regular fa-bars"></i><b>메뉴</b></button>
        </div>
      </div>
    </header>
  )
}
