'use strict';

var mongoose = require('mongoose');
// Use native promises
mongoose.Promise = global.Promise;


var Movie = require('./movie.js');
var Card = require('./card.js');
var Actor = require('./actor.js');


module.exports = {
  Card: Card,
  Actor: Actor,
  Movie: Movie
};
