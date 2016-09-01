'use strict';

var api_request = require('../../../api_requests.js');
var apiToObject = require('../../../models/api_object.js').apiToObject;
var Movie = require('../../../models/movie.js');
var Actor = require('../../../models/actor.js');

module.exports = function(req, res, next) {

  if(!req.actor && !req.movie) {
    api_request(req.api_request)
      .then(function(response) {
        var Collection;
        var item = apiToObject(response);

        if(req.api_request.type === 'actor') {
          Collection = Actor;
        } else if (req.api_request.type === 'movie') {
          Collection = Movie;
        }

        Collection.create(item, function(err, doc) {
          if(err) return next(err);
          req[req.api_request.type] = doc;
          next();
        });

      })
      .catch(next);
  } else {

    next();

  }
  
};
