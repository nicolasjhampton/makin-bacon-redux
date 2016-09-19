'use strict';

var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var http = require('http');

/**
 * Express setup
 */
var app = express();
var server = http.Server(app);
var port = process.env.PORT || 3000;

/**
 * Standard logging and request header middleware
 */
app.use(morgan('dev'));
app.use(parser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "Content-Type");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

/**
 * Static server for single page app
 */
app.use('/app', express.static(__dirname + '/public/app'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

/**
 * Database startup import
 */
var db = require('./database.js');

/**
 * Socket server startup and middleware,
 * provides initial socket connection
 */
var io = require('socket.io')(server, { cookie: false });
app.use(function(req, res, next) {
  req.io = io;
  console.log('general io attached to req');
  req.io.on("connection", (socket) => {

    // Inform console that connection has been made
    console.log('Initial socket connection made');
    req.socket = socket;
    socket.on("disconnect", () => console.log('Initial socket disconnected'));
  });

  next();
});

/**
 * API communication routes
 */

var router = require('./routes/api/index.js');
app.use('/api', parser.json());
app.use('/api', router);


/**
 * Standard error handling
 */
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

/**
 * Start listening to port
 */
server.listen(port, () => {
  var message = `Server listening on port ${port} in ${process.env.MODE} mode!`;
  console.log(message);
});
