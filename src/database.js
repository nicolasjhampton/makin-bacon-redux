'use strict';

require('./models');

var mongoose = require('mongoose');
var seeder = require('mongoose-seeder');
var mockData = require('./data/data.json');

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

db.once('open', () => {
  console.log(`Mongo connected!`);
  seeder.seed(mockData)
        .then(data => console.log('users seeded'))
        .catch(err => console.log(err));
});


db.on('error', err => console.error(`connection error: ${err}`));


module.exports = db;
