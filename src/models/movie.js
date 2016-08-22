'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var apiObject = require('./api_object.js');

var MovieSchema = new Schema(apiObject);

MovieSchema.path('credits').validate(function(credits) {
  return credits.length > 0;
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
