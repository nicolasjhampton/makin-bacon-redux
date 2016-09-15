"use strict";

import React from 'react';
import Game from './Game.jsx';
import GameCarousel from './GameCarousel.jsx';
import CreateGame from './CreateGame.jsx';
import Options from './SomeOptions.jsx';
import Stack from './Stack.jsx';

function request(context, method, route, callback, body) {
  var req = new XMLHttpRequest();
  req.open(method, "http://localhost:3000/api" + route);
  req.setRequestHeader("Authorization", context.state.auth);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.addEventListener("load", callback(context));
  (body) ? req.send(body) : req.send();
}

function reqCallback(context) {
  return function() {
    console.log(JSON.parse(this.responseText));
    var data = JSON.parse(this.responseText);
    context.gameSocket = context.props.io('/' + data._id);
    context.gameSocket.on("move", function(move) {
      context.state.stack.unshift(move.stack);
      var options = move.currentOptions;
      console.log(move.stack);
      console.log(context.state.stack);
      var optionType = context.state.stack[0].entry.type == "actor" ? "movie" : "actor"
      context.setState({ stack: context.state.stack, options: options, optionType: optionType})
    });

    context.setState({
      optionType: data.stack[0].entry.type == "actor" ? "movie" : "actor",
      gameID: data._id,
      options: data.currentOptions,
      players: data.players,
      stack: data.stack,
      gameLoaded: true,
    });
  }
}

//<Players />
var Games = React.createClass({
  propTypes: {
    io: React.PropTypes.func,
  },
  getInitialState: function() {
    return {
      auth: "Basic QHNhbWpvbmVzOnBhc3N3b3Jk",
      loaded: false,
      offset: 0,
      games: [],
      gameID: undefined,
      options: [],
      players: [],
      stack: [],
      headerContainer: true,
      gameLoaded: false,
      optionType: undefined,
    }
  },
  componentDidMount: function() {
    if(!this.state.loaded) {
      var that = this;
      var options = {'sync disconnect on unload':true};
      this.socket = this.props.io();
      this.socket.on('games', (games) => {
        this.setState({ games: games, loaded: true });
        this.rollCarousel(0)();
      });
      request(this, "GET", "/games", function(context) {
        return function() {
          console.log(JSON.parse(this.responseText));
          var games = JSON.parse(this.responseText);

          context.setState({
            games: games,
            loaded: true,
          });
          context.rollCarousel(0)();
        }
      });
    }
  },
  rollCarousel: function(delta) {
    return function () {
      this.state.offset += delta;
      var games = this.state.games.map((game, index) => {
        game.show = index <= this.state.offset + 2 && index >= this.state.offset;
        return game;
      });
      this.setState({games: games, offset: this.state.offset});
    }.bind(this);
  },
  showHeader: function() {
    this.state.headerContainer = !this.state.headerContainer;
    this.setState({ headerContainer : this.state.headerContainer });
  },
  createNewGame: function() {
    var route = "/games";
    this.setState({ gameLoaded : false });
    request(this, "POST", route, reqCallback);
  },
  joinGame: function(id) {
    var that = this;
    var route = "/games/" + id;
    var body = "previousGame=" + that.state.gameID;

    return function() {
      that.setState({ gameLoaded : false });

      request(that, "POST", route, reqCallback, body);

    }
  },
  submitOption: function(option) {
    var that = this;
    var route = "/games/" + this.state.gameID + "/move";
    // that.gameSocket.on("move", function(move) {
    //   var stack = that.state.stack.unshift(move.stack);
    //   var options = move.currentOptions;
    //   console.log(move);
    //   that.setState({ stack: stack, options: options})
    // });
    request(that, "POST", route, function(context) {
      return function() {

      }
    }, option);
  },
  render: function() {
    var type;
    var sizing = this.state.headerContainer ? " extend" : " shrink";
    return (
      <div className="container-fluid">
        <div className="row">
          <div className={"card-deck-wrapper" + sizing}>
            <div className="card-deck">
              <CreateGame
                headerContainer={this.state.headerContainer}
                headerControl={this.showHeader}
                action={this.createNewGame}/>
              <GameCarousel
                headerContainer={this.state.headerContainer}
                action={this.rollCarousel}
                join={this.joinGame}
                games={this.state.games}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container-fluid col-md-3">
            <div className="card-deck">
              {this.state.gameLoaded ?
                <Options
                  type={this.state.optionType}
                  submitOption={this.submitOption}
                  options={this.state.options}/>
                : null}
            </div>
          </div>
          <div className="container-fluid col-md-6">
              <Stack stack={this.state.stack}/>
          </div>
        </div>
      </div>
    );
  }
});


export default Games;
