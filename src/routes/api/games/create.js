'use strict';

var Game = require('../../../models/game.js');

module.exports = function(req, res, next) {
  var game = new Game({ playCard: { move: req.actor } });
  game.save(function(err) {
    if(err) return next(err);
    req.game = game;
    next();
  });
};
