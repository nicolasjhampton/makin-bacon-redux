"use strict";

import React from 'react';
import Game from './Game.jsx';
import GameCarousel from './GameCarousel.jsx';
import CreateGame from './CreateGame.jsx';
import Options from './SomeOptions.jsx';
import Stack from './Stack.jsx';

function request(context, route, callback, body) {
  var req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/api" + route);
  req.setRequestHeader("Authorization", context.state.auth);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.addEventListener("load", callback(context));
  req.send(body);

}

function reqCallback(context) {
  return function() {
    console.log(JSON.parse(this.responseText));
    var data = JSON.parse(this.responseText);

    context.socket.on("move", function(data) {
      context.setState({ gameLoaded : false });
      context.state.stack.unshift(data.stack);
      context.setState({ stack: context.state.stack, gameLoaded: true });
    });

    context.setState({
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
    // games: React.PropTypes.arrayOf(React.PropTypes.shape({
    //   _id: React.PropTypes.string,
    //   players: React.PropTypes.array
    // }))
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
    }
  },
  componentDidMount: function() {
    if(!this.state.loaded) {
      var options = {'sync disconnect on unload':true};
      this.socket = this.props.io('http://localhost:3000', options);
      this.socket.on('games', (games) => {
        games.map((game, index) => {
          game.show = index <= this.state.offset + 2 && index >= this.state.offset;
        });
        console.log(games);
        this.setState({ games: games, loaded: true });
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
    request(this, route, reqCallback);
  },
  joinGame: function(id) {
    var that = this;
    var route = "/games/" + id;
    var body = "previousGame=" + that.state.gameID;

    return function() {
      that.setState({ gameLoaded : false });
      request(that, route, reqCallback, body);
    }
  },
  submitOption: function(moviedb_id) {

  },
  render: function() {
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
          <div className="card-deck-wrapper">
            <div className="card-deck">
              {this.state.gameLoaded ?
                <Options
                  submitOption={this.submitOption}
                  options={this.state.options}/>
                : null}
              <Stack stack={this.state.stack}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


export default Games;
