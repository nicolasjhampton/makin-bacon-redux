"use strict";

import React from 'react';
import GameList from './GameList.jsx';
import Arrows from './Arrows.jsx';

const GameCarousel = (props) => {
  let sizing = props.headerContainer ? " extend" : " shrink";
  let show = props.headerContainer ? "" : " hidden-xl-down";
  return (
    <div className={"container-fluid col-xs-12 col-md-10" + sizing}>
      <div className="row">
        <Arrow headerContainer={props.headerContainer} action={props.action}/>
        <div className={"col-xs-12 col-md-11 card container-fluid" + show}>
          <div className="row">
            {props.games.map((game, index) => {
              return (
                <GameList
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
