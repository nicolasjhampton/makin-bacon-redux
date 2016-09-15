'use strict';

// This function sends to in game users only
var Game = require('../../../models/game.js');

module.exports = (req, res, next) => {
  Game.findById(req.game._id)
      .select('players')
      .populate('players', 'username')
      .exec((err, game) => {
        if(err) return next(err);
        // needs to be refined to a namespaced room
        req.gameIo.emit('game players', game);
        next();
      });
};
