'use strict';

var api_request = require('../../../api_requests.js');

module.exports = function(req, res, next) {
  var index = Math.floor(Math.random() * 20);
  var actorID = req.popular[index].id;
  req.api_request = { type: 'actor', id: actorID };
  next();
};
