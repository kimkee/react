import React from 'react'

export default function Nav() {
  return (
	  <nav id="menubar" className="menubar">
      <div className="inr">
        <ul className="menu">
          <li><a href='./react' className="bt"><i className="fa-regular fa-house"></i><em>Home</em></a></li>
          <li><a href='./react' className="bt"><i className="fa-regular fa-list"></i><em>Board</em></a></li>
          <li><a href='./react' className="bt"><i className="fa-regular fa-camera"></i><em>Photo</em></a></li>
          <li><a href='./react' className="bt"><i className="fa-regular fa-comments"></i><em>Chat</em></a></li>
          <li>
            <a href='./react' className="bt"><i className="fa-regular fa-right-from-bracket"></i><em>Logout</em></a>
            <a href='./react' className="bt"><i className="fa-regular fa-user"></i><em> Login</em></a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
