"use strict";

import React from 'react';
import {Link} from 'react-router';

const GameList = props => {
  let show = props.show ? "" : "hidden-xl-down";
  let display = props.bg ? "card-primary" : "";
  return (
    <div className={`extend col-md-4 col-xs-12 card card-inverse ${display}`}>
      <Link className="nav-link card-primary gamelink" to={`/games/${props.gid}`}>
        <div className="custom-card-block">
          <div className="card-blockquote">
            {props.players.map((player, index) => {
              return (
                <p className="gametext" key={index}>{player.username}</p>
              );
            })}
          </div>
        </div>
      </Link>
    </div>
  );
}

// <h6 className="text-muted">{props.gid}</h6>

GameList.PropTypes = {
  gid: React.PropTypes.string,
  players: React.PropTypes.arrayOf(React.PropTypes.shape({
    _id: React.PropTypes.string,
    username: React.PropTypes.string,
  })),
  bg: React.PropTypes.bool.isRequired,
};

//

export default GameList;
