'use strict';

var express = require('express');
var router = express.Router();
// var socketWrapper = require('../../sockets.js').socket;

var players = require('./players');

var get_player = players.get_player;
var send_players = players.send_players;
var create = players.create;

// POST /api/players
// Create player
// player entered in database, player list sent to everyone, user info sent to user
router.post('/', create, send_players, get_player);

// TODO: login user, logout user

module.exports = router;
