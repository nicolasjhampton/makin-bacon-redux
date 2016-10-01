'use strict';

module.exports = (req, res, next) => {

  var user = req.user;
  if(req.game.players.every(player => !player.equals(user._id))) {
    req.game.players.push(user);
  }


  req.game.save((err) => {
    if(err) return next(err);

    next();
  });
};
