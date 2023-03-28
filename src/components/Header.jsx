
import React, {  useEffect } from 'react'; //useState,
import {Link} from 'react-router-dom'; // ,useParams,useLocation
import ui from '../ui';
export default function Header({cls}) {
  console.log(cls + "===================================");
  // let params = useParams();
  // const location = useLocation();
  // console.log(params);
  // location.pathname
  // console.log(location);
  
  
  useEffect(() => {
    
    // let cls = location.pathname === '/' ? "trans" : "";
    // document.querySelector(".header")?.classList.add(cls)
    
    return ()=>{
      
    }
    
  },[]);


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
	  <header className={"header "}>
      <div className="inr">
        <div className="ldt">
          <h1 className="logo"> <Link to={`/`} className="btlogo"><i className="fa-brands fa-vuejs"></i></Link></h1>
        </div>
        <div className="rdt">
          <button type="button" onClick={test} className="bt gnb"><i className="fa-regular fa-bars"></i><b>메뉴</b></button>
        </div>
      </div>
    </header>
  )
}
