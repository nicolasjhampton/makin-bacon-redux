'use strict';

var expect = require('chai').expect;
var db = require('../src/database.js');
var Card = require('../src/models').Card;

describe('the Card model', function() {

  var data = {
    type: "movie",
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
    Card.remove({}, done);
  });

  after(function(done) {
    db.db.dropCollection('cards', function(err, result) {
      if(err) return done(err);
      done();
    });
  });

  describe('properties', function() {
    var testCard;

    before(function(done) {
      testCard = new Card(data);
      testCard.save(done);
    });

    it('should have an _id property', function() {
      expect(testCard).to.have.property('_id');
    });

    it('should have a type property', function() {
      expect(testCard).to.have.property('type');
    });

    it('should have a name property', function() {
      expect(testCard).to.have.property('name');
    });

    it('should have an moviedb_id property', function() {
      expect(testCard).to.have.property('moviedb_id');
    });

    it('should have an image property', function() {
      expect(testCard).to.have.property('image');
    });

    it('should have a credits property', function() {
      expect(testCard).to.have.property('credits');
    });

  });

  describe('creation', function() {
    var testCard;

    before(function(done) {
      testCard = new Card(data);
      testCard.save(done);
    });

    it('should have the correct type', function() {
      expect(testCard.type).to.equal('movie');
    });

    it('should have the correct name', function() {
      expect(testCard.name).to.equal('Spectre');
    });

    it('should have the correct moviedb_id', function() {
      expect(testCard.moviedb_id).to.equal(206647);
    });

    it('should have the correct image', function() {
      expect(testCard.image).to.equal('/hE24GYddaxB9MVZl1CaiI86M3kp.jpg');
    });

    it('should have the correct credits', function() {
      expect(testCard.credits).to.be.a('Array');
      expect(testCard.credits[0].moviedb_id).to.equal(8784);
      expect(testCard.credits[0].name).to.equal('Daniel Craig');
      expect(testCard.credits[0].image).to.equal('/rFuETZeyOAfIqBahOObF7Soq5Dh.jpg');
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
      var badCard = new Card(testData);
      expect(badCard.name).to.be.a('string');
      done();
    });

    it('should require a name', function(done) {
      testData.name = '';
      var badCard = new Card(testData);
      badCard.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.name.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a number for a moviedb_id', function(done) {
      testData.moviedb_id = badData.moviedb_id;
      var badCard = new Card(testData);
      badCard.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.moviedb_id.name).to.equal('CastError');
        done();
      });
    });

    it('should require a moviedb_id', function(done) {
      testData.moviedb_id = '';
      var badCard = new Card(testData);
      badCard.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.moviedb_id.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should have a string for an image', function(done) {
      testData.image = badData.image;
      var badCard = new Card(testData);
      expect(badCard.image).to.be.a('string');
      done();
    });

    it('should require an image', function(done) {
      testData.image = '';
      var badCard = new Card(testData);
      badCard.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.image.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should have an Array for credits', function(done) {
      testData.credits = badData.credits.number;
      var badCard = new Card(testData);
      expect(badCard.credits).to.be.a('Array');
      done();
    });

    it('should require at least one credit', function(done) {
      testData.credits = undefined;
      var badCard = new Card(testData);
      badCard.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.credits.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a name for each credit', function(done) {
      testData.credits[0].name = '';
      var badCard = new Card(testData);
      badCard.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['credits.0.name'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require an image for each credit', function(done) {
      testData.credits[0].image = '';
      var badCard = new Card(testData);
      badCard.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['credits.0.image'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require an moviedb_id for each credit', function(done) {
      testData.credits[0].moviedb_id = '';
      var badCard = new Card(testData);
      badCard.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['credits.0.moviedb_id'].name).to.equal('ValidatorError');
        done();
      });
    });

  });

});
