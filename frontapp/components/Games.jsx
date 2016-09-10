"use strict";

import React from 'react';


function Game(props) {
  return (
    <div>
      <h3>{props.gid}</h3>
      <div>
        {props.players.map((player, index) => {
          return (
            <p key={index}>{player.username}</p>
          );
        })}
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
    }
  },
  componentDidMount: function() {
    //if(typeof this.props.io == 'function'){
      this.socket = this.props.io('http://localhost:3000');
      this.socket.on('games', (games) => {
        console.log(games);
        this.setState({ games: games });
      });
    //}
  },
  render: function() {
    return (
      <div>
        {this.state.games.map((game, index) => {
          return (
            <Game
              key={index}
              gid={game._id}
              players={game.players}/>
          );
        })}
      </div>
    );
  }
});


export default Games;
