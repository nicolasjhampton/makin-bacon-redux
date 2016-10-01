"use strict";

import React, {Component} from 'react';
import GameList from '../dummy_components/GameList.jsx';
import Arrows from '../dummy_components/Arrows.jsx';


class GameCarousel extends Component {

  state = {
    games: [],
  }

  componentWillMount() {
    let auth = this.props.auth;
    this.props.apiRequest.getGames(this, auth);
  }


  rollCarousel = (delta) => {
    return () => {
      let games = this.state.games.slice(0); // I've got a ball and three cups
      let scroll = (delta == 1) ? ['shift', 'push'] : ['pop', 'unshift']; // This cup has the ball, now...
      games[scroll[1]](games[scroll[0]]()); // watch closely...
      this.setState({ games: games }); // alright. Where's the ball?
    }
  }

  render = () => {
    let sizing = this.props.headerContainer ? " extend" : " shrink";
    let show = this.props.headerContainer ? "" : " hidden-xl-down";
    return (
      <div className={"container-fluid card-primary option-level col-xs-12 col-md-10" + sizing}>
        <div className="row">
          <Arrows headerContainer={this.props.headerContainer} action={this.rollCarousel}/>
          <div className={"height col-xs-12 col-md-11 option-level card-primary card container-fluid" + show}>
            <div className="row">
              {this.state.games.map((game, index) => {
                if(index < 3) {
                  return (
                    <GameList
                      key={index}
                      gid={game._id}
                      players={game.players}
                      bg={true}/>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


GameCarousel.PropTypes = {
  ioMgr: React.PropTypes.func.isRequired,
  auth: React.PropTypes.string.isRequired,
  headerContainer: React.PropTypes.bool.isRequired,
  apiRequest: React.PropTypes.object.isRequired,
};


export default GameCarousel;
