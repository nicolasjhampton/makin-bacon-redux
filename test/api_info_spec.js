'use strict';

var expect = require('chai').expect;
var api_info = require('../src/api_info.js');

describe('the API info helper', function() {

  it('should return the proper url for a popular request', function() {
    var url = api_info.getPopular();
    var regex = /^https:\/\/api\.themoviedb\.org\/3\/person\/popular\?api_key=[a-z0-9]+&page=1$/i;
    expect(url).to.match(regex);
  });

  it('should return the proper url for an actor request', function() {
    var url = api_info.getActor(235);
    var regex = /^https:\/\/api\.themoviedb\.org\/3\/person\/235\?api_key=[a-z0-9]+&append_to_response=movie_credits$/i;
    expect(url).to.match(regex);
  });

  it('should return the proper url for a movie request', function() {
    var url = api_info.getMovie(235);
    var regex = /^https:\/\/api\.themoviedb\.org\/3\/movie\/235\?api_key=[a-z0-9]+&append_to_response=credits$/i;
    expect(url).to.match(regex);
  });

});
