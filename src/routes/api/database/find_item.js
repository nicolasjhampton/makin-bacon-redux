'use strict';

var Actor = require('../../../models/actor.js');
var Movie = require('../../../models/movie.js');

module.exports = function(req, res, next) {

  var Collection;

  if(req.api_request.type === 'actor') {
    Collection = Actor;
  } else if(req.api_request.type === 'movie') {
    Collection = Movie;
  }


  Collection.findOne({ 'entry.moviedb_id': req.api_request.id })
            .exec(function(err, doc) {

              if(err) return next(err);

              if(doc) {
                req[req.api_request.type] = doc;
              }

              next();

            });
};
