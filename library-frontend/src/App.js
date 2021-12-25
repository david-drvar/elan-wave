import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import React, { Component }  from 'react';
import Library from "./pages/Library";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./helpers/ProtectedRoute";


function App() {
  return (
    <div className="App">
      <Router>
            <Route path="/" exact component={Home} />
            <ProtectedRoute path="/library" exact component={Library} />
            <Route path="/unauthorized" exact component={Unauthorized} />
      </Router>
    </div>
  );
}

export default App;
