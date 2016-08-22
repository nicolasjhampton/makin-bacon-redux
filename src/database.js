'use strict';

var mongoose = require('mongoose');

var dbport = 27017;

var database;

switch(process.env.MODE) {
  case 'DEVELOPMENT':
    database = 'makinbaconDev';
    break;
  case 'TESTING':
    database = 'makinbaconTest';
    break;
  case 'PRODUCTION':
    database = 'makinbacon';
    break;
  default:
    database = 'makinbaconDev';
    break;
}

mongoose.connect(`mongodb://localhost:${dbport}/${database}`);

var db = mongoose.connection;

db.on('error', err => console.error(`connection error: ${err}`));


module.exports = db;
