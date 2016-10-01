"use strict";

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import GameList from '../dummy_components/GameList.jsx';


class Profile extends Component {

  state = {
    games: [],
  }

  componentWillMount() {
    let auth = this.props.authMgr.getAuth().authorization;
    this.props.apiRequest.getGames(this, auth);
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
                return (
                  <GameList
                    key={index}
                    gid={game._id}
                    players={game.players}
                    bg={false}/>
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
