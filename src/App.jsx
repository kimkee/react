import React, {useEffect} from 'react';
// import { HashRouter,BrowserRouter, Routes, Route,Router , useLocation ,useHash,Switch } from 'react-router-dom';
import { HashRouter as Router, Routes, Route ,Navigate } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, } from 'recoil';


import ui from './ui.js';
import {atomStore} from './atom.js';
import store from './store.js';

import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Lists from './pages/movie/Lists.jsx';
import View from './pages/movie/View.jsx';
import Detail from './pages/movie/Detail.jsx';
import Poster from './pages/movie/Poster.jsx';
import Person from './pages/movie/Person.jsx';
import Videos from './pages/movie/Videos.jsx';
import Search from './pages/movie/Search.jsx';
import SignIn from './pages/user/SignIn.jsx';
import SnsLogin from './pages/user/SnsLogin.jsx';
import SignOut from './pages/user/SignOut.jsx';
import SignUp from './pages/user/SignUp.jsx';
import User from './pages/user/User.jsx';
// ui.init();
export default function App() {
  // const location = window.location;
  // console.log(location);
  // const { location,pathname, hash, key } = useLocation();

  store.authState();

  useEffect(() => {
      /* 로그인 상태 알아보기 */

      const auth = getAuth();
      onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          // 사용자가 로그인한 경우
            const info = JSON.parse(  sessionStorage.getItem("user") );
          if(info){
             
          }
        } else {
          // 사용자가 로그아웃한 경우
          
        }
      });
  
    return () => {
       
    }
  }, [ ])
  


  return (
    <>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path='home/*' element={<Header prop={{"headerType":"main"}} />} />
            <Route path=':menu/*' element={<Header prop={{"headerType":"main"}} />} />
            <Route path='list/*' element={<Header prop={{"headerType":"main"}} />} />
            <Route path='search/*' element={<Header prop={{"headerType":"main"}} />} />
            <Route path='movie/*' element={<Header prop={{"headerType":"main"}} />} />
            <Route path='user'>
              <Route path=":id" element={<Header prop={{"headerType":"sub"}} />} />
            </Route>
          </Routes>

          {/* <TransitionGroup className="transition-group">
            <CSSTransition in={true} classNames={"right"} timeout={5000}> */}
              
          <Routes>

            {/* <Route path='*' element={<NotFound />} /> */}

            <Route path="/" element={<Navigate to="/home/" replace></Navigate>} />

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
              <Route path=":id" element={<Detail prop={{"page":"page"}}/>} >
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
              
              <Route path=":id" element={<User />} >
                <Route path=":menu">
                  <Route path=":id" element={<View prop={{"page":"search"}} />} >
                    <Route path="poster/:nums" element={<Poster />} />
                    <Route path="person/:nums" element={<Person />} />
                    <Route path="videos/:nums" element={<Videos  />} />
                  </Route>
                </Route>
              </Route>
              
            </Route>

            <Route path="snslogin" element={<SnsLogin /> } />


            {/* <Route path="detail/:menu/:id"  element={<Detail  />}>
              
              <Route path="poster/:nums" element={<Poster  />} />
              <Route path="person/:nums" element={<Person  />} />
              <Route path="videos/:nums" element={<Videos  />} />
              
            </Route> */}
          

          </Routes>
              
            {/* </CSSTransition>
          </TransitionGroup> */}

          <Routes>
            <Route path='home/*' element={<Nav />} />
            <Route path=':menu/*' element={<Nav />} />
            <Route path='list/*' element={<Nav />} />
            <Route path='search/*' element={<Nav />} />
            <Route path='movie/*' element={<Nav />} />
            <Route path='user'>
              <Route path=":id" element={<Nav />} />
            </Route>
          </Routes>

        </Router>
      </RecoilRoot>
    </>
  );
}
