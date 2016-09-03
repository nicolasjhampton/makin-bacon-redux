'use strict';

var Game = require('../../../models/game.js');

module.exports = function(req, res, next, id) {
  Game.findById(id, (err, game) => {
    if(err) return next(err);
    if(!game) return next(new Error('Game not found'));
    req.game = game;
    next();
  });
};
