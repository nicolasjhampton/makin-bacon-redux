'use strict';

module.exports = {
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
        return /^\/[a-zA-Z0-9]+\.jpg$/.test(value);
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
            return /^\/[a-zA-Z0-9]+\.jpg$/.test(value);
          }
        }
      }
    }]
  }
};
