'use strict';

var Game = require('../../../models/game.js');

module.exports = function(req, res, next, id) {
  Game.findById(id, (err, game) => {
    if(err) return next(err);
    if(!game) return next(new Error('Game not found'));
    req.game = game;
    // req.io.on(function(socket) {
    //   socket.join(`/${id}`);
    // });
    // req.gameIo.on("connection", function(socket) {
    //
    //   socket.emit('begin', {connect: 'true'});
    //   console.log('connection made on namespace', socket.namespace);
    // });
    next();
  });
};
