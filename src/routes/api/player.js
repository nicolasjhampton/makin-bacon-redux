'use strict';

var express = require('express');
var router = express.Router();

var players = require('./players');
var auth = require('./authorize');

var authorize = auth.authorize;

var get_login_form = players.get_login_form;
var get_player = players.get_player;
var send_players = players.send_players;
var create = players.create;

// POST /api/players
// Create player
// player entered in database, player list sent to everyone, user info sent to user
router.post('/', create, send_players, get_player);

// POST /api/players/login
// login player
// player retrieved from database, player list sent to everyone, user info sent to user
router.post('/login', authorize, send_players, get_player);

// TODO: logout user

module.exports = router;
