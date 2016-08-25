'use strict';

var imageRegEx = /(^\/[a-zA-Z0-9]+\.jpg$|^N\/A$)/;

module.exports.apiToObject = (obj) => {

  var actorProps = ['id', 'name', 'profile_path', 'movie_credits', 'cast', 'id', 'title', 'poster_path'];
  var movieProps = ['id', 'title', 'poster_path', 'credits', 'cast', 'id', 'name', 'profile_path'];

  var keys = (obj.name) ? actorProps : movieProps;

  if(obj[keys[2]] == null) {
    obj[keys[2]] = 'N/A';
  }

  var {
    [keys[0]]: moviedb_id,
    [keys[1]]: name,
    [keys[2]]: image,
    [keys[3]]: {
      [keys[4]]: credits
    }
  } = obj;

  credits = credits.map((credit) => {
    credit[keys[7]] = (credit[keys[7]] == null) ? 'N/A' : credit[keys[7]];
    return {
      moviedb_id: credit[keys[5]],
      name: credit[keys[6]],
      image: credit[keys[7]]
    };
  });

  return { entry: { moviedb_id, name, image } , credits };

};

module.exports.creditsCheck = credits => credits.length > 0;

module.exports.preSave = function(next) {
  var instance = this;
  var unknownImg = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Question_mark_(black_on_white).png';
  instance.entry.image = (instance.entry.image == 'N/A') ? unknownImg : instance.entry.image;
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
      validator: value => imageRegEx.test(value)
    }
  }
};
