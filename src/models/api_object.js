'use strict';

module.exports = {
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
    required: true
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
        required: true
      }
    }]
  }
};
