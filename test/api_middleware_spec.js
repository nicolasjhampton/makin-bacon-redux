'use strict';

var expect = require('chai').expect;
var Movie = require('../src/models/movie.js');
var Actor = require('../src/models/actor.js');
var User = require('../src/models/user.js');

describe('API middleware', function() {

  afterEach(function(done) {
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

  describe('get start middleware', function() {
    var start = require('../src/routes/api/movie_api/start.js');
    var req = {};
    var res = {};

    it('should get 20 popular actors on the request object', function(done) {
      start(req, res, function(err) {
        expect(err).to.not.exist;
        expect(req.popular).to.be.not.empty;
        expect(req.popular).to.have.lengthOf(20);
        expect(req.popular[0]).to.have.property('name');
        done();
      });
    });

  });

  describe('get item middleware', function() {
    var get_item = require('../src/routes/api/movie_api/get_item.js');
    var req = {};
    var res = {};

    beforeEach(function(done) {
      req = {};
      done();
    });

    it('should get an actor object', function(done) {
      req.api_request = { type: 'actor', id: 8784 };
      get_item(req, res, function(err) {
        expect(err).to.not.exist;
        expect(req).to.not.have.property('movie');
        expect(req).to.have.property('actor');
        expect(req.actor.entry.name).to.equal('Daniel Craig');
        done();
      });
    });

    it('should get a movie object', function(done) {
      req.api_request = { type: 'movie', id: 206647 };
      get_item(req, res, function(err) {
        expect(err).to.not.exist;
        expect(req).to.not.have.property('actor');
        expect(req).to.have.property('movie');
        expect(req.movie.entry.name).to.equal('Spectre');
        done();
      });
    });

  });

  describe('random actor middleware', function() {
    var random_actor = require('../src/routes/api/movie_api/random_actor.js');
    var req = {};
    var res = {};

    beforeEach(function(done) {
      req = {};
      done();
    });

    it('should set a random actor id on the request', function(done) {
      req.popular = require('./mock_api_popular.js');
      random_actor(req, res, function(err) {
        expect(err).to.not.exist;
        expect(req).to.have.property('api_request');
        expect(req.api_request).to.have.property('type');
        expect(req.api_request).to.have.property('id');
        done();
      });
    });

  });

});
