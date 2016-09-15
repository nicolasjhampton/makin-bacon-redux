'use strict';

// This function sends to in game users only
var Game = require('../../../models/game.js');

module.exports = (req, res, next) => {
  Game.findById(req.game._id)
      .select('stack currentOptions')
      .populate('stack.entry.user', 'username')
      .exec((err, game) => {
        if(err) return next(err);
        var gameObj = game.toObject();
        gameObj.stack = gameObj.stack[0];
        //console.log(gameObj);
        req.gameIo.emit('move', gameObj);

        res.end();
      });
};
