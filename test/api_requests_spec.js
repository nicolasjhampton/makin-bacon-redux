'use strict';

var expect = require('chai').expect;
var api_request = require('../src/api_requests.js');

describe('The api requests function', function() {

  it('should return a promise', function(done) {
    var request = api_request({ type: 'popular' });
    expect(request).to.have.property('then');
    done();
  });

  it('should successfully receive a response', function(done) {
    this.timeout(5000);
    api_request({ type: 'popular' })
      .then(function(response) {
        expect(response).to.exist;
        done();
      });
  });

  it('should get a list of popular actors', function(done) {
    this.timeout(5000);
    api_request({ type: 'popular' })
      .then(function(response) {
        expect(response).to.exist;
        // expect(response).to.have.property();
        done();
      });
  });

  it('should get an actor with a given id', function(done) {
    this.timeout(5000);
    api_request({ type: 'actor', id: '8784' })
      .then(function(response) {
        expect(response).to.exist;
        expect(response).to.have.property('name');
        expect(response.name).to.equal('Daniel Craig');
        done();
      });
  });

  it('should get a movie with a given id', function(done) {
    this.timeout(5000);
    api_request({ type: 'movie', id: '206647' })
      .then(function(response) {
        expect(response).to.exist;
        expect(response).to.have.property('title');
        expect(response.title).to.equal('Spectre');
        done();
      });
  });

});
