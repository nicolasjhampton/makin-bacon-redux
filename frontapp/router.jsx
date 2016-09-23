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
import AuthManager from './authorize/auth_manager.jsx';

import apiRequest from './api/api_request.jsx';

const tokenStrategy = (auth) => (
  `Basic ${btoa(`${auth.username}:${auth.password}`)}`
)

const getUser = (token) => {
  return apiRequest.login(token);
}

const createUser = (profile) => {
  return apiRequest.register(profile);
}

const authMgr = new AuthManager({
  tokenStrategy,
  getUser,
  createUser,
});


const routes = (
  <Router createElement={authMgr.attachAuthMgr} history={browserHistory}>
    <Route onEnter={authMgr.initAuth} component={GameApp}>
      <Route path="/" component={Home} />
      <Route path="login" onEnter={authMgr.loggedOut} component={Login} />
      <Route path="register" onEnter={authMgr.loggedOut} component={Register} />
      <Route path="profile/:username" onEnter={authMgr.loggedIn} component={Profile} />
    </Route>
  </Router>
);


export default routes;
