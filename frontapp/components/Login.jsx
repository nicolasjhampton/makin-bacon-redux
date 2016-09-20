"use strict";

import React, {Component} from 'react';
import StringField from './StringField.jsx';
import LoggedOut from '../authorize/LoggedOut.jsx';


class Login extends LoggedOut {

  componentWillMount() {
    this.authorize();
  }

  // this replaces 'getInitialState'
  state = { username: "", password: "", storage: "sessionStorage", toggle: false }

  onSubmit = (e) => {
    e.preventDefault();
    this.context.submit(this.state);
  }

  onChange = (e) => {
    let id = e.target.id;
    let value;
    if(e.target.id == "storage")  {
      console.log(this.state.toggle);
      this.state.toggle = !this.state.toggle;
      console.log(this.state.toggle);
      value = this.state.toggle ? "localStorage" : "sessionStorage";
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
            <label htmlFor="storage">Keep me logged in!</label>
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

export default Login;
