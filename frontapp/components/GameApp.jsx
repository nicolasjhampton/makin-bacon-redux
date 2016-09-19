"use strict";

import React, {Component} from 'react';
import {Link} from 'react-router';

const NavLink = (props) => (
    <Link {...props} activeStyle={{ color: 'white' }}/>
);

class GameApp extends Component {

  login = () => {

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-dark bg-primary">
            <NavLink className="navbar-brand" to="home">Makin Bacon</NavLink>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <NavLink className="nav-link" to="home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="register">Register</NavLink>
              </li>
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
