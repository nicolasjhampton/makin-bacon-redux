'use strict';

module.exports = (req, res, next, socket) => {

  var user = req.user;
  req.game.players.push(user);

  req.game.save((err) => {
    if(err) return next(err);
    // io.on('connection', (socket) => {
      socket.join(req.game._id);
      next();
    // });
    // //
    // next();
  });
};
