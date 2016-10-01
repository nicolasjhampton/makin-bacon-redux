"use strict";

import React, {Component} from 'react';
import GameCarousel from '../state_components/GameCarousel.jsx';
import CreateGame from './CreateGame.jsx';

const Dashboard = (props) => {
  return (
    <div className="card-deck">
      <CreateGame
        headerContainer={props.headerContainer}
        headerControl={props.showDashboard}/>
      <GameCarousel
        ioMgr={props.ioMgr}
        auth={props.auth}
        apiRequest={props.apiRequest}
        headerContainer={props.headerContainer}/>
    </div>
  );
}


Dashboard.PropTypes = {
  ioMgr: React.PropTypes.object.isRequired,
  apiRequest: React.PropTypes.object.isRequired,
  auth: React.PropTypes.string.isRequired,
  showDashboard: React.PropTypes.func.isRequired,
  headerContainer: React.PropTypes.bool.isRequired,
}


export default Dashboard;
