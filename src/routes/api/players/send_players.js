'use strict';

// This function sends to all users
var User = require('../../../models/user.js');

module.exports = (req, res, next, io) => {
  User.find({})
      .select('_id username')
      .exec((err, users) => {
        if(err) return next(err);
        io.emit('players', users);
        next();
      });
};
