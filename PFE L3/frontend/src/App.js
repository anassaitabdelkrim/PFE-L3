import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import VisiteurRoute from './components/visiteur/VisiteurRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router >
          <VisiteurRoute />
        </Router>
      </div>
    );
  }
}

export default App;
