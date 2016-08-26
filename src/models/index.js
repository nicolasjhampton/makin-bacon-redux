'use strict';

var mongoose = require('mongoose');
// Use native promises
mongoose.Promise = global.Promise;

var Actor = require('./actor.js');
var Movie = require('./movie.js');
var Card = require('./card.js');
var Game = require('./game.js');
var User = require('./user.js');

module.exports = {
  Card,
  Actor,
  Movie,
  Game,
  User
};
