import React from 'react'

export default function Header() {
  return (
	  <header className="header">
      <div className="inr">
        <div className="ldt">
          <h1 className="logo"> <a href="/" className="btlogo"><i className="fa-brands fa-vuejs"></i></a></h1>
        </div>
        <div className="rdt">
          <button type="button" className="bt gnb"><i className="fa-regular fa-bars"></i><b>메뉴</b></button>
        </div>
      </div>
    </header>
  )
}
