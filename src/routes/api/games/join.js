'use strict';

module.exports = function(req, res, next) {

  var user = req.user;
  req.game.players.push(user);

  req.game.save(function(err) {
    if(err) return next(err);
    // will be next later
    res.json(req.game.toObject());
    //next();
  });
};
