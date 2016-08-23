'use strict';

var expect = require('chai').expect;
var mockActor = require('./mock_api_actor.json');
var mockMovie = require('./mock_api_movie.json');
var apiHelpers = require('../src/models/api_object.js');
var apiToObject = apiHelpers.apiToObject;

describe('Middleware', function() {

  function next(req, res) {
    return function() {
      return { req, res };
    }
  }

  describe('apiToObject', function() {
    var req;
    var res;

    beforeEach(function(done) {
      req = {};
      res = {};
      done();
    });

    it('returns an object with the correct properties (actor)', function(done) {
      req.apiObject = mockActor;
      var result = apiToObject(req, res, next(req, res));
      expect(result.req.actor).to.have.property('name');
      expect(result.req.actor).to.have.property('moviedb_id');
      expect(result.req.actor).to.have.property('image');
      expect(result.req.actor).to.have.property('credits');
      done();
    });

    it('returns an object with the correct properties (movie)', function(done) {
      req.apiObject = mockMovie;
      var result = apiToObject(req, res, next(req, res));
      expect(result.req.movie).to.have.property('name');
      expect(result.req.movie).to.have.property('moviedb_id');
      expect(result.req.movie).to.have.property('image');
      expect(result.req.movie).to.have.property('credits');
      done();
    });

    it('sets each property to the correct value (actor)', function(done) {
      req.apiObject = mockActor;
      var result = apiToObject(req, res, next(req, res));
      expect(result.req.actor.name).to.equal(mockActor.name);
      expect(result.req.actor.moviedb_id).to.equal(mockActor.id);
      expect(result.req.actor.image).to.equal(mockActor.profile_path);
      done();
    });

    it('sets each property to the correct value (movie)', function(done) {
      req.apiObject = mockMovie;
      var result = apiToObject(req, res, next(req, res));
      expect(result.req.movie.name).to.equal(mockMovie.title);
      expect(result.req.movie.moviedb_id).to.equal(mockMovie.id);
      expect(result.req.movie.image).to.equal(mockMovie.poster_path);
      done();
    });

    it('sets the credits as an array (movie)', function(done) {
      req.apiObject = mockMovie;
      var result = apiToObject(req, res, next(req, res));
      expect(result.req.movie.credits).to.be.a('Array');
      done();
    });

    it('sets the credits as an array (actor)', function(done) {
      req.apiObject = mockActor;
      var result = apiToObject(req, res, next(req, res));
      expect(result.req.actor.credits).to.be.a('Array');
      done();
    });

    it('sets the credits array to the proper values (movie)', function(done) {
      req.apiObject = mockMovie;
      var result = apiToObject(req, res, next(req, res));
      result.req.movie.credits.forEach(function(credit, index) {
        expect(credit.moviedb_id).to.equal(mockMovie.credits.cast[index].id);
        expect(credit.name).to.equal(mockMovie.credits.cast[index].name);
        expect(credit.image).to.equal(mockMovie.credits.cast[index].profile_path);
      });
      done();
    });

    it('sets the credits array to the proper values (actor)', function(done) {
      req.apiObject = mockActor;
      var result = apiToObject(req, res, next(req, res));
      result.req.actor.credits.forEach(function(credit, index) {
        expect(credit.moviedb_id).to.equal(mockActor.movie_credits.cast[index].id);
        expect(credit.name).to.equal(mockActor.movie_credits.cast[index].title);
        expect(credit.image).to.equal(mockActor.movie_credits.cast[index].poster_path);
      });
      done();
    });

  });

});
