'use strict';

var User = require('../../../models/user.js');

module.exports = function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err) {
    if(err) return next(err);
    res.user = user;
    res.json(user);
  });
};
