'use strict';

var request = require('request');
var api_info = require('./api_info.js');

module.exports = function(action) {
  var url;

  switch (action.type) {
    case 'popular':
      url = api_info.getPopular();
      break;
    case 'actor':
      url = api_info.getActor(action.id);
      break;
    case 'movie':
      url = api_info.getMovie(action.id);
      break;
    default:
      return new Error('Must have an action object.');
  }

  return new Promise(function(resolve, reject) {
    request({ url: url, method: 'GET' }, function(err, res, body) {

      if(err) return reject(err);

      //console.log(res.statusCode);

      if(res.statusCode === 200) {
        var data = JSON.parse(body);
        return resolve(data);
      } else {
        return reject(new Error(res.statusCode));
      }

    });

  });

};
