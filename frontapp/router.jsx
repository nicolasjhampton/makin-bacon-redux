"use strict";

import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
//IndexRoute, Redirect, DefaultRoute 

import GameApp from './components/GameApp.jsx'
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx';
// import Games from './components/Games.jsx';
// import Game from './components/Game.jsx';


const routes = (
  <Router history={browserHistory}>
    <Route component={GameApp}>
      <Route path="/" component={Home} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="profile/:username" component={Profile} />
    </Route>
  </Router>
);


export default routes;
