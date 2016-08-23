'use strict';

// var imageRegEx = /(^\/[a-zA-Z0-9]+\.jpg$|^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/4\/44\/Question_mark_\(black_on_white\)\.png$)/;
var imageRegEx = /(^\/[a-zA-Z0-9]+\.jpg$|^N\/A$)/;

module.exports.apiToObject = function(req, res, next) {
  var reqPropertyName = 'apiObject';
  var actorProps = ['id', 'name', 'profile_path', 'movie_credits', 'cast', 'id', 'title', 'poster_path'];
  var movieProps = ['id', 'title', 'poster_path', 'credits', 'cast', 'id', 'name', 'profile_path'];

  var keys = (req[reqPropertyName].name) ? actorProps : movieProps;

  var {
    [keys[0]]: moviedb_id,
    [keys[1]]: name,
    [keys[2]]: image,
    [keys[3]]: {
      [keys[4]]: credits
    }
  } = req[reqPropertyName];

  credits = credits.map(function(credit) {
    return { moviedb_id: credit[keys[5]], name: credit[keys[6]], image: credit[keys[7]] };
  });

  var obj = { moviedb_id, name, image, credits };

  var reqObjName = (req[reqPropertyName].name) ? "actor" : "movie";

  req[reqObjName] = obj;

  return next();
};

module.exports.creditsCheck = function(credits) {
  return credits.length > 0;
};

module.exports.preSave = function(next) {
  var instance = this;
  var unknownImg = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Question_mark_(black_on_white).png';
  if(instance.image == 'N/A') {
    instance.image = unknownImg;
  }
  next();
};

module.exports.apiObject = {
  name: {
    type: String,
    required: true
  },
  moviedb_id: {
    type: Number,
    unique: true,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return imageRegEx.test(value);
      }
    }
  },
  credits: {
    type: [{
      name: {
        type: String,
        required: true
      },
      moviedb_id: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true,
        validate: {
          validator: function(value) {
            return imageRegEx.test(value);
          }
        }
      }
    }]
  }
};
