'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
localStorage.debug = 'socket.io*';

import './css/styles.css';

import Options from './components/SomeOptions.jsx';
import Stack from './components/Stack.jsx';
import Players from './components/Players.jsx';
import Games from './components/Games.jsx';



// var socket = io('http://localhost:3000');
//
// socket.on('games', function(msg){
//   console.log(msg);
// });
// socket.on('move', function(msg){
//   console.log(msg);
// });
// socket.on('game players', function(msg){
//   console.log(msg);
// });



// socket.on('players', function(msg){
//   console.log(msg);
// });

ReactDOM.render(<Games io={io} />, document.getElementById("games"));
//
// ReactDOM.render(<Options />, document.getElementById("Options"));
// ReactDOM.render(<Stack />, document.getElementById("Stack"));
// ReactDOM.render(<Players />, document.getElementById("Players"));
