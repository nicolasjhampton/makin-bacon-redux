"use strict";

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import GameCarousel from './GameCarousel.jsx';
import CreateGame from './CreateGame.jsx';


class Dashboard extends Component {

  state = {
    headerContainer: true,
  };

  static defaultProps = {
    headerContainer: true,
  }

  static propTypes = {
    io: React.PropTypes.func.isRequired,
    api: React.PropTypes.object.isRequired,
    auth: React.PropTypes.string.isRequired,
    createGame: React.PropTypes.func.isRequired,
    join: React.PropTypes.func.isRequired,
  }

  showHeader = () => {
    this.state.headerContainer = !this.state.headerContainer;
    this.setState({ headerContainer : this.state.headerContainer });
  }

  render() {
    return (
      <div className="card-deck">
        <CreateGame
          headerContainer={this.state.headerContainer}
          headerControl={this.showHeader}
          action={this.props.createGame}/>
        <GameCarousel
          io={this.props.io}
          auth={this.props.auth}
          apiRequest={this.props.api}
          headerContainer={this.state.headerContainer}
          join={this.props.join}/>
      </div>
    );
  }
}


export default withRouter(Dashboard);
