'use strict';

// This function sends to in game users only
var Game = require('../../../models/game.js');

module.exports = (req, res, next, io) => {
  Game.findById(req.game._id)
      .select('players')
      .populate('players', 'username')
      .exec((err, game) => {
        if(err) return next(err);
        // needs to be refined to a namespaced room
        io.sockets.in(req.game._id).emit('game players', game.toObject());
        next();
      });
};
