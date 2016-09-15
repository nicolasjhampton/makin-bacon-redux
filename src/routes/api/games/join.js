'use strict';

module.exports = (req, res, next) => {

  var user = req.user;
  req.game.players.push(user);

  req.game.save((err) => {
    if(err) return next(err);
    // req.gameIo = req.io.of('/' + req.game._id);
    // req.gameIo.on("connection", function(socket) {
    //   console.log('connection made on namespace', socket.nsp.name);
    //
    // });
    next();
  });
};
