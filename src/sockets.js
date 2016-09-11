'use strict';

var socket = require('socket.io');

function wrapWithSocket(io, socket) {
  return function(middleware) {
    return function(req, res, next) {
      middleware(req, res, next, io, socket);
    };
  };
}

module.exports.startSockets = function(server, callback) {

  // Start the socket server
  var io = socket(server, { cookie: false });

  // Make the initial connection
  io.on("connection", function(socket) {

    //Inform console that connection has been made
    console.log('Socket connection made');

    socket.on("disconnect", function() {
      console.log('Socket disconnected');
    });

    // export the socket wrapper needed by the routes
    module.exports.socket = wrapWithSocket(io, socket);

    // start the rest of the app
    callback();

  });


};
