import React from 'react';
// import { HashRouter,BrowserRouter, Routes, Route,Router , useLocation ,useHash,Switch } from 'react-router-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from "react-transition-group";

import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import List from './pages/movie/List.jsx';
import Search from './pages/movie/Search.jsx';
function App() {
  // const location = window.location;
  // console.log(location);
  // const { location,pathname, hash, key } = useLocation();
  return (
    <>
      <HashRouter>
        <Header/>
        {/* <TransitionGroup className="transition-group">
          <CSSTransition in={true} classNames={"right"} timeout={5000}> */}
            
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/movie" element={<List />}></Route>
                <Route path="/search" element={<Search />}></Route>
              </Routes>
            
          {/* </CSSTransition>
        </TransitionGroup> */}
        <Nav/>
      </HashRouter>
    </>
  );
}

export default App;
