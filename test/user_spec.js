'use strict';

var expect = require('chai').expect;
var db = require('../src/database.js');
var User = require('../src/models').User;
var mockUser = require('./mock_user_info.json');
var bcrypt = require('bcrypt');


describe('The User model', function() {

  after(function(done) {
    db.db.dropCollection('actors', function(err, result) {
      if(err) return done(err);
      done();
    });
  });


  describe('Properties', function() {

    var testUser;

    before(function(done) {
      testUser = new User(mockUser);
      testUser.save(done);
    });

    after(function(done) {
      User.remove({}, done);
    });

    it('should have a username property', function() {
      expect(testUser).to.have.property('username');
    });

    it('should have a email property', function() {
      expect(testUser).to.have.property('email');
    });

    it('should have a password property', function() {
      expect(testUser).to.have.property('password');
    });

  });

  describe('Creation', function() {

    var testUser;

    before(function(done) {
      testUser = new User(mockUser);
      testUser.save(done);
    });

    after(function(done) {
      User.remove({}, done);
    });

    it('should enter a username in database', function(done) {
      User.findById(testUser._id, function(err, user) {
        expect(err).to.not.exist;
        expect(user.username).to.equal(mockUser.username);
        done();
      });
    });

    it('should enter an email in database', function(done) {
      User.findById(testUser._id, function(err, user) {
        expect(err).to.not.exist;
        expect(user.email).to.equal(mockUser.email);
        done();
      });
    });

    it('should enter a hashed password in database', function(done) {
      User.findById(testUser._id, function(err, user) {
        expect(err).to.not.exist;
        expect(user.password).to.not.equal(mockUser.password);
        bcrypt.compare(mockUser.password, user.password, function(err, valid) {
          expect(valid).to.be.true;
          done();
        });
      });
    });

  });

  describe('Validation', function() {

    var testUser;

    var badData = {
      username: 'nicolas',
      email: 'notValidEmail',
      password: 'short'
    };

    beforeEach(function(done) {
      testUser = new User(mockUser);
      done();
    });

    afterEach(function(done) {
      User.remove({}, done);
    });

    it('should require a username', function(done) {
      testUser.username = '';
      testUser.save(function(err) {
        expect(err).to.exist;
        expect(err.errors.username.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require an email', function(done) {
      testUser.email = '';
      testUser.save(function(err) {
        expect(err).to.exist;
        expect(err.errors.email.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should require a password', function(done) {
      testUser.password = '';
      testUser.save(function(err) {
        expect(err).to.exist;
        expect(err.errors.password.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should throw error for a username without a leading at symbol', function(done) {
      testUser.username = badData.username;
      testUser.save(function(err) {
        expect(err).to.exist;
        expect(err.errors.username.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should throw error for invalid email', function(done) {
      testUser.email = badData.email;
      testUser.save(function(err) {
        expect(err).to.exist;
        expect(err.errors.email.name).to.equal('ValidatorError');
        done();
      });
    });

    it('should throw error for a password less than 6 characters', function(done) {
      testUser.password = badData.password;
      testUser.save(function(err) {
        expect(err).to.exist;
        expect(err.errors.password.name).to.equal('ValidatorError');
        done();
      });
    });

  });

});
