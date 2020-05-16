import React, { useState } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from './Landing/Landing'
import Error from './Error'
import RegisterOccupant from './Occupant/RegisterOccupant'
import RegisterLesson from './Lesson/RegisterLesson'
import OccupantFirstPage from './Occupant/OccupantFistPage';
import LessonFirstPage from './Lesson/LessonFirstPage';

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => <Landing isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo} setUserInfo={setUserInfo} />} />
        <Route exact path='/registerOccupant' component={RegisterOccupant} />
        <Route exact path='/registerLesson' component={RegisterLesson} />
        <Route exact path='/error' component={Error} />
        <Route exact path='/OccupantFirstPage' render={()=><OccupantFirstPage isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo} setUserInfo={setUserInfo} />}  />
        <Route exact path='/LessonFirstPage' render={()=><LessonFirstPage isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo} setUserInfo={setUserInfo} />}  />
        <Redirect to='/error' />
      </Switch>
    </div>
  );
}

export default App;
