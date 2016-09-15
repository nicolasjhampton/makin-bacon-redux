'use strict';

var Game = require('../../../models/game.js');

module.exports = (req, res, next) => {
  var item = req.movie || req.actor;
  var user = req.user;
  var game = req.game;

  game.playCard = { move: item, player: user };
  game.save((err) => {
    if(err) return next(err);
    next();
  });

};
