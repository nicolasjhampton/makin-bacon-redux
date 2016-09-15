'use strict';

// This function sends to all users
var Game = require('../../../models/game.js');

module.exports = (req, res, next) => {

  Game.find({})
      .select('players _id')
      .populate('players', 'username')
      .exec(function(err, games) {
        if(err) return next(err);
        res.json(games);
      });

};
