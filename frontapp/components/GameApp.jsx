"use strict";

import React, {Component} from 'react';
import {Link} from 'react-router';
import apiRequest from '../api/api_request.jsx';
import NavLink from './NavLink.jsx';
import authStore from '../authorize/auth_store.jsx';

// const apiRequest = (context, path, auth, body, callback) => {
//   let req = new XMLHttpRequest();
//   req.open("POST", `http://localhost:3000/api${path}`);
//   req.setRequestHeader("authorization", auth);
//   req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   req.addEventListener("load", callback);
//   console.log(req);
//   req.send(body);
// }

// import {Link} from 'react-router';
//
// const NavLink = props => (
//     <Link {...props} activeStyle={{ color: 'white' }}/>
// );

class GameApp extends Component {

  state = authStore() || {};

  static contextTypes = {
    router: React.PropTypes.object,
  }

  static childContextTypes = {
    submit: React.PropTypes.func,
    authorization: React.PropTypes.string,
    currentUser: React.PropTypes.string,
  };

  getChildContext() {
    return {
      submit: this.submit(this),
      authorization: this.state.authorization,
      currentUser: this.state.currentUser,
    };
  }

  submit(that) {
    return function(obj) {
      let authorization = `Basic ${btoa(`${obj.username}:${obj.password}`)}`;
      let path = !obj.email ? '/login' : '';
      delete obj.toggle; // unneeded in the request
      apiRequest(null, `/players${path}`, authorization, obj, function() {
        if(this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(this.responseText);
          let currentUser = data.username;
          window[obj.storage].baconAuth = authorization;
          window[obj.storage].baconUser = currentUser;
          that.setState({ authorization, currentUser });
          that.context.router.replace({
            pathname: `/profile/${data.username}`,
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-dark bg-primary">
            <Link
              className="navbar-brand"
              activeStyle={{ color: 'white' }}
              to="home">Makin Bacon</Link>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                {
                  this.state.authorization ?
                  <NavLink to={`profile/${this.state.currentUser}`}>Profile</NavLink>
                  :
                  <NavLink to="login">Login</NavLink>
                }
              </li>
              <li className="nav-item">
                {
                  this.state.authorization ?
                  <NavLink to="game">Game</NavLink>
                  :
                  <NavLink to="register">Register</NavLink>
                }
              </li>
                {
                  this.state.authorization ?
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      >Logout</NavLink>
                  </li>
                  :
                  ""
                }
            </ul>
          </nav>
        </div>
        <div className="row">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default GameApp;
