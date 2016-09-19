"use strict";

import React from 'react';
import {Router, Route, browserHistory, IndexRedirect } from 'react-router';

import GameApp from './components/GameApp.jsx'
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
// import Profile from './components/Profile.jsx';
// import Games from './components/Games.jsx';
// import Game from './components/Game.jsx';


const request = (context, auth, callback) => {
  let req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/api/players/login");
  req.setRequestHeader("Authorization", auth);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.addEventListener("load", callback(context));
  req.send();
}

const loginFunc = obj => {
  let auth = {};
  {username: auth.name, password: auth.pass} = obj;
}

const registerFunc = obj => {

}

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={GameApp}>
      <IndexRedirect to="/login"/>
      <Route path="login" component={Login} login={loginFunc}/>
      <Route path="register" component={Register} register={registerFunc}/>

    </Route>
  </Router>
);

// <Route path="/register" component={Register}/>
// <Route path="/profile" component={Profile}/>
// <Route path="/games" component={Games}/>
// <Route path="/game" component={Game}/>

export default routes;
