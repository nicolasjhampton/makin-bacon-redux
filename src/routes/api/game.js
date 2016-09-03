'use strict';

var express = require('express');
var router = express.Router();
var socketWrapper = require('../../app.js');

var authorize = require('./authorize');
var database = require('./database');
var games = require('./games');
var movie_api = require('./movie_api');

var auth = authorize.authorize;

var find_item = database.find_item;

var create = games.create;
var find_game = games.find_game;
var play_card = games.play_card;
var send_games = socketWrapper(games.send_games);
var send_game = socketWrapper(games.send_game);
var join = games.join;

var get_item = movie_api.get_item;
var random = movie_api.random_actor;
var start = movie_api.start;


router.use(auth);

router.param('gameId', find_game);

// send game must be replaced with a socket

// POST /api/games/:gameId/move
// play card
// player makes move and everyone receives new game status
router.post('/:gameId/move', find_item, get_item, play_card, send_game);

// POST /api/games/:gameId
// join game
// player joins game and everyone receives game status
router.post('/:gameId', join, send_game);

// STREAM /api/games
// get games
// one player receives list of active games, player list, and first actor


// POST /api/games
// create game
// player creates game and instantly joins it, receives current game status
router.post('/', start, random, find_item, get_item, create, join, send_games, send_game);


module.exports = router;
