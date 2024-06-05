import './App.css';
import React from 'react';
import HomePage from './components/Pages/HomePage';
import SearchPage from './components/Pages/SearchPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';




function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/search" element={<SearchPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
