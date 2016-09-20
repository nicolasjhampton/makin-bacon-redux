"use strict";

import React, {Component} from 'react';
import LoggedIn from '../authorize/LoggedIn.jsx';


class Profile extends LoggedIn {

  componentWillMount() {
    this.authorize();
    // var that = this;
    // var options = {'sync disconnect on unload':true};
    // this.socket = this.props.io();
    // this.socket.on('games', (games) => {
    //   this.setState({ games: games, loaded: true });
    //   this.rollCarousel(0)();
    // });
    // request(this, "GET", "/games", function(context) {
    //   return function() {
    //     console.log(JSON.parse(this.responseText));
    //     var games = JSON.parse(this.responseText);
    //
    //     context.setState({
    //       games: games,
    //       loaded: true,
    //     });
    //     context.rollCarousel(0)();
    //   }
    // });
  }

  render() {
    return (
      <div>
        <p>This is {`${this.context.currentUser}\'s`} profile page</p>
      </div>
    );
  }
}





export default Profile;
