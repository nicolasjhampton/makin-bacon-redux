'use strict';

var api_request = require('../../../api_requests.js');

module.exports = function(req, res, next) {
  api_request({ type: 'popular' })
    .then(function(response) {
        req.popular = response.results;
        next();
    })
    .catch(next);
};
