"use strict";

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import GameList from './GameList.jsx';


class Profile extends Component {

  state = {
    games: [],
  }

  componentWillMount() {
    let auth = this.props.authMgr.getAuth().authorization;
    this.props.ioMgr.gameListStream(this);
    this.props.apiRequest.getGames(auth).then(games => {
      this.setState({ games: games });
    });
  }

  join = (id) => {
    return () => {
      this.socket.emit('disconnect');
      this.props.router.replace(`/games/${id}`);
    }
  }

  render() {
    let auth = this.props.authMgr.getAuth();
    console.log(auth.currentUser);
    return (
      <div className="container-fluid col-xs-12 col-md-12">
        <div className="row">
          <p>This is {auth.currentUser} profile page</p>
          <div className="container-fluid col-xs-12 col-md-12">
            <div className="row">
              {this.state.games.map((game, index) => {
                console.log(game.players);
                return game.players.some(player => player.username == auth.currentUser) ?
                (
                  <GameList
                    key={index}
                    gid={game._id}
                    players={game.players}/>
                )
                :
                (
                  <GameList
                    key={index}
                    gid={game._id}
                    players={game.players}
                    join={this.join}/>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}





export default withRouter(Profile);
