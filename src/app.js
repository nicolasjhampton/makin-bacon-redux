'use strict';

var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var http = require('http');

var app = express();
var server = http.Server(app);
var port = process.env.PORT || 3000;
var db = require('./database.js');

var startSockets = require('./sockets.js').startSockets;

app.use('/client', express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "Content-Type");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(morgan('dev'));
app.use('/api', parser.json());
app.use(parser.urlencoded({ extended: false }));



server.listen(port, () => {
  var message = `Server listening on port ${port} in ${process.env.MODE} mode!`;
  console.log(message);
});

startSockets(server, function() {
  var router = require('./routes/api/index.js');
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
});





//
// var socket = require('socket.io');
// var io = socket(server, { cookie: false });
//
// function wrapWithSocket(socket) {
//   return function(middleware) {
//     return function(req, res, next) {
//       middleware(req, res, next, socket);
//     };
//   };
// }
//
// io.on("connection", function(socket) {
//   console.log('Socket connection made');
//   module.exports = wrapWithSocket(socket);
//
//   var router = require('./routes/api/index.js');
//   app.use('/api', router);
//
//   app.use((req, res, next) => {
//     var err = new Error('Not Found');
//     err.status = 404;
//     return next(err);
//   });
//
//   app.use((err, req, res, next) => {
//     console.log(err);
//     res.status(err.status || 400);
//     return res.json(err);
//   });
//
// });
//
//





// app.get('/', function(req, res, next) {
//   io.emit('socket open', 'a socket has been opened');
//   res.end();
// });
