'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^@[a-z0-9_\-.]+/.test(value);
      }
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^[a-z0-9_\-.]+@[a-z0-9_\-.]+.[a-z0-9_\-]+$/.test(value);
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return value.length > 5;
      }
    }
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if(err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

UserSchema.statics.authenticate = function(credentials, callback) {
  console.log(credentials.name);
  if(!credentials) return callback(null, false);
  this.findOne({ username: credentials.name })
      .exec(function(err, user) {
        console.log('inside model', user);
        console.log('inside model', err);
        if(!user || err) return callback(null, false);
        bcrypt.compare(credentials.pass, user.password, function(err2, authorization){
          if(err2) return callback(null, false);
          return callback(null, authorization, user);
        });
      });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
