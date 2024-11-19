import React, {useEffect,useState} from 'react';
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
import Callback from './pages/Callback.jsx';
import NotFound from './pages/NotFound.jsx';
import Lists from './pages/movie/Lists.jsx';
import View from './pages/movie/View.jsx';
import Detail from './pages/movie/Detail.jsx';
import Poster from './pages/movie/Poster.jsx';
import Person from './pages/movie/Person.jsx';
import Videos from './pages/movie/Videos.jsx';
import Search from './pages/movie/Search.jsx';
import SignIn from './pages/user/SignIn.jsx';
import SignOut from './pages/user/SignOut.jsx';
import SignUp from './pages/user/SignUp.jsx';
import User from './pages/user/User.jsx';
import { supabase } from '@/supabase.js';
import getUser from '@/getUser.js';
// ui.init();


export default function App() {
  // const location = window.location;
  // console.log(location);
  // const { location,pathname, hash, key } = useLocation();
  
  // store.authState();
  const [user, setUser] = useState(null);
  const [myinfo, setMyinfo] = useState(null);

  /* 로그인 상태 알아보기 */
  supabase.auth.onAuthStateChange((state, event) => { 
    // console.log(user);
    // if (state.loggedIn) { setIsLoggedIn(true); } else { setIsLoggedIn(false); } 
    // console.log('==========================================' + state);
    // getUser();
  }); 

  // const getUser = async () => { 
  //   const { data: { user } } = await supabase.auth.getUser();
  //   setUser(user);
  //   if(!user) return
  //   const { data: myinfo, error: myinfoError }  = await supabase.from('MEMBERS').select("*").eq('user_id', user?.id).order('created_at', { ascending: true });
  //   setMyinfo(myinfo[0])
   
  // };
  
  useEffect(() => {
    // getUser();
    
    getUser().then((data) => {
      setUser(data?.user)
      setMyinfo(data?.myinfo)      
      console.log('로긴정보 = ' + data?.user?.id);
      console.log('마이인포 = ' + data?.myinfo?.id);
    })
    return () => {
       
    }
  }, [])


  return (
    <>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path='home/*' element={<Header prop={{"headerType":"main", user, myinfo}} />} />
            <Route path=':menu/*' element={<Header prop={{"headerType":"main", user, myinfo}} />} />
            <Route path='list/*' element={<Header prop={{"headerType":"main", user, myinfo}} />} />
            <Route path='search/*' element={<Header prop={{"headerType":"main", user, myinfo}} />} />
            <Route path='movie/*' element={<Header prop={{"headerType":"main", user, myinfo}} />} />
            <Route path='user'>
              <Route path=":id" element={<Header prop={{"headerType":"sub", user, myinfo}} />} />
            </Route>
          </Routes>

          {/* <TransitionGroup className="transition-group">
            <CSSTransition in={true} classNames={"right"} timeout={5000}> */}
              
          <Routes>

            {/* <Route path='*' element={<NotFound />} /> */}
            <Route path="callback" element={<Callback prop={{user, myinfo}} />} />

            <Route path="/" element={<Navigate to="/home/" replace />} />

            <Route path="home" element={<Home />} />

            <Route path="home/:menu" element={<Home /> }>
              <Route path=":id" element={<View prop={{"page":"home"}} />} >
                <Route path="poster/:nums" element={<Poster />} />
                <Route path="person/:nums" element={<Person />} />
                <Route path="videos/:nums" element={<Videos />} />
              </Route>
            </Route>

            <Route path="list">
              <Route path=":menu" >
                <Route path=":cate" element={<Lists /> }>
                  <Route path=":id" element={<View prop={{"page":"search"}} />} >
                    <Route path="poster/:nums" element={<Poster />} />
                    <Route path="person/:nums" element={<Person />} />
                    <Route path="videos/:nums" element={<Videos />} />
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
              
              <Route path=":uid" element={<User prop={{user, myinfo}} />} >
                <Route path=":menu">
                  <Route path=":id" element={<View prop={{"page":"search"}} />} >
                    <Route path="poster/:nums" element={<Poster />} />
                    <Route path="person/:nums" element={<Person />} />
                    <Route path="videos/:nums" element={<Videos  />} />
                  </Route>
                </Route>
              </Route>
              
            </Route>
         

          </Routes>
              
            {/* </CSSTransition>
          </TransitionGroup> */}

          <Routes>
            <Route path='home/*' element={<Nav prop={{user, myinfo}} />} />
            <Route path=':menu/*' element={<Nav prop={{user, myinfo}} />} />
            <Route path='list/*' element={<Nav prop={{user, myinfo}} />} />
            <Route path='search/*' element={<Nav prop={{user, myinfo}} />} />
            <Route path='movie/*' element={<Nav prop={{user, myinfo}} />} />
            <Route path='user'>
              <Route path=":id" element={<Nav prop={{user, myinfo}} />} />
            </Route>
          </Routes>

        </Router>
      </RecoilRoot>
    </>
  );
}
