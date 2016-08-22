'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var apiObject = require('./api_object.js');

var ActorSchema = new Schema(apiObject);

ActorSchema.path('credits').validate(function(credits) {
  return credits.length > 0;
});

var Actor = mongoose.model('Actor', ActorSchema);

module.exports = Actor;
