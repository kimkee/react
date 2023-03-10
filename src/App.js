import React from 'react';
// import { HashRouter,BrowserRouter, Routes, Route,Router , useLocation ,useHash,Switch } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from "react-transition-group";



import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Lists from './pages/movie/Lists.jsx';
import View from './pages/movie/View.jsx';
// import SchPop from './pages/movie/SchPop.jsx';
import Search from './pages/movie/Search.jsx';
function App() {
  // const location = window.location;
  // console.log(location);
  // const { location,pathname, hash, key } = useLocation();
  
  
  return (
    <>
      <Router>
        <Header />
        {/* <TransitionGroup className="transition-group">
          <CSSTransition in={true} classNames={"right"} timeout={5000}> */}
            
            <Routes>

              <Route path='/*' element={<NotFound />} />

              <Route path="/" element={<Home />} >
              </Route>
              <Route path="/:opts" element={<Home /> }>
                  <Route path="/:opts:id" element={<View  />} />
              </Route>
           
              <Route path="list">
                <Route path=":opts" >
                  <Route path=":cate"  element={<Lists/> }>
                    <Route path=":id" element={<View  />} />
                  </Route>
                </Route>
              </Route>

              <Route path="search" element={<Search />} >
                <Route path=":opts" >
                  <Route path=":id" element={<View />} />
                  <Route path=":keyword"  element={<Search />} />
                </Route>
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
