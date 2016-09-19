'use strict';

import React from 'react';
//import {Router, Route, hashHistory } from 'react-router';
import { render } from 'react-dom';
//import ReactDOM from 'react-dom';

import io from 'socket.io-client';
localStorage.debug = 'socket.io*';

import './css/styles.css';

import routes from './router.jsx';

// import Options from './components/SomeOptions.jsx';
// import Stack from './components/Stack.jsx';
// import Players from './components/Players.jsx';
// import Games from './components/Games.jsx';
//import Login from './components/Login.jsx';

render(routes, document.getElementById("games"));


//ReactDOM.render(<Games io={io} />, document.getElementById("games"));
