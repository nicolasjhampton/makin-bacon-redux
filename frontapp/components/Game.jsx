"use strict";

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import Stack from './Stack.jsx';
import Options from './SomeOptions.jsx';

class Game extends Component {

  state = {
    stack: [],
    options: [],
    optionType: '',
    //players: [],
  }
  // Needs work
  componentWillMount = () => {
    let auth = this.props.authMgr.getAuth().authorization;
    console.log(this.props.sockets);

    // joining game over and over here!
    this.props
        .apiRequest
        .joinGame(auth, this.props.sockets.game.id, null)
        .then(data => {
          //reqCallback
          this.setState({
            optionType: data.stack[0].entry.type == "actor" ? "movie" : "actor",
            //gameID: data._id,
            options: data.currentOptions,
            //players: data.players,
            stack: data.stack,
          });
          // console.log(data);
          // this.props.sockets.game.socket = io(`/${this.props.sockets.game.id}`);
          // this.props.sockets.game.socket.on("move", (move) => {
          //   this.state.stack.unshift(move.stack);
          //   var options = move.currentOptions;
          //   var optionType = this.state.stack[0].entry.type == "actor" ? "movie" : "actor";
          //   this.setState({ stack: this.state.stack, options: options, optionType: optionType});
          // });


        });
  }

  submitOption = (option) => {
    let auth = this.props.authMgr.getAuth().authorization;
    let id = this.props.sockets.game.id;
    this.props.apiRequest.makeMove(auth, id, option)
              .then(game => {});
  }

  render() {
    return (
      <div className="row">
        <div className="container-fluid col-md-3">
          <div className="card-deck">
            <Options
              type={this.state.optionType}
              submitOption={this.submitOption}
              options={this.state.options}/>
          </div>
        </div>
        <div className="container-fluid col-md-6">
          <Stack stack={this.state.stack}/>
        </div>
      </div>
    );
  }
}

export default withRouter(Game);
