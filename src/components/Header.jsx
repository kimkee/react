import React from 'react'
import {Link} from 'react-router-dom'; // 
import ui from '../ui';
export default function Header() {
  const test =()=>{
    ui.confirm("리액션 쩐다",{
      ycb:function(){
        console.log("컴펌 예");
      },
      ncb:function(){
        console.log("컴펌 아뇨");
      },
    });
  }
  return (
	  <header className="header">
      <div className="inr">
        <div className="ldt">
          <h1 className="logo"> <Link to={`${process.env.PUBLIC_URL}movie`} className="btlogo"><i className="fa-brands fa-vuejs"></i></Link></h1>
        </div>
        <div className="rdt">
          <button type="button" onClick={test} className="bt gnb"><i className="fa-regular fa-bars"></i><b>메뉴</b></button>
        </div>
      </div>
    </header>
  )
}
