"use strict";

import React from 'react';


function Game(props) {
  var display = "col-md-4 col-xs-12 card card-primary card-inverse";
  display += props.show ? "" : " hidden-xl-down";
  return (
    <div className={display}>
      <div className="card-block">
        <h6 className="text-muted">{props.gid}</h6>
        <div className="card-blockquote">
          {props.players.map((player, index) => {
            return (
              <p key={index}>{player.username}</p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Game.PropTypes = {
  gid: React.PropTypes.string,
  players: React.PropTypes.arrayOf(React.PropTypes.shape({
    _id: React.PropTypes.string,
    username: React.PropTypes.string
  })),
  show: React.PropTypes.bool.isRequired,
};

function Arrow(props) {
  return (
    <div className="col-md-1 col-xs-12 card card-inverse container-fluid">
      <div className="card-block row">
        <button
          onClick={props.action}
          className="btn btn-success col-xs-12 media-middle">
          { props.direction ? "\u2b46" : "\u2b45" }
        </button>
      </div>
    </div>
  );
}

Arrow.PropTypes = {
  direction: React.PropTypes.bool.isRequired,
  action: React.PropTypes.func.isRequired,
};

function GameCarousel(props) {
  return (
    <div className="container-fluid col-xs-12 col-md-10">
      <div className="row">
        <Arrow action={props.action(-1)} direction={false} />
        <div className="col-xs-12 col-md-10 card container-fluid">
          <div className="row">
            {props.games.map((game, index) => {
              return (
                <Game
                  key={index}
                  gid={game._id}
                  players={game.players}
                  show={game.show}/>
              );
            })}
          </div>
        </div>
        <Arrow action={props.action(1)} direction={true} />
      </div>
    </div>
  );
}
// hidden-xl-down applies to all but three games -- pagination

GameCarousel.PropTypes = {
  games: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,
};

function CreateGame(props) {
  return (
    <div className="col-md-2 col-xs-12 card card-primary card-inverse container-fluid">
      <div className="card-block row">
        <button
          type="button"
          className="btn btn-success col-xs-12 media-middle"
          onClick={props.action}>
            Create Game
          </button>
      </div>
    </div>
  );
}

CreateGame.PropTypes = {
  action: React.PropTypes.func.isRequired,
};

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
      games: [],
      offset: 0,
      loaded: false,
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
  createNewGame: function() {
    var req = new XMLHttpRequest();
    req.open("POST", "http://localhost:3000/api/games");
    req.setRequestHeader("Authorization", "Basic QHNhbWpvbmVzOnBhc3N3b3Jk");
    req.addEventListener("load", function() {
      console.log(JSON.parse(this.responseText));
    });
    req.send();
  },
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="card-deck-wrapper">
            <div className="card-deck">
              <CreateGame action={this.createNewGame}/>
              <GameCarousel action={this.rollCarousel} games={this.state.games}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


export default Games;
