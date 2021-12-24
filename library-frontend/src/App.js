import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from "./Home";
import React, { Component }  from 'react';
import Library from "./Library";


function App() {
  return (
    <div className="App">
      <Router>
            <Route path="/" exact component={Home} />
            <Route path="/library" exact component={Library} />
      </Router>
    </div>
  );
}

export default App;
