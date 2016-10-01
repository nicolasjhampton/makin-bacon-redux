"use strict";

import IoMgr from '../streams/io_mgr.jsx';
//const ioMgr = new IoMgr();

const apiRequest = {
  ioMgr: new IoMgr(),
  request: function(method, path, auth, body) {
    return new Promise(function(resolve, reject) {
      let req = new XMLHttpRequest();
      req.open(method, `https://makinbacon.herokuapp.com/api${path}`);
      req.withCredentials = true;
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
      if(body) {
        req.send(JSON.stringify(body));
      } else {
        req.send();
      }

    });
  },
  login: function(auth) {
    return this.request(`POST`, `/players/login`, auth, null);
  },
  register: function(body) {
    return this.request(`POST`, `/players`, null, body);
  },
  getGames: function(context, auth) {
    this.ioMgr.gameListStream(context);
    return this.request(`GET`, `/games`, auth).then(games => {
      context.setState({ games: games });
    });
  },
  createGame: function(context, auth, callback) {

    return this.request(`POST`, `/games`, auth).then(game => {
      let optionType = game.stack[0].entry.type == "actor" ? "movie" : "actor";
      let options = game.currentOptions;
      let stack = game.stack;
      context.setState({
        optionType,
        options,
        stack,
      });
      this.ioMgr.gameStream(context, game._id);
    });
  },
  joinGame: function(context, auth, nextGame) {
    let path = `/games/${nextGame}`;
    this.ioMgr.gameStream(context, nextGame);
    return this.request(`POST`, path, auth).then(game => {
      let optionType = game.stack[0].entry.type == "actor" ? "movie" : "actor";
      let options = game.currentOptions;
      let stack = game.stack;
      context.setState({
        optionType,
        options,
        stack,
      });
    });
  },
  makeMove: function(auth, game, body) {
    let path = `/games/${game}/move`;
    return this.request(`POST`, path, auth, body).then(game => {});
  },
}


export default apiRequest;
