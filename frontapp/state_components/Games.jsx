"use strict";

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import GameCarousel from './GameCarousel.jsx';
import Dashboard from '../dummy_components/Dashboard.jsx';
import CreateGame from '../dummy_components/CreateGame.jsx';
import Options from '../form_components/SomeOptions.jsx';
import Stack from '../dummy_components/Stack.jsx';

class Games extends Component {

  state = {
    headerContainer: true,
  }

  showDashboard = () => {
    this.state.headerContainer = !this.state.headerContainer;
    this.setState({ headerContainer : this.state.headerContainer });
  }

  createNewGame = () => {
    this.props.router.replace('/games/create');
  }

  render = () => {
    var auth = this.props.authMgr.getAuth().authorization;
    //var sizing = this.state.headerContainer ? " extend" : " shrink";
    return (
      <div className="container-fluid">
        <div className="row">
          <div className={"card-deck-wrapper option-level"}>
            <Dashboard
              headerContainer={this.state.headerContainer}
              showDashboard={this.showDashboard}
              apiRequest={this.props.apiRequest}
              ioMgr={this.props.ioMgr}
              auth={auth}/>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}


export default withRouter(Games);
