'use strict';

var express = require('express');
var router = express.Router();

var authorize = require('./authorize');
var database = require('./database');
var games = require('./games');
var movie_api = require('./movie_api');

var auth = authorize.authorize;

var find_item = database.find_item;

var create = games.create;
var find_game = games.find_game;
var play_card = games.play_card;
var send_move = games.send_move;
var send_games = games.send_games;
var send_game_players = games.send_game_players;
var get_game = games.get_game;
var get_games = games.get_games;
var join = games.join;

var get_item = movie_api.get_item;
var random = movie_api.random_actor;
var start = movie_api.start;


router.use(auth);

router.param('gameId', find_game);


// POST /api/games/:gameId/move
// play card
// player makes move and everyone receives new game status
router.post('/:gameId/move', find_item, get_item, play_card, send_move);

// POST /api/games/:gameId
// join game
// player joins game and everyone receives game status
router.post('/:gameId', join, send_game_players, send_games, get_game);

// GET /api/games/
// get initial game list
// single player receives initial game list
router.get('/', get_games);

// POST /api/games
// create game
// player creates game and instantly joins it, receives current game status
router.post('/', start, random, find_item, get_item, create, join, send_games, get_game);


module.exports = router;
