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

apiCopy.type = { type: String, default: 'actor' };

var ActorObject = Object.assign({}, { entry: apiCopy }, creditsObject);

var ActorSchema = new Schema(ActorObject);

ActorSchema.pre('save', preSave);

// ActorSchema.path('credits').validate(creditsCheck, 'Actor has no credits.');

var Actor = mongoose.model('Actor', ActorSchema);

module.exports = Actor;
