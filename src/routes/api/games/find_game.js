'use strict';

var Game = require('../../../models/game.js');

module.exports = function(req, res, next, id) {
  Game.findById(id, (err, game) => {
    if(err) return next(err);
    if(!game) return next(new Error('Game not found'));
    req.game = game;
    req.gameIo = req.io.of('/' + req.game._id);
    console.log('game socket created at', req.gameIo.name);
    req.gameIo.on("connection", function(socket) {
      console.log('connection made on namespace', socket.namespace);
    });
    next();
  });
};
