'use strict';

var express = require('express');
var router = express.Router();

var players = require('./player.js');
var games = require('./game.js');

// namespaced as localhost:port/api/

router.use('/players', players);

router.use('/games', games);


module.exports = router;
