'use strict';

var User = require('../../../models/user.js');
var auth = require('basic-auth');


module.exports = function(req, res, next) {
  var credentials = auth(req);
  User.authenticate(credentials, function(err, authorization, user) {
    if (err) return next(err);
    if(authorization) {
      req.user = user;
      return next();
    } else {
      var err = new Error('AuthenticationError');
      err.status = 401;
      return next(err);
    }
  });
};
