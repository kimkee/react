import React from 'react'

export default function Nav() {
  return (
	  <nav id="menubar" class="menubar">
      <div class="inr">
        <ul class="menu">
          <li><router-link class="bt" to="/"><i class="fa-regular fa-house"></i><em>Home</em></router-link></li>
          <li><router-link class="bt" to="/bbs"><i class="fa-regular fa-list"></i><em>Board</em></router-link></li>
          <li><router-link class="bt" to="/photo"><i class="fa-regular fa-camera"></i><em>Photo</em></router-link></li>
          <li><router-link class="bt" to="/chat"><i class="fa-regular fa-comments"></i><em>Chat</em></router-link></li>
          <li>
            <router-link v-if="!!$store.state.userInfo.uid" class="bt" to="/signout"><i class="fa-regular fa-right-from-bracket"></i><em>Logout</em></router-link>
            <router-link v-else class="bt" to="/signin"><i class="fa-regular fa-user"></i><em> Login</em></router-link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
