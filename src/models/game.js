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


GameSchema.path('stack').validate(function(stack, callback) {

  if(stack.length > 1) {

    var playerMoving = stack[0].entry.user._id.toString();

    var joined = this.players.some(player => player.toString() == playerMoving);

    return callback(joined);

  }

  return callback(true);

}, "Must join game to make a move");


GameSchema.path('stack').validate(function(stack, callback) {

  if(stack.length > 1) {

    var id = stack[0].entry.moviedb_id;
    var type = stack[0].entry.type;

    var cardIsUnique = this.stack.every((card, index) => {
      return (index == 0 || card.entry.moviedb_id !== id || card.entry.type !== type);
    });

    return callback(cardIsUnique);

  }

  return callback(true);

}, "Card has already been played this game");


GameSchema.path('currentOptions').validate(function(options, callback) {

  if(this.stack.length > 1) {

    var id = this.stack[1].entry.moviedb_id;
    console.log(id);

    var cardIsOption = this.currentOptions.some(option => option.moviedb_id == id);

    return callback(cardIsOption);

  }

  return callback(true);

}, "Card is not in current options");


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
    // allowed a player to instantly join a game, replaced with player validation
    // var player_Id = card.player._id.toString();
    // var addPlayer = this.players.every(player => player.toString() !== player_Id);
    // if(addPlayer) {
    //   this.players.push(card.player);
    // }
  }

  this.stack.unshift(obj);
});

var Game = mongoose.model('Game', GameSchema);


module.exports = Game;
