import React from 'react';
// import { HashRouter,BrowserRouter, Routes, Route,Router , useLocation ,useHash,Switch } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import {  } from 'react-router-dom';


import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import List from './pages/movie/List.jsx';
import View from './pages/movie/View.jsx';
import SchPop from './pages/movie/SchPop.jsx';
import Search from './pages/movie/Search.jsx';
function App() {
  // const location = window.location;
  // console.log(location);
  // const { location,pathname, hash, key } = useLocation();
  
  
  return (
    <>
      <Router>
        <Header/>
        {/* <TransitionGroup className="transition-group">
          <CSSTransition in={true} classNames={"right"} timeout={5000}> */}
            
            <Routes>
              <Route path="/" element={<Home />} >
              <Route path=":id" element={<View />} />
              </Route>
           
              <Route path="movie" element={<List />}>
                <Route path=":id" element={<View />} />
                <Route path="pop" element={<SchPop />} />
                {/* <Route path=":keyword" element={<List />} /> */}
                {/* <Route path="search:keyword" element={<List />} /> */}
              </Route>
              <Route path="search" element={<Search />} >
                <Route path=":id" element={<View />} />
                <Route path=":keyword"  element={<Search />} />
              </Route>

            </Routes>
            
          {/* </CSSTransition>
        </TransitionGroup> */}
        <Nav/>
      </Router>
    </>
  );
}

export default App;
