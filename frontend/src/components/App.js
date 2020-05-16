import React, { useState } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from './Landing/Landing'
import Error from './Error'
import RegisterOccupant from './Occupant/RegisterOccupant'
import RegisterLesson from './Lesson/RegisterLesson'

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={()=><Landing isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
        <Route exact path='/registerOccupant' component={RegisterOccupant} />
        <Route exact path='/registerLesson' component={RegisterLesson} />
        <Route exact path='/error' component={Error} />
        <Redirect to='/error' />
      </Switch>
    </div>
  );
}

export default App;
