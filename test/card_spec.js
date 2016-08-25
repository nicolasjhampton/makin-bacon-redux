'use strict';

var expect = require('chai').expect;
var db = require('../src/database.js');

var CardSchema = require('../src/models').Card;
var Card = db.model('Card', CardSchema);

var Movie = require('../src/models').Movie;
var Actor = require('../src/models').Actor;

var mockMovie = require('./mock_api_movie.json');
var mockActor = require('./mock_api_actor.json');

var apiHelpers = require('../src/models/api_object.js');
var apiToObject = apiHelpers.apiToObject;


describe('the Card model', function() {

  var testActor;
  var testMovie;

  before(function(done) {
    var dataActor = apiToObject(mockActor);
    var dataMovie = apiToObject(mockMovie);
    testActor = new Actor(dataActor);
    testMovie = new Movie(dataMovie);
    testActor.save(function(err) {
      testMovie.save(done);
    });
  });

  afterEach(function(done) {
    Card.remove({}, function(err) {
      if(err) return done(err);
      Actor.remove({}, function(err) {
        if(err) return done(err);
        Movie.remove({}, function(err) {
          if(err) return done(err);
          done();
        });
      });
    });
  });

  after(function(done) {
    db.db.dropCollection('cards', function(err, result) {
      if(err) return done(err);
      db.db.dropCollection('movies', function(err, result) {
        if(err) return done(err);
        db.db.dropCollection('actors', function(err, result) {
          if(err) return done(err);
          done();
        });
      });
    });
  });

  describe('properties', function() {
    var testCard;

    before(function(done) {
      testCard = new Card(testActor);
      testCard.save(done);
    });

    it('should have an _id property', function() {
      expect(testCard).to.have.property('_id');
    });

    it('should have a type property', function() {
      expect(testCard.entry).to.have.property('type');
    });

    it('should have a name property', function() {
      expect(testCard.entry).to.have.property('name');
    });

    it('should have an moviedb_id property', function() {
      expect(testCard.entry).to.have.property('moviedb_id');
    });

    it('should have an image property', function() {
      expect(testCard.entry).to.have.property('image');
    });

  });

  describe('creation', function() {
    var testCard;

    before(function(done) {
      testCard = new Card(testMovie);
      testCard.save(done);
    });

    it('should have the correct type', function() {
      expect(testCard.entry.type).to.equal('movie');
    });

    it('should have the correct name', function() {
      expect(testCard.entry.name).to.equal('Spectre');
    });

    it('should have the correct moviedb_id', function() {
      expect(testCard.entry.moviedb_id).to.equal(206647);
    });

    it('should have the correct image', function() {
      expect(testCard.entry.image).to.equal('/hE24GYddaxB9MVZl1CaiI86M3kp.jpg');
    });

  });


  describe('validations', function() {

    var testData;

    var badData = {
      type: 'something',
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
      var dataMovie = apiToObject(mockMovie);
      testMovie = new Movie(dataMovie);
      testMovie.save(function() {
        testData = testMovie;
        done();
      });
    });

    afterEach(function(done) {
      Movie.remove({}, function(err) {
        Card.remove({}, done);
      });
    });

    it('should have a type of either movie or actor', function(done) {
      testData.entry.type = badData.type;
      var badCard = new Card(testData);
      badCard.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.type'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should have a string for a name', function(done) {
      testData.entry.name = badData.name;
      var badCard = new Card(testData);
      expect(badCard.entry.name).to.be.a('string');
      done();
    });

    it('should require a name', function(done) {
      testData.entry.name = '';
      var badCard = new Card(testData);
      badCard.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.name'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a moviedb_id', function(done) {
      testData.entry.moviedb_id = '';
      var badCard = new Card(testData);
      badCard.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.moviedb_id'].name).to.equal('ValidatorError');
        done();
      });
    });

    xit('should require a unique moviedb_id', function(done) {
      // seems to have a problem with the nested unique validation
      var firstCard = new Card(testData);
      firstCard.save(function(err) {
        expect(err).to.not.exist;
        var secondCard = new Card(testData);
        secondCard.save(function(err2) {
          console.log(firstCard);
          console.log(secondCard);
          expect(err2).to.exist;
          expect(err2.name).to.equal('MongoError');
          done();
        });
      });
    });

    it('should have a string for an image', function(done) {
      testData.entry.image = badData.image;
      var badCard = new Card(testData);
      expect(badCard.entry.image).to.be.a('string');
      done();
    });

    it('should require an image', function(done) {
      testData.entry.image = '';
      var badCard = new Card(testData);
      badCard.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.image'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a proper image url', function(done) {
      testData.entry.image = 'window@george.com';
      var badCard = new Card(testData);
      badCard.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.image'].name).to.equal('ValidatorError');
        done();
      });
    });

  });

});
