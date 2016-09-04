'use strict';

var Game = require('../../../models/game.js');

module.exports = (req, res, next) => {
  Game.findById(req.game._id)
      .populate('players', 'username _id')
      .populate('stack.entry.user', 'username _id')
      .exec((err, game) => {
        if(err) return next(err);

        res.json(game.toObject());
      });
};
