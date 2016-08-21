'use strict';

var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');
var http = require('http');
var app = express();

var db = require('./database.js');

app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 400);
  return res.json(err);
});

var server = http.createServer(app);
var port = process.env.PORT || 3000;

db.once('open', () => {
  console.log(`Mongo connected!`);
  var message = `Server listening on port ${port} in ${process.env.MODE} mode!`;
  server.listen(port, () => console.log(message));
});
