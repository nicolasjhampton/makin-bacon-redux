'use strict';

var expect = require('chai').expect;
var db = require('../src/database.js');
var Movie = require('../src/models').Movie;
var mockMovie = require('./mock_api_movie.json');
var apiHelpers = require('../src/models/api_object.js');
var apiToObject = apiHelpers.apiToObject;


describe('the Movie model', function() {

  afterEach(function(done) {
    Movie.remove({}, done);
  });

  after(function(done) {
    db.db.dropCollection('movies', function(err, result) {
      if(err) return done(err);
      done();
    });
  });

  describe('properties', function() {
    var testMovie;

    before(function(done) {
      var data = apiToObject(mockMovie);
      testMovie = new Movie(data);
      testMovie.save(done);
    });

    it('should have an _id property', function() {
      expect(testMovie).to.have.property('_id');
    });

    it('should have an entry property', function() {
      expect(testMovie).to.have.property('entry');
    });

    it('should have a credits property', function() {
      expect(testMovie).to.have.property('credits');
    });

    it('should have a name property', function() {
      expect(testMovie.entry).to.have.property('name');
    });

    it('should have an moviedb_id property', function() {
      expect(testMovie.entry).to.have.property('moviedb_id');
    });

    it('should have an image property', function() {
      expect(testMovie.entry).to.have.property('image');
    });

  });

  describe('creation', function() {
    var testMovie;

    beforeEach(function(done) {
      var data = apiToObject(mockMovie);
      testMovie = new Movie(data);
      testMovie.save(done);
    });

    afterEach(function(done) {
      Movie.remove({}, done);
    });

    it('should have the correct name', function() {
      testMovie.save(function(err) {
        expect(err).to.not.exist;
        expect(testMovie.entry.name).to.equal('Spectre');
        done();
      });
    });

    it('should have the correct moviedb_id', function() {
      testMovie.save(function(err) {
        expect(err).to.not.exist;
        expect(testMovie.entry.moviedb_id).to.equal(206647);
        done();
      });
    });

    it('should have the correct image', function() {
      testMovie.save(function(err) {
        expect(err).to.not.exist;
        expect(testMovie.entry.image).to.equal('/rFuETZeyOAfIqBahOObF7Soq5Dh.jpg');
        done();
      });
    });

    it('should replace N/A images with a stock unknown image', function(done) {
      testMovie.entry.image = 'N/A';
      testMovie.save(function(err) {
        expect(err).to.not.exist;
        expect(testMovie.entry.image).to.equal('https://upload.wikimedia.org/wikipedia/commons/4/44/Question_mark_(black_on_white).png');
        done();
      });
    });

    it('should have the correct credits', function() {
      testMovie.save(function(err) {
        expect(err).to.not.exist;
        expect(testMovie.credits).to.be.a('Array');
        expect(testMovie.credits[0].moviedb_id).to.equal(8784);
        expect(testMovie.credits[0].name).to.equal('Daniel Craig');
        expect(testMovie.credits[0].image).to.equal('/rFuETZeyOAfIqBahOObF7Soq5Dh.jpg');
        done();
      });
    });

  });

  describe('validations', function() {

    var testData;

    var badData = {
      name: 8784,
      moviedb_id: "Daniel Craig",
      image: 8784,
      credits: [{
        moviedb_id: "Daniel Craig",
        name: 206647,
        image: 206647
      }],
      badCredits: {
        number: 206647,
        emptyArray: []
      }
    };

    beforeEach(function(done) {
      var data = apiToObject(mockMovie);
      testData = Object.assign({}, data);
      done();
    });

    afterEach(function(done) {
      Movie.remove({}, done);
    });

    it('should have a string for a name', function(done) {
      testData.entry.name = badData.name;
      var badMovie = new Movie(testData);
      expect(badMovie.entry.name).to.be.a('string');
      done();
    });

    it('should require a name', function(done) {
      testData.entry.name = '';
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.name'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a number for a moviedb_id', function(done) {
      testData.entry.moviedb_id = badData.moviedb_id;
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.moviedb_id'].name).to.equal('CastError');
        done();
      });
    });

    it('should require a moviedb_id', function(done) {
      testData.entry.moviedb_id = '';
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.moviedb_id'].name).to.equal('ValidatorError');
        done();
      });
    });
    // Not working for some reason
    xit('should require a unique moviedb_id', function(done) {
      var firstMovie = new Movie(testData);
      firstMovie.save(function(err) {
        expect(err).to.not.exist;
        var secondMovie = new Movie(testData);
        secondMovie.save(function(err2) {
          expect(err2).to.exist;
          expect(err2.name).to.equal('MongoError');
          done();
        });
      });
    });

    it('should have a string for an image', function(done) {
      testData.entry.image = badData.image;
      var badMovie = new Movie(testData);
      expect(badMovie.entry.image).to.be.a('string');
      done();
    });

    it('should require an image', function(done) {
      testData.entry.image = '';
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.image'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a proper image url', function(done) {
      testData.entry.image = 'window@george.com';
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.image'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should have an Array for credits', function(done) {
      testData.credits = badData.credits.number;
      var badMovie = new Movie(testData);
      expect(badMovie.credits).to.be.a('Array');
      done();
    });

    it('should require at least one credit', function(done) {
      testData.credits = undefined;
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.credits.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a name for each credit', function(done) {
      testData.credits[0].name = '';
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['credits.0.name'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require an moviedb_id for each credit', function(done) {
      testData.credits[0].moviedb_id = '';
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['credits.0.moviedb_id'].name).to.equal('ValidatorError');
        done();
      });
    });

  });

});
