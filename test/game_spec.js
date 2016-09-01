'use strict';

var expect = require('chai').expect;
var db = require('../src/database.js');

var Game = require('../src/models').Game;
//var Card = require('../src/models').Card;

var Movie = require('../src/models').Movie;
var Actor = require('../src/models').Actor;
var User = require('../src/models').User;

var mockMovie = require('./mock_api_movie.json');
var mockActor = require('./mock_api_actor.json');
var mockUser = require('./mock_user_info.json');

var apiHelpers = require('../src/models/api_object.js');
var apiToObject = apiHelpers.apiToObject;


describe('the Game model', function() {

  after(function(done) {
    db.db.dropCollection('games', function(err, result) {
      if(err) return done(err);
      db.db.dropCollection('actors', function(err, result) {
        if(err) return done(err);
        db.db.dropCollection('movies', function(err, result) {
          if(err) return done(err);
          db.db.dropCollection('users', function(err, result) {
            if(err) return done(err);
            done();
          });
        });
      });
    });
  });

  describe('Properties', function() {

    var testGame;

    before(function(done) {
      testGame = new Game({});
      testGame.save(done);
    });

    afterEach(function(done) {
      Game.remove({}, done);
    });

    it('should be able to create a blank game record', function(done) {
      //console.log(thisGame._id);
      Game.findById(testGame._id, function(err, game) {
        expect(err).to.not.exist;
        expect(game).to.exist;
        done();
      });
    });

    it('should have a players property', function(done) {
      expect(testGame).to.have.property('players');
      done();
    });

    it('should have a playCard property', function(done) {
      expect(testGame).to.have.property('playCard');
      done();
    });

    it('should have a stack property', function(done) {
      expect(testGame).to.have.property('stack');
      done();
    });

    it('should have a currentOptions property', function(done) {
      expect(testGame).to.have.property('currentOptions');
      done();
    });
  });

  describe('Creation', function() {
    var testGame;
    var testActor;
    var testMovie;
    var testUser;
    var data;

    before(function(done) {
      var dataActor = apiToObject(mockActor);
      var dataMovie = apiToObject(mockMovie);
      testActor = new Actor(dataActor);
      testMovie = new Movie(dataMovie);
      testUser = new User(mockUser);
      testUser.save(function(err) {
        testActor.save(function(err) {
          testMovie.save(function(err) {
            data = { player: testUser, move: testActor };
            testGame = new Game({ playCard: data });
            testGame.save(function(err) {
              data = { player: testUser, move: testMovie };
              testGame.playCard = data;
              testGame.save(function(err) {
                if(err) console.log(err);
                done();
              });
            });
          });
        });
      });
    });

    after(function(done) {
      Game.remove({}, done);
    });

    it('should have the correct stack data for an actor card', function(done) {
      Game.findById(testGame._id, function(err, game) {
        expect(err).to.not.exist;
        expect(game.stack[1].entry.type).to.equal(testActor.entry.type);
        expect(game.stack[1].entry.name).to.equal(testActor.entry.name);
        expect(game.stack[1].entry.moviedb_id).to.equal(testActor.entry.moviedb_id);
        expect(game.stack[1].entry.image).to.equal(testActor.entry.image);
        done();
      });
    });

    it('should have the correct stack data for a movie card', function(done) {
      Game.findById(testGame._id, function(err, game) {
        expect(err).to.not.exist;
        expect(game.stack[0].entry.type).to.equal(testMovie.entry.type);
        expect(game.stack[0].entry.name).to.equal(testMovie.entry.name);
        expect(game.stack[0].entry.moviedb_id).to.equal(testMovie.entry.moviedb_id);
        expect(game.stack[0].entry.image).to.equal(testMovie.entry.image);
        done();
      });
    });

    it('should have current options set to the credits from the last card', function(done) {
      Game.findById(testGame._id, function(err, game) {
        expect(err).to.not.exist;
        expect(game.currentOptions[0].name).to.equal(testMovie.credits[0].name);
        expect(game.currentOptions[0].moviedb_id).to.equal(testMovie.credits[0].moviedb_id);
        expect(game.currentOptions[0].image).to.equal(testMovie.credits[0].image);
        done();
      });
    });

  });

  describe('Modification', function() {
    var testGame;
    var testActor;
    var testMovie;
    var testUser;
    var data;

    before(function(done) {
      var dataActor = apiToObject(mockActor);
      var dataMovie = apiToObject(mockMovie);
      //data = { stack: [], currentOptions: {} };
      testUser = new User(mockUser);
      testActor = new Actor(dataActor);
      testMovie = new Movie(dataMovie);
      testGame = new Game({});
      testUser.save(function(err) {
        testActor.save(function(err) {
          testMovie.save(function(err) {
            testGame.save(function(err) {
              if(err) console.log(err);
              done();
            });
          });
        });
      });
    });

    after(function(done) {
      User.remove({}, function(err) {
        Game.remove({}, function(err) {
          Actor.remove({}, function(err) {
            Movie.remove({}, done);
          });
        });
      });
    });

    it('should not accept movies as odd stack entries', function(done) {
      var badData = { player: testUser, move: testMovie };
      var badGame = new Game({ playCard: badData });
      badGame.save(function(err) {
        expect(err).to.exist;
        expect(err.errors.stack.message).to.equal('Actors must be odd, and movies even');
        done();
      });
    });

    it('should not accept actors as even stack entries', function(done) {
      var data = { player: testUser, move: testActor };
      var badGame = new Game({ playCard: data });
      badGame.playCard = { player: testUser, move: testActor };
      badGame.save(function(err) {
        expect(err).to.exist;
        expect(err.errors.stack.message).to.equal('Actors must be odd, and movies even');
        done();
      });
    });

    it('should replace the currentOptions with each push', function(done) {
      Game.findById(testGame._id, function(err, game) {
        game.playCard = { player: testUser, move: testActor };
        game.playCard = { player: testUser, move: testMovie };
        game.save(function(err) {
          expect(err).to.not.exist;
          game.currentOptions.forEach(function(actor, index) {
            expect(actor.moviedb_id).to.equal(testMovie.credits[index].moviedb_id);
          });
          expect(game.stack[0].entry.moviedb_id).to.equal(testMovie.entry.moviedb_id);
          done();
        });
      });
    });

  });


});
