'use strict';

var expect = require('chai').expect;
var db = require('../src/database.js');
var Actor = require('../src/models').Actor;
var mockActor = require('./mock_api_actor.json');
var apiHelpers = require('../src/models/api_object.js');
var apiToObject = apiHelpers.apiToObject;


describe('the Actor model', function() {

  afterEach(function(done) {
    Actor.remove({}, done);
  });

  after(function(done) {
    db.db.dropCollection('actors', function(err, result) {
      if(err) return done(err);
      done();
    });
  });

  describe('properties', function() {
    var testActor;

    before(function(done) {
      var data = apiToObject(mockActor);
      testActor = new Actor(data);
      testActor.save(done);
    });

    it('should have an _id property', function() {
      expect(testActor).to.have.property('_id');
    });

    it('should have an entry property', function() {
      expect(testActor).to.have.property('entry');
    });

    it('should have a credits property', function() {
      expect(testActor).to.have.property('credits');
    });

    it('should have a name property', function() {
      expect(testActor.entry).to.have.property('name');
    });

    it('should have an moviedb_id property', function() {
      expect(testActor.entry).to.have.property('moviedb_id');
    });

    it('should have an image property', function() {
      expect(testActor.entry).to.have.property('image');
    });

  });

  describe('creation', function() {
    var testActor;

    beforeEach(function(done) {
      var data = apiToObject(mockActor);
      testActor = new Actor(data);
      testActor.save(done);
    });

    afterEach(function(done) {
      Actor.remove({}, done);
    });

    it('should have the correct name', function() {
      testActor.save(function(err) {
        expect(err).to.not.exist;
        expect(testActor.entry.name).to.equal('Daniel Craig');
        done();
      });
    });

    it('should have the correct moviedb_id', function() {
      testActor.save(function(err) {
        expect(err).to.not.exist;
        expect(testActor.entry.moviedb_id).to.equal(8784);
        done();
      });
    });

    it('should have the correct image', function() {
      testActor.save(function(err) {
        expect(err).to.not.exist;
        expect(testActor.entry.image).to.equal('/rFuETZeyOAfIqBahOObF7Soq5Dh.jpg');
        done();
      });
    });

    it('should replace N/A images with a stock unknown image', function(done) {
      testActor.entry.image = 'N/A';
      testActor.save(function(err) {
        expect(err).to.not.exist;
        expect(testActor.entry.image).to.equal('https://upload.wikimedia.org/wikipedia/commons/4/44/Question_mark_(black_on_white).png');
        done();
      });
    });

    it('should have the correct credits', function() {
      testActor.save(function(err) {
        expect(err).to.not.exist;
        expect(testActor.credits).to.be.a('Array');
        expect(testActor.credits[0].moviedb_id).to.equal(206647);
        expect(testActor.credits[0].name).to.equal('Spectre');
        expect(testActor.credits[0].image).to.equal('/hE24GYddaxB9MVZl1CaiI86M3kp.jpg');
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
      var data = apiToObject(mockActor);
      testData = Object.assign({}, data);
      done();
    });

    afterEach(function(done) {
      Actor.remove({}, done);
    });

    it('should have a string for a name', function(done) {
      testData.entry.name = badData.name;
      var badActor = new Actor(testData);
      expect(badActor.entry.name).to.be.a('string');
      done();
    });

    it('should require a name', function(done) {
      testData.entry.name = '';
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.name'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a number for a moviedb_id', function(done) {
      testData.entry.moviedb_id = badData.moviedb_id;
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.moviedb_id'].name).to.equal('CastError');
        done();
      });
    });

    it('should require a moviedb_id', function(done) {
      testData.entry.moviedb_id = '';
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.moviedb_id'].name).to.equal('ValidatorError');
        done();
      });
    });
    // not working for some reason, might have to do with dropped databases
    xit('should require a unique moviedb_id', function(done) {
      var firstActor = new Actor(testData);
      firstActor.save(function(err) {
        expect(err).to.not.exist;
        var secondActor = new Actor(testData);
        secondActor.save(function(err2) {
          expect(err2).to.exist;
          expect(err2.name).to.equal('MongoError');
          done();
        });
      });
    });

    it('should have a string for an image', function(done) {
      testData.entry.image = badData.image;
      var badActor = new Actor(testData);
      expect(badActor.entry.image).to.be.a('string');
      done();
    });

    it('should require an image', function(done) {
      testData.entry.image = '';
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.image'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a proper image url', function(done) {
      testData.entry.image = 'window@george.com';
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['entry.image'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should have an Array for credits', function(done) {
      testData.credits = badData.credits.number;
      var badActor = new Actor(testData);
      expect(badActor.credits).to.be.a('Array');
      done();
    });

    it('should require at least one credit', function(done) {
      testData.credits = undefined;
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.credits.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a name for each credit', function(done) {
      testData.credits[0].name = '';
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['credits.0.name'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require an moviedb_id for each credit', function(done) {
      testData.credits[0].moviedb_id = '';
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['credits.0.moviedb_id'].name).to.equal('ValidatorError');
        done();
      });
    });

  });

});
