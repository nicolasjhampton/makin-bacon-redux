'use strict';

var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');
var http = require('http');
var app = express();

var db = require('./database.js');
var seeder = require('mongoose-seeder');
var mockData = require('./data/data.json');
var router = require('./routes/api/index.js');

app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use('/api', router);

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 400);
  return res.json(err);
});

var server = http.createServer(app);
var port = process.env.PORT || 3000;

db.once('open', () => {
  console.log(`Mongo connected!`);
  var message = `Server listening on port ${port} in ${process.env.MODE} mode!`;
  seeder.seed(mockData).then(data => console.log('users seeded'));
  server.listen(port, () => console.log(message));
});
