'use strict';

var api_request = require('../../../api_requests.js');

module.exports = (req, res, next) => {
  api_request({ type: 'popular' })
    .then((response) => {
        req.popular = response.results;
        next();
    })
    .catch(next);
};
