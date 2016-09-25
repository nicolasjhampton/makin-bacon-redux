"use strict";

import React from 'react';
import {Link} from 'react-router';

const GameList = props => {
  let show = props.show ? "" : "hidden-xl-down";
  let display = `extend col-md-4 col-xs-12 card card-primary card-inverse`;
  return (
    <div className={display}>
      <div className="card-block">
        {
          props.join ?
          <Link className="nav-link" to={`/games/${props.gid}`}>
            Join
          </Link>
          :
          ''
        }
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

// <h6 className="text-muted">{props.gid}</h6>

GameList.PropTypes = {
  gid: React.PropTypes.string,
  players: React.PropTypes.arrayOf(React.PropTypes.shape({
    _id: React.PropTypes.string,
    username: React.PropTypes.string
  })),
  //show: React.PropTypes.bool.isRequired,
  join: React.PropTypes.func,
};

export default GameList;
