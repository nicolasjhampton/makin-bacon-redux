'use strict';

module.exports = (req, res, next, io, socket) => {

  var user = req.user;
  req.game.players.push(user);

  req.game.save((err) => {
    if(err) return next(err);
    console.log('req.body', req.body);
    if(req.body.previousGame !== 'undefined') {
      socket.leave(req.body.previousGame);
    }

    socket.join(req.game._id);
    next();

  });
};
