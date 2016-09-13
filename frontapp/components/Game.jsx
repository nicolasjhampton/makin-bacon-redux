"use strict";

import React from 'react';


function Game(props) {
  var display = "col-md-4 col-xs-12 card card-primary card-inverse";
  display += props.show ? "" : " hidden-xl-down";
  return (
    <div className={"extend " + display}>
      <div className="card-block">
        <button className="btn btn-primary" onClick={props.join(props.gid)}>Join</button>
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
  join: React.PropTypes.func.isRequired,
};

export default Game;
