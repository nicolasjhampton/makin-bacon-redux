'use strict';

var User = require('../../../models/user.js');

module.exports = (req, res, next) => {
  var user = new User(req.body);
  user.save((err) => {
    if(err) return next(err);
    res.user = user;
    next();
  });
};
