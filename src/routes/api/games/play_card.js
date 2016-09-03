'use strict';

var Game = require('../../../models/game.js');

module.exports = (req, res, next) => {
  var item = req.movie || req.actor;
  var user = req.user;
  var game = req.game;
  console.log(item);
  console.log(user);
  console.log(game);

  game.playCard = { move: item, player: user };
  game.save((err) => {
    if(err) return next(err);
    // will remove
    // res.json(game.toObject());
    // will use next
    next();
  });

};
