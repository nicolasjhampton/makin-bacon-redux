"use strict";

import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import io from 'socket.io-client';
localStorage.debug = 'socket.io*';


import GameApp from './components/GameApp.jsx'
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx';
import Games from './components/Games.jsx';
import Game from './components/Game.jsx';


import AuthManager from './authorize/auth_manager.jsx';

import apiRequest from './api/api_request.jsx';


import { Observable } from 'rxjs-es/Observable';

class IoMgr {

  constructor(io) {
    this.io = io;
  }

  // initGameListSocket = () => {
  //
  // }

  initGameSocket = (id) => {
    this.id = id;
    this.game = io(`/${this.id}`);
  }

  gameListStream = (context) => {
    this.gameList = io();
    this.gameListChannel = Observable.create(observer => {
      return this.gameList.on('games', game => { observer.next(game); });
    });
    return this.gameListChannel.subscribe(games => context.setState({games: games}));
  }

  gameStream = () => {
    this.gameChannel = Observable.create(observer => {
      return this.game.on('move', move => { observer.next(move); });
    });
    //return this.gameChannel;
  }

}

const tokenStrategy = (auth) => (
  `Basic ${btoa(`${auth.username}:${auth.password}`)}`
);

const getUser = (token) => {
  return apiRequest.login(token);
};

const createUser = (profile) => {
  return apiRequest.register(profile);
};

const authMgr = new AuthManager({
  tokenStrategy,
  getUser,
  createUser,
});

const ioMgr = new IoMgr(io);

const sockets = {};

const globalApis = (Component, props) => {
  props.authMgr = authMgr;
  props.apiRequest = apiRequest;
  props.io = io;
  props.sockets = sockets;
  props.ioMgr = ioMgr;
  return <Component {...props}/>
};
//////////////////////////////////////////////////
// var options = {'sync disconnect on unload':true};
//
// this.socket = this.props.io();
// this.socket.on('games', (games) => {
//   this.setState({ games: games });
// });
//
// this.props.apiRequest.getGames(this.props.auth).then(games => {
//   this.setState({ games: games });
// });
//////////////////////////////////////////////////


const startGame = (nextState, replace) => {
  // this context gives us nothing useful here
  console.log(nextState.params.gameId);
  sockets.game = {};
  sockets.game.id = nextState.params.gameId;
  //<Stack stack={this.state.stack}/>
};

const routes = (
  <Router createElement={globalApis} history={browserHistory}>
    <Route onEnter={authMgr.initAuth} component={GameApp}>
      <Route path="/" component={Home} />
      <Route path="login" onEnter={authMgr.loggedOut} component={Login} />
      <Route path="register" onEnter={authMgr.loggedOut} component={Register} />
      <Route path="profile/:username" onEnter={authMgr.loggedIn} component={Profile} />
      <Route path="games" onEnter={authMgr.loggedIn} component={Games}>
        <Route path=":gameId" onEnter={startGame} component={Game} />
      </Route>
    </Route>
  </Router>
);




export default routes;
