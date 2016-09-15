'use strict';

// This function sends to all users
var User = require('../../../models/user.js');

module.exports = (req, res, next) => {
  User.find({})
      .select('_id username')
      .exec((err, users) => {
        if(err) return next(err);
        req.io.emit('players', users);
        next();
      });
};
