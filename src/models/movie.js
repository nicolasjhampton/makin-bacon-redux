'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var apiHelpers = require('./api_object.js');
var apiObject = apiHelpers.apiObject;
var creditsCheck = apiHelpers.creditsCheck;
var preSave = apiHelpers.preSave;

var creditsObject = {
  credits: {
    type: [{
      name: {
        type: String
      },
      moviedb_id: {
        type: Number
      },
      image: {
        type: String
      }
    }]
  }
};

var apiCopy = Object.assign({}, apiObject);

apiCopy.type = { type: String, default: 'movie' };

var MovieObject = Object.assign({}, { entry: apiCopy }, creditsObject);

var MovieSchema = new Schema(MovieObject);

MovieSchema.pre('save', preSave);

// MovieSchema.path('credits').validate(creditsCheck, 'Movie has no credits');

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
