'use strict';

var expect = require('chai').expect;
var db = require('../src/database.js');
var Movie = require('../src/models').Movie;

describe('the Movie model', function() {

  var data = {
    name: "Spectre",
    moviedb_id: 206647,
    image: "/hE24GYddaxB9MVZl1CaiI86M3kp.jpg",
    credits: [{
      moviedb_id: 8784,
      name: "Daniel Craig",
      image: "/rFuETZeyOAfIqBahOObF7Soq5Dh.jpg"
    }]
  };

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
      testMovie = new Movie(data);
      testMovie.save(done);
    });

    it('should have an _id property', function() {
      expect(testMovie).to.have.property('_id');
    });

    it('should have a name property', function() {
      expect(testMovie).to.have.property('name');
    });

    it('should have an moviedb_id property', function() {
      expect(testMovie).to.have.property('moviedb_id');
    });

    it('should have an image property', function() {
      expect(testMovie).to.have.property('image');
    });

    it('should have a credits property', function() {
      expect(testMovie).to.have.property('credits');
    });

  });

  describe('creation', function() {
    var testMovie;

    before(function(done) {
      testMovie = new Movie(data);
      testMovie.save(done);
    });

    it('should have the correct name', function() {
      expect(testMovie.name).to.equal('Spectre');
    });

    it('should have the correct moviedb_id', function() {
      expect(testMovie.moviedb_id).to.equal(206647);
    });

    it('should have the correct image', function() {
      expect(testMovie.image).to.equal('/hE24GYddaxB9MVZl1CaiI86M3kp.jpg');
    });

    it('should replace N/A images with a stock unknown image', function(done) {
      var blankData = Object.assign({}, data, { image: 'N/A' });
      Movie.create(blankData, function(err, movie) {
        expect(err).to.not.exist;
        expect(movie.image).to.equal('https://upload.wikimedia.org/wikipedia/commons/4/44/Question_mark_(black_on_white).png');
        done();
      });
    });

    it('should have the correct credits', function() {
      expect(testMovie.credits).to.be.a('Array');
      expect(testMovie.credits[0].moviedb_id).to.equal(8784);
      expect(testMovie.credits[0].name).to.equal('Daniel Craig');
      expect(testMovie.credits[0].image).to.equal('/rFuETZeyOAfIqBahOObF7Soq5Dh.jpg');
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
      testData = Object.assign({}, data);
      testData.credits = data.credits.map(function(item) {
        return { name:item.name, moviedb_id:item.moviedb_id, image:item.image };
      });
      done();
    });

    it('should have a string for a name', function(done) {
      testData.name = badData.name;
      var badMovie = new Movie(testData);
      expect(badMovie.name).to.be.a('string');
      done();
    });

    it('should require a name', function(done) {
      testData.name = '';
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.name.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a number for a moviedb_id', function(done) {
      testData.moviedb_id = badData.moviedb_id;
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.moviedb_id.name).to.equal('CastError');
        done();
      });
    });

    it('should require a moviedb_id', function(done) {
      testData.moviedb_id = '';
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.moviedb_id.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a unique moviedb_id', function(done) {
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
      testData.image = badData.image;
      var badMovie = new Movie(testData);
      expect(badMovie.image).to.be.a('string');
      done();
    });

    it('should require an image', function(done) {
      testData.image = '';
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.image.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a proper image url', function(done) {
      testData.image = 'window@george.com';
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.image.name).to.equal('ValidatorError');
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

    it('should require an image for each credit', function(done) {
      testData.credits[0].image = '';
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['credits.0.image'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a proper image url for the credit', function(done) {
      testData.credits[0].image = 'window@george.com';
      var badMovie = new Movie(testData);
      badMovie.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['credits.0.image'].name).to.equal('ValidatorError');
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
