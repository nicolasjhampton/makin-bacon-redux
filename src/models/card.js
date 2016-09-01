'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var apiHelpers = require('./api_object.js');
var apiObject = apiHelpers.apiObject;
var creditsCheck = apiHelpers.creditsCheck;

var cardDetails = {
  type: {
    type: String,
    validate: {
      validator: value => /^(actor|movie)$/.test(value)
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'  
  }
};


var mid = Object.assign({}, cardDetails, apiObject);

var cardObject = { entry: mid };

var CardSchema = new Schema(cardObject);

// CardSchema.path('credits').validate(creditsCheck);

// var Card = mongoose.model('Card', CardSchema);

module.exports = CardSchema;
