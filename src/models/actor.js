'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var apiHelpers = require('./api_object.js');
var apiObject = apiHelpers.apiObject;
var creditsCheck = apiHelpers.creditsCheck;
var preSave = apiHelpers.preSave;

var ActorSchema = new Schema(apiObject);

ActorSchema.pre('save', preSave);

ActorSchema.path('credits').validate(creditsCheck);

var Actor = mongoose.model('Actor', ActorSchema);

module.exports = Actor;
