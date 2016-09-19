"use strict";

import React, {Component} from 'react';
import StringField from './StringField.jsx';


// we need to set the headers for authorization
// var authString = btoa(email + ':' + pass);
// headers['Authorization'] = 'Basic ' + authString;

// // this replaces 'componentWillMount'
// constructor(props) {
//   super(props);
//   // do your 'will mount' stuff (like api calls) here
// }
//
// // This replaces 'getDefaultProps'
// static defaultProps = {
//
// }


class Login extends Component {

  static propTypes = {
    submit: React.PropTypes.func.isRequired,
  }

  // this replaces 'getInitialState'
  state = { username: "", password: "", }

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
