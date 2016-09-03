'use strict';

module.exports = (req, res, next) => {

  var user = req.user;
  req.game.players.push(user);

  req.game.save((err) => {
    if(err) return next(err);
    // will be next later
    //res.json(req.game.toObject());
    next();
  });
};
