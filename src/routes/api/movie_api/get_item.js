'use strict';

var api_request = require('../../../api_requests.js');
var apiToObject = require('../../../models/api_object.js').apiToObject;
var Movie = require('../../../models/movie.js');
var Actor = require('../../../models/actor.js');

module.exports = (req, res, next) => {

  if(!req.actor && !req.movie) {
    api_request(req.body)
      .then((response) => {
        var item = apiToObject(response);

        var Collection;
        if(req.body.type === 'actor') {
          Collection = Actor;
        } else if (req.body.type === 'movie') {
          Collection = Movie;
        }

        Collection.create(item, (err, doc) => {
          if(err) return next(err);
          req[req.body.type] = doc;
          next();
        });

      })
      .catch(next);
  } else {
    next();
  }

};
