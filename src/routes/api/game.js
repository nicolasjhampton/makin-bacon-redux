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
var join = games.join;

var get_item = movie_api.get_item;
var random = movie_api.random_actor;
var start = movie_api.start;


router.post('/', auth, start, random, find_item, get_item, create, join);


module.exports = router;
