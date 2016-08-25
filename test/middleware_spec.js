'use strict';

var expect = require('chai').expect;
var mockActor = require('./mock_api_actor.json');
var mockMovie = require('./mock_api_movie.json');
var apiHelpers = require('../src/models/api_object.js');
var apiToObject = apiHelpers.apiToObject;

describe('Middleware', function() {

  describe('apiToObject', function() {
    var req;
    var res;

    beforeEach(function(done) {
      req = {};
      res = {};
      done();
    });

    it('returns an object with the correct properties (actor)', function(done) {
      var result = apiToObject(mockActor);
      expect(result.entry).to.have.property('name');
      expect(result.entry).to.have.property('moviedb_id');
      expect(result.entry).to.have.property('image');
      expect(result).to.have.property('credits');
      done();
    });

    it('returns an object with the correct properties (movie)', function(done) {
      var result = apiToObject(mockMovie);
      expect(result.entry).to.have.property('name');
      expect(result.entry).to.have.property('moviedb_id');
      expect(result.entry).to.have.property('image');
      expect(result).to.have.property('credits');
      done();
    });

    it('sets each property to the correct value (actor)', function(done) {
      var result = apiToObject(mockActor);
      expect(result.entry.name).to.equal(mockActor.name);
      expect(result.entry.moviedb_id).to.equal(mockActor.id);
      expect(result.entry.image).to.equal(mockActor.profile_path);
      done();
    });

    it('sets each property to the correct value (movie)', function(done) {
      var result = apiToObject(mockMovie);
      expect(result.entry.name).to.equal(mockMovie.title);
      expect(result.entry.moviedb_id).to.equal(mockMovie.id);
      expect(result.entry.image).to.equal(mockMovie.poster_path);
      done();
    });

    it('sets the credits as an array (movie)', function(done) {
      var result = apiToObject(mockMovie);
      expect(result.credits).to.be.a('Array');
      done();
    });

    it('sets the credits as an array (actor)', function(done) {
      var result = apiToObject(mockActor);
      expect(result.credits).to.be.a('Array');
      done();
    });

    it('sets the credits array to the proper values (movie)', function(done) {
      var result = apiToObject(mockMovie);
      result.credits.forEach(function(credit, index) {
        expect(credit.moviedb_id).to.equal(mockMovie.credits.cast[index].id);
        expect(credit.name).to.equal(mockMovie.credits.cast[index].name);
        expect(credit.image).to.equal(mockMovie.credits.cast[index].profile_path);
      });
      done();
    });

    it('sets the credits array to the proper values (actor)', function(done) {
      var result = apiToObject(mockActor);
      result.credits.forEach(function(credit, index) {
        expect(credit.moviedb_id).to.equal(mockActor.movie_credits.cast[index].id);
        expect(credit.name).to.equal(mockActor.movie_credits.cast[index].title);
        expect(credit.image).to.equal(mockActor.movie_credits.cast[index].poster_path);
      });
      done();
    });

  });

});
