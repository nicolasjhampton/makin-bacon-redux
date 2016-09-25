"use strict";

import React, {Component} from 'react';
import GameList from './GameList.jsx';
import Arrows from './Arrows.jsx';


class GameCarousel extends Component {

  state = {
    games: [],
  }

  componentDidMount() {
    var options = {'sync disconnect on unload':true};

    this.socket = this.props.io();
    this.socket.on('games', (games) => {
      this.setState({ games: games });
    });

    this.props.apiRequest.getGames(this.props.auth).then(games => {
      this.setState({ games: games });
    });
  }


  rollCarousel = (delta) => {
    return () => {
      // I've got a ball and three cups
      let games = this.state.games.slice(0);
      // This cup has the ball, now...
      let scroll = (delta == 1) ? ['shift', 'push'] : ['pop', 'unshift'];
      // watch closely...
      games[scroll[1]](games[scroll[0]]());

      //this.props.games = games;
      // alright. Where's the ball?
      this.setState({ games: games });
    }
  }

  render = () => {
    let sizing = this.props.headerContainer ? " extend" : " shrink";
    let show = this.props.headerContainer ? "" : " hidden-xl-down";
    return (
      <div className={"container-fluid col-xs-12 col-md-10" + sizing}>
        <div className="row">
          <Arrows headerContainer={this.props.headerContainer} action={this.rollCarousel}/>
          <div className={"col-xs-12 col-md-11 card container-fluid" + show}>
            <div className="row">
              {this.state.games.map((game, index) => {
                if(index < 3) {
                  return (
                    <GameList
                      key={index}
                      gid={game._id}
                      players={game.players}
                      join={this.props.join}/>
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

//show={game.show}


GameCarousel.PropTypes = {
  io: React.PropTypes.func.isRequired,
  auth: React.PropTypes.string.isRequired,
  join: React.PropTypes.func.isRequired,
  headerContainer: React.PropTypes.bool.isRequired,
  apiRequest: React.PropTypes.object.isRequired,
};


export default GameCarousel;
