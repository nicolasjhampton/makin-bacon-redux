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
        type: String,
        required: true
      },
      moviedb_id: {
        type: Number,
        required: true
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

ActorSchema.path('credits').validate(creditsCheck);

var Actor = mongoose.model('Actor', ActorSchema);

module.exports = Actor;
