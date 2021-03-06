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
app.use(function(req, res, next) {
  console.log('req.body',req.body);
  next();
});
app.use(parser.json());

//app.use(parser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Credentials', "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Static server for single page app
 */
app.use('/app', express.static(__dirname + '/public/app'));


/**
 * Database startup import
 */
var db = require('./database.js');

/**
 * Socket server startup and middleware,
 * provides initial socket connection
 */
var io = require('socket.io')(server, { cookie: false });

// var holdSocket;

var rooms = [];

app.use('/api',function(req, res, next) {
  req.io = io;
  //req.io.set('transports', ['websocket']);
  //console.log("general io attached to req");
  req.io.on("connection", (socket) => {
    Object.keys(req.io.sockets.server.eio.clients).map(key => console.log(key));
    console.log(socket.client.conn.id);
    // console.log(req.io.sockets.server.eio.clients);
    // holdSocket = socket;
    // Inform console that connection has been made
    console.log("Initial socket connection made");
    // req.socket = socket;


    req.io.on("disconnect", () => console.log('Initial socket disconnected'));

  });

  next();
});

/**
 * API communication routes
 */

var router = require('./routes/api/index.js');
app.use('/api', router);

app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

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
