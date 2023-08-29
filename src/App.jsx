import React from 'react';
// import { HashRouter,BrowserRouter, Routes, Route,Router , useLocation ,useHash,Switch } from 'react-router-dom';
import { HashRouter as Router, Routes, Route ,Navigate } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from "react-transition-group";

import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, } from 'recoil';


import ui from './ui.js';
import {atomStore} from './atom.js';

import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Lists from './pages/movie/Lists.jsx';
import View from './pages/movie/View.jsx';
import Poster from './pages/movie/Poster.jsx';
import Person from './pages/movie/Person.jsx';
import Videos from './pages/movie/Videos.jsx';
import Search from './pages/movie/Search.jsx';
import SignIn from './pages/user/SignIn.jsx';
import SignOut from './pages/user/SignOut.jsx';
import SignUp from './pages/user/SignUp.jsx';
import User from './pages/user/User.jsx';
// ui.init();
export default function App() {
  // const location = window.location;
  // console.log(location);
  // const { location,pathname, hash, key } = useLocation();

  /* 로그인 상태 알아보기 */
  const info = JSON.parse(  sessionStorage.getItem("user") );
  if(info){
    store.state.userInfo.stat = true;
    store.state.userInfo.uid = info?.uid;
    store.state.userInfo.email = info?.email;
    store.state.userInfo.join = new Date( parseInt(info?.createdAt) );
  }
  
  return (
    <>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path='home/*' element={<Header  prop={{"headerType":"main"}} />} />
            <Route path='list/*' element={<Header  prop={{"headerType":"main"}} />} />
            <Route path='search/*' element={<Header  prop={{"headerType":"main"}} />} />
            <Route path='movie/*' element={<Header  prop={{"headerType":"main"}} />} />
            <Route path='user'>
              <Route path=":id" element={<Header prop={{"headerType":"sub"}} />} />
            </Route>
          </Routes>

          {/* <TransitionGroup className="transition-group">
            <CSSTransition in={true} classNames={"right"} timeout={5000}> */}
              
          <Routes>

            <Route path='*' element={<NotFound />} />

            <Route path="/" element={<Navigate to="/home/"></Navigate>} />

            <Route path="home" element={<Home />} />

            <Route path="home/:menu" element={<Home /> }>
              <Route path=":id" element={<View prop={{"page":"home"}} />} >
                <Route path="poster/:nums" element={<Poster  />} />
                <Route path="person/:nums" element={<Person  />} />
                <Route path="videos/:nums" element={<Videos  />} />
              </Route>
            </Route>

            <Route path="list">
              <Route path=":menu" >
                <Route path=":cate" element={<Lists /> }>
                  <Route path=":id" element={<View prop={{"page":"search"}} />} >
                    <Route path="poster/:nums" element={<Poster />} />
                    <Route path="person/:nums" element={<Person />} />
                    <Route path="videos/:nums" element={<Videos  />} />
                  </Route>
                </Route>
              </Route>
            </Route>

            <Route path=":menu">
              <Route path='*' element={<NotFound />} />
              <Route path=":id" element={<View prop={{"page":"page"}}/>} >
                <Route path="poster/:nums" element={<Poster />} />
                <Route path="person/:nums" element={<Person />} />
                <Route path="videos/:nums" element={<Videos  />} />
              </Route>
            </Route>

            <Route path="search" >
              <Route path=":menu" element={<Search />} >
                <Route path=":id" element={<View prop={{"page":"search"}} />} >
                  <Route path="poster/:nums" element={<Poster prop={{"page":"search"}} />} />
                  <Route path="person/:nums" element={<Person prop={{"page":"search"}} />} />
                  <Route path="videos/:nums" element={<Videos prop={{"page":"search"}} />} />
                </Route>
                <Route path=":keyword" element={<Search />} />
              </Route>
            </Route>

            <Route path="user">
              <Route path="*" element={<NotFound /> } />
              <Route path="signin" element={<SignIn /> } />
              <Route path="signout" element={<SignOut /> } />
              <Route path="signup" element={<SignUp /> } />
              
              <Route path=":id" element={<User />} />
              
            </Route>




          </Routes>
              
            {/* </CSSTransition>
          </TransitionGroup> */}

          <Nav/>
        </Router>
      </RecoilRoot>
    </>
  );
}
