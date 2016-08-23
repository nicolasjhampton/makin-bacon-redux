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
      validator: function(value) {
        return /^(actor|movie)$/.test(value);
      }
    }
  }
};

var cardObject = Object.assign({}, cardDetails, apiObject);

var CardSchema = new Schema(cardObject);

CardSchema.path('credits').validate(creditsCheck);

var Card = mongoose.model('Card', CardSchema);

module.exports = Card;
