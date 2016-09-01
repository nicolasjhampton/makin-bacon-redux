'use strict';

var expect = require('chai').expect;
var db = require('../src/database.js');

var Movie = require('../src/models').Movie;
var Actor = require('../src/models').Actor;
var User = require('../src/models').User;
var Game = require('../src/models').Game;

var mockMovie = require('./mock_api_movie.json');
var mockActor = require('./mock_api_actor.json');
var mockUser = require('./mock_user_info.json');

describe('The game route', function() {

  before(function(done) {
    db.db.dropCollection('games', function(err, result) {
      if(err) return done(err);
      done();
    });
  });

  after(function(done) {
    Game.remove({}, function(err) {
      if(err) return done(err);
      Actor.remove({}, function(err) {
        if(err) return done(err);
        Movie.remove({}, function(err) {
          if(err) return done(err);
          User.remove({}, function(err) {
            if(err) return done(err);
            done();
          });
        });
      });
    });
  });

  describe('create middleware', function() {
    var create = require('../src/routes/api/games/create.js');
    var req;
    var res;

    beforeEach(function(done) {
      req = {};
      res = {};
      done();
    });

    it('should create a new game on the request object', function(done) {
      var mockActor = require('./mock_api_actor.json');
      var apiToObject = require('../src/models/api_object.js').apiToObject;
      var testActor = apiToObject(mockActor);
      testActor.entry.type = 'actor';
      req.actor = testActor;
      create(req, res, function(err) {
        expect(err).to.not.exist;
        expect(req).to.have.property('game');
        done();
      });
    });

  });

  describe('join middleware', function() {
    var join = require('../src/routes/api/games/join.js');
    var req;
    var res;

    beforeEach(function(done) {
      var player = new User(mockUser);
      var game = new Game({});
      player.save(function(err) {
        game.save(function(err) {
          req = { user: player, game: game };
          res = {};
          done();
        });
      });
    });

    afterEach(function(done) {
      Game.remove({}, function(err) {
        User.remove({}, done);
      });
    });

    it('should create a new game on the request object', function(done) {
      join(req, res, function(err) {
        expect(err).to.not.exist;
        expect(req.game.players).to.be.not.empty;
        expect(req.game.players[0]).to.equal(req.user._id);
        done();
      });
    });

  });

});
