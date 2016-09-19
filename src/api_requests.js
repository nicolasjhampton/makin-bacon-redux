'use strict';

var request = require('request');
var apiInfo = require('./api_info.js');

module.exports = function(action) {
  
  var url;
  switch (action.type) {
    case 'popular':
      url = apiInfo.getPopular();
      break;
    case 'actor':
      url = apiInfo.getActor(action.id);
      break;
    case 'movie':
      url = apiInfo.getMovie(action.id);
      break;
    default:
      return new Error('Must have an action object.');
  }

  return new Promise((resolve, reject) => {
    request({ url: url, method: 'GET' }, (err, res, body) => {
      // connection problem
      if(err) return reject(err);

      if(res.statusCode === 200) {
        var data = JSON.parse(body);
        return resolve(data);
      } else {
        // movie or actor not found
        return reject(new Error(res.statusCode));
      }

    });

  });

};
