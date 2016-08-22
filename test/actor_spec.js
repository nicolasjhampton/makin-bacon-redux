'use strict';

var expect = require('chai').expect;
var db = require('../src/database.js');
var Actor = require('../src/models').Actor;

describe('the Actor model', function() {

  var data = {
    type: "actor",
    name: "Daniel Craig",
    moviedb_id: 8784,
    image: "/rFuETZeyOAfIqBahOObF7Soq5Dh.jpg",
    credits: [{
      moviedb_id: 206647,
      name: "Spectre",
      image: "/hE24GYddaxB9MVZl1CaiI86M3kp.jpg"
    }]
  };

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
      testActor = new Actor(data);
      testActor.save(done);
    });

    it('should have an _id property', function() {
      expect(testActor).to.have.property('_id');
    });

    it('should have a name property', function() {
      expect(testActor).to.have.property('name');
    });

    it('should have an moviedb_id property', function() {
      expect(testActor).to.have.property('moviedb_id');
    });

    it('should have an image property', function() {
      expect(testActor).to.have.property('image');
    });

    it('should have a credits property', function() {
      expect(testActor).to.have.property('credits');
    });

  });

  describe('creation', function() {
    var testActor;

    before(function(done) {
      testActor = new Actor(data);
      testActor.save(done);
    });

    it('should have the correct name', function() {
      expect(testActor.name).to.equal('Daniel Craig');
    });

    it('should have the correct moviedb_id', function() {
      expect(testActor.moviedb_id).to.equal(8784);
    });

    it('should have the correct image', function() {
      expect(testActor.image).to.equal('/rFuETZeyOAfIqBahOObF7Soq5Dh.jpg');
    });

    it('should have the correct credits', function() {
      expect(testActor.credits).to.be.a('Array');
      expect(testActor.credits[0].moviedb_id).to.equal(206647);
      expect(testActor.credits[0].name).to.equal('Spectre');
      expect(testActor.credits[0].image).to.equal('/hE24GYddaxB9MVZl1CaiI86M3kp.jpg');
    });

  });

  describe('validations', function() {
    var testActor;

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
      var badActor = new Actor(testData);
      expect(badActor.name).to.be.a('string');
      done();
    });

    it('should require a name', function(done) {
      testData.name = '';
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.name.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a number for a moviedb_id', function(done) {
      testData.moviedb_id = badData.moviedb_id;
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.moviedb_id.name).to.equal('CastError');
        done();
      });
    });

    it('should require a moviedb_id', function(done) {
      testData.moviedb_id = '';
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.moviedb_id.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a unique moviedb_id', function(done) {
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
      testData.image = badData.image;
      var badActor = new Actor(testData);
      expect(badActor.image).to.be.a('string');
      done();
    });

    it('should require an image', function(done) {
      testData.image = '';
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.image.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a proper image url', function(done) {
      testData.image = 'window@george.com';
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors.image.name).to.equal('ValidatorError');
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

    it('should require an image for each credit', function(done) {
      testData.credits[0].image = '';
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['credits.0.image'].name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a valid image url for the credit', function(done) {
      testData.credits[0].image = 'window@george.com';
      var badActor = new Actor(testData);
      badActor.save(function(err) {
        expect(err).to.exist;
        expect(err.name).to.equal('ValidationError');
        expect(err.errors['credits.0.image'].name).to.equal('ValidatorError');
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
