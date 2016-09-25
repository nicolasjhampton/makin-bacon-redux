"use strict";

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import GameCarousel from './GameCarousel.jsx';
import Dashboard from './Dashboard.jsx';
import CreateGame from './CreateGame.jsx';
import Options from './SomeOptions.jsx';
import Stack from './Stack.jsx';

class Games extends Component {

  state = {
    auth: this.props.authMgr.getAuth().authorization,
    gameID: undefined,
    options: [],
    players: [],
    stack: [],
    headerContainer: true,
    optionType: undefined,
  }

  componentWillMount = () => {

  }

  createNewGame = () => {
    this.props.apiRequest.createGame(this.state.auth).then(data => {
      //reqCallback
      this.gameSocket = this.props.io('/' + data._id);
      this.gameSocket.on("move", (move) => {
        this.state.stack.unshift(move.stack);
        var options = move.currentOptions;
        var optionType = this.state.stack[0].entry.type == "actor" ? "movie" : "actor";
        this.setState({ stack: this.state.stack, options: options, optionType: optionType});
      });

      this.setState({
        optionType: data.stack[0].entry.type == "actor" ? "movie" : "actor",
        gameID: data._id,
        options: data.currentOptions,
        players: data.players,
        stack: data.stack,
      });

      // this.rollCarousel(0)();
    });
  }

  joinGame = (id) => {
    var that = this;

    return () => {
      this.props.apiRequest.joinGame(this.state.auth, id, this.state.gameID)
                .then((data) => {
                  //reqCallback
                  this.gameSocket = this.props.route.io('/' + data._id);
                  this.gameSocket.on("move", (move) => {
                    this.state.stack.unshift(move.stack);
                    var options = move.currentOptions;
                    var optionType = this.state.stack[0].entry.type == "actor" ? "movie" : "actor";
                    this.setState({ stack: this.state.stack, options: options, optionType: optionType});
                  });

                  this.setState({
                    optionType: data.stack[0].entry.type == "actor" ? "movie" : "actor",
                    gameID: data._id,
                    options: data.currentOptions,
                    players: data.players,
                    stack: data.stack,
                  });

                });
    }
  }

  submitOption = (option) => {
    this.props.apiRequest.makeMove(this.state.auth, this.state.gameID, option)
              .then(game => {});
  }

  render = () => {
    var type;
    var sizing = this.state.headerContainer ? " extend" : " shrink";
    return (
      <div className="container-fluid">
        <div className="row">
          <div className={"card-deck-wrapper" + sizing}>
            <Dashboard
              createGame={this.createNewGame}
              api={this.props.apiRequest}
              io={this.props.io}
              join={this.joinGame}
              auth={this.state.auth}/>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}


// headerContainer={this.state.headerContainer}
// <div className="row">
//   <div className="container-fluid col-md-3">
//     <div className="card-deck">
//       {this.state.gameLoaded ?
//         <Options
//           type={this.state.optionType}
//           submitOption={this.submitOption}
//           options={this.state.options}/>
//         : null}
//     </div>
//   </div>
//   <div className="container-fluid col-md-6">
//     <Stack stack={this.state.stack}/>
//   </div>
// </div>


export default withRouter(Games);
