"use strict";

import React, {Component} from 'react';
import StringField from './StringField.jsx';
import Field from './Field.jsx';


class Register extends Component {

  static propTypes = {
    submit: React.PropTypes.func.isRequired,
  }

  // this replaces 'getInitialState'
  state = { username: "", password: "", email: "", confirm: "",}

  onSubmit = (e) => {
    e.preventDefault();
    this.props.submit(this.state);
  }

  onChange = (e) => {
    this.setState({[e.target.id]: e.target.value});
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit} className="col-md-6 col-xs-12 offset-md-3">
          <StringField id="username" state={this.onChange}/>
          <StringField id="password" state={this.onChange}/>
          <StringField id="confirm" state={this.onChange}/>
          <Field id="email" type="email" state={this.onChange}/>
          <div className="form-group">
            <input
              className="form-control btn btn-primary"
              type="submit"
              value="Register"/>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
