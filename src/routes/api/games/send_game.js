'use strict';

var Game = require('../../../models/game.js');

module.exports = (req, res, next, io) => {
  Game.findById(req.game._id)
      .populate('players', 'username')
      .populate('stack.entry.user', 'username')
      .exec((err, game) => {
        if(err) return next(err);
        io.emit('game', game.toObject());
        res.json(game.toObject());

      });
};
