'use strict';

var Actor = require('../../../models/actor.js');
var Movie = require('../../../models/movie.js');

module.exports = (req, res, next) => {
  console.log(req.body);
  var Collection;
  if(req.body.type === 'actor') {
    Collection = Actor;
  } else if(req.body.type === 'movie') {
    Collection = Movie;
  }


  Collection.findOne({ 'entry.moviedb_id': req.body.id })
            .exec((err, doc) => {
              if(err) return next(err);
              if(doc) req[req.body.type] = doc;
              next();
            });
};
