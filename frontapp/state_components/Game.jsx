"use strict";

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import Stack from '../dummy_components/Stack.jsx';
import Options from '../form_components/SomeOptions.jsx';

class Game extends Component {

  state = {
    stack: [],
    options: [],
    optionType: '',
  }

  componentWillMount = () => {
    let auth = this.props.authMgr.getAuth().authorization;
    let gameId = this.props.apiRequest.id;
    if(gameId === `create`) {
      this.props.apiRequest.createGame(this, auth, id => {
        this.props.router.replace(`/games/${id}`);
      });
    } else {
      this.props.apiRequest.joinGame(this, auth, gameId);
    }
  }

  submitOption = (option) => {
    let auth = this.props.authMgr.getAuth().authorization;
    let id = this.props.apiRequest.id;
    this.props.apiRequest.makeMove(auth, id, option);
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
