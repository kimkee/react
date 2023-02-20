import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import List from './pages/movie/List.jsx';
import Search from './pages/movie/Search.jsx';
function App() {

  return (
    <>
      <HashRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movie" element={<List />}></Route>
          <Route path="/search" element={<Search />}></Route>
        </Routes>
        <Nav/>
      </HashRouter>
    </>
  );
}

export default App;
