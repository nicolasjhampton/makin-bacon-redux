'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var apiObject = require('./api_object.js');

var cardObject = Object.assign(
  {},
  {
    type: {
      type: String,
      validate: {
        validator: function(value) {
          return /^(actor|movie)$/.test(value);
        }
      }
    }
  },
  apiObject);

var CardSchema = new Schema(cardObject);

CardSchema.path('credits').validate(function(credits) {
  return credits.length > 0;
});

var Card = mongoose.model('Card', CardSchema);

module.exports = Card;
