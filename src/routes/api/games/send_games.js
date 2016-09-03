'use strict';


// This function must rely on sockets
var Game = require('../../../models/game.js');

module.exports = (req, res, next, io) => {

  Game.find({})
      .exec(function(err, games) {
        if(err) return next(err);
        io.emit('games', games);
        next();
      });

};
