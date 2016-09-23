"use strict";

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import StringField from './StringField.jsx';

class Login extends Component {

  // this replaces 'getInitialState'
  state = {
    username: "",
    password: "",
    storage: true,
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.authMgr.login(this.state, auth => {
      this.props.router.replace({
        pathname: `/profile/${auth.username}`,
      });
    });
  }

  onChange = (e) => {
    let id = e.target.id;
    let value;
    if(e.target.id == "storage")  {
      value = !this.state.storage;
    } else {
      value = e.target.value;
    }
    this.setState({[id]: value });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit} className="col-md-6 col-xs-12 offset-md-3">
          <StringField id="username" state={this.onChange}/>
          <StringField id="password" type="password" state={this.onChange}/>
          <div>
            <input
              type="checkbox"
              id="storage"
              onChange={this.onChange}
              placeholder={`Keep me logged in!`}/>
            <label
              htmlFor="storage">
              Keep me logged in!
            </label>
          </div>
          <div className="form-group">
            <input
              className="form-control btn btn-primary"
              type="submit"
              value="Login"/>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
