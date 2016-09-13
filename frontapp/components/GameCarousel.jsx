"use strict";

import React from 'react';
import Game from './Game.jsx';


function Arrow(props) {
  var show = props.headerContainer ? "" : " hidden-xl-down";
  return (
    <div className={"col-md-1 col-xs-12 card card-inverse media" + show}>
      <div className="media-middle">
            <button
              onClick={props.action(-1)}
              className="arrow btn btn-success col-xs-12">
              {"\u2b45"}
            </button>
      </div>
      <div className="media-middle">
          <button
            onClick={props.action(1)}
            className="arrow btn btn-success col-xs-12">
            {"\u2b46"}
          </button>
      </div>
    </div>
  );
}

Arrow.PropTypes = {
  action: React.PropTypes.func.isRequired,
  headerContainer: React.PropTypes.bool.isRequired,
};

function GameCarousel(props) {
  var sizing = props.headerContainer ? " extend" : " shrink";
  var show = props.headerContainer ? "" : " hidden-xl-down";
  return (
    <div className={"container-fluid col-xs-12 col-md-10" + sizing}>
      <div className="row">
        <Arrow headerContainer={props.headerContainer} action={props.action}/>
        <div className={"col-xs-12 col-md-11 card container-fluid" + show}>
          <div className="row">
            {props.games.map((game, index) => {
              return (
                <Game
                  key={index}
                  gid={game._id}
                  players={game.players}
                  show={game.show}
                  join={props.join}/>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


GameCarousel.PropTypes = {
  games: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,
  join: React.PropTypes.func.isRequired,
  headerContainer: React.PropTypes.bool.isRequired,
};

export default GameCarousel;
