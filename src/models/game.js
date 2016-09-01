'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CardSchema = require('./card.js');

var GameSchema = new Schema({
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
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

GameSchema.virtual('playCard').set(function(card) {
  var game = this;
  var obj = {
    entry: {
      type: card.move.entry.type,
      image: card.move.entry.image,
      name: card.move.entry.name,
      moviedb_id: card.move.entry.moviedb_id
    }
  };
  this.currentOptions = card.move.credits;
  if(card.player) {
    obj.entry.user = card.player;
    if(!this.players.includes(card.player._id)) {
      this.players.push(card.player);
    }
  }
  this.stack.unshift(obj);
});


// GameSchema.methods.unshiftCard = function(card, callback) {
//   var game = this;
//   this.stack.unshift(card);
//   this.currentOptions = card.credits;
//   this.save(function(err) {
//     if(err) return callback(err);
//     return callback(null, game);
//   });
// };

var Game = mongoose.model('Game', GameSchema);


module.exports = Game;
