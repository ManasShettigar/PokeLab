import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const defaultHome = true;
  // const location = useLocation();
  const data = true;
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home value={defaultHome} />} />
        <Route
          exact
          path="/Type"
          element={<Home value={!defaultHome} type={data? data : {}} />} 
        />
      </Routes>
    </Router>
  );
}


export default App;
