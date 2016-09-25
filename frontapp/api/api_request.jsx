"use strict";

const apiRequest = {
  request: function(method, path, auth, body) {
    return new Promise(function(resolve, reject) {
      let req = new XMLHttpRequest();
      req.open(method, `http://localhost:3000/api${path}`);
      req.setRequestHeader("authorization", auth);
      if(body) {
        req.setRequestHeader("Content-type", "application/json");
      } else {
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      }

      req.addEventListener("load", function() {
        if(this.readyState == 4 && this.status == 200) {
          let data = (this.responseText) ? JSON.parse(this.responseText) : '';
          return resolve(data);
        } else {
          return reject(this.statusText);
        }
      });
      req.send(JSON.stringify(body));
    });
  },
  login: function(auth) {
    return this.request(`POST`, `/players/login`, auth, null);
  },
  register: function(body) {
    return this.request(`POST`, `/players`, null, body);
  },
  getGames: function(auth) {
    return this.request(`GET`, `/games`, auth);
  },
  createGame: function(auth) {
    return this.request(`POST`, `/games`, auth);
  },
  joinGame: function(auth, nextGame, previousGame) {
    return this.request(`POST`, `/games/${nextGame}`, auth, { "previousGame": previousGame });
  },
  makeMove: function(auth, game, body) {
    return this.request(`POST`, `/games/${game}/move`, auth, body);
  },
}


export default apiRequest;
