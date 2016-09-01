'use strict';

var expect = require('chai').expect;
var db = require('../src/database.js');
var Movie = require('../src/models/movie.js');
var Actor = require('../src/models/actor.js');
var User = require('../src/models/user.js');
var mockActor = require('./mock_api_actor.json');
var apiHelpers = require('../src/models/api_object.js');
var apiToObject = apiHelpers.apiToObject;

describe('Database middleware', function() {

  afterEach(function(done) {
    Actor.remove({}, done);
  });

  after(function(done) {
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

  describe('find item', function() {
    var find_item = require('../src/routes/api/database/find_item.js');
    var req = {};
    var res = {};

    beforeEach(function(done) {
      req = {};
      res = {};
      var data = apiToObject(mockActor);
      var testActor = new Actor(data);
      testActor.save(done);
    });

    afterEach(function(done) {
      Actor.remove({}, done);
    });

    it('should find actor if present in database', function(done) {
      req.api_request = { type: 'actor', id: 8784 };
      find_item(req, res, function(err) {
        expect(err).to.not.exist;
        expect(req.actor).to.exist;
        expect(req.actor.entry.name).to.equal('Daniel Craig');
        expect(req.actor.entry.type).to.equal('actor');
        expect(req.actor.credits).to.be.a('Array');
        done();
      });
    });

  });

});
