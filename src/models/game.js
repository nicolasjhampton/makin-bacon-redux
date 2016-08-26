'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CardSchema = require('./card.js');

var GameSchema = new Schema({
  // players: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  stack: [CardSchema],
  currentOptions: [{
    name: String,
    moviedb_id: Number,
    image: String
  }]
});

GameSchema.path('stack').validate(function(stack, callback) {
  // this gets complicated because of the unshift

  var isLengthEven = (stack.length % 2 === 0);

  var valid = stack.every(function(card, index) {

    var indexIsOdd = (index % 2 !== 0);

    if(card.entry.type == 'actor') {
      return isLengthEven ? indexIsOdd : !indexIsOdd;
    } else if (card.entry.type == 'movie') {
      return isLengthEven ? !indexIsOdd : indexIsOdd;
    }

  });

  return callback(valid);
}, "Actors must be odd, and movies even");

// GameSchema.pre('save', function(next) {
//   console.log(this);
//   //var lastCardIndex = stack.length - 1;
//   this.currentOptions = this.credits;
//   //console.log(this.credits);
//   //console.log(this.currentOptions);
//   next();
// });

GameSchema.methods.unshiftCard = function(card, callback) {
  var game = this;
  this.stack.unshift(card);
  this.currentOptions = card.credits;
  this.save(function(err) {
    if(err) return callback(err);
    return callback(null, game);
  });
};

var Game = mongoose.model('Game', GameSchema);


module.exports = Game;
