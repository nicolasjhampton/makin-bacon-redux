'use strict';

module.exports = (req, res, next) => {

  var user = req.user;
  req.game.players.push(user);

  req.game.save((err) => {
    if(err) return next(err);
    next();
  });
};
