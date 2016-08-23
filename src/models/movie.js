'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var apiHelpers = require('./api_object.js');
var apiObject = apiHelpers.apiObject;
var creditsCheck = apiHelpers.creditsCheck;
var preSave = apiHelpers.preSave;

var MovieSchema = new Schema(apiObject);

MovieSchema.pre('save', preSave);

MovieSchema.path('credits').validate(creditsCheck);

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
