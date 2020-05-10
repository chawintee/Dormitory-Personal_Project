import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Landing from './Landing'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
