'use strict';

var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var http = require('http');

var app = express();
var server = http.Server(app);
var db = require('./database.js');
var seeder = require('mongoose-seeder');
var mockData = require('./data/data.json');



var socket = require('socket.io');
var io = socket(server, { cookie: false });

io.on("connection", function(socket) {
  console.log('Socket connection made');
});

function wrapWithSocket(io) {
  return function(middleware) {
    return function(req, res, next) {
      middleware(req, res, next, io);
    };
  };
}

module.exports = wrapWithSocket(io);



var router = require('./routes/api/index.js');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use('/api', parser.json());
app.use(parser.urlencoded({ extended: false }));

app.get('/', function(req, res, next) {
  io.emit('socket open', 'a socket has been opened');
  res.end();
});

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

server.listen(port, () => {
  var message = `Server listening on port ${port} in ${process.env.MODE} mode!`;
  console.log(message);
});

db.once('open', () => {
  console.log(`Mongo connected!`);
  seeder.seed(mockData).then(data => console.log('users seeded'));
});
