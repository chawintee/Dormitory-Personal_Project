import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from './Landing'
import Error from './Error'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/error' component={Error} />
        <Redirect to='/error' />
      </Switch>
    </div>
  );
}

export default App;
