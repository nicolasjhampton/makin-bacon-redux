"use strict";

import React from 'react';
import {Link} from 'react-router';


const AuthNavMenuItem = (props) => (
  <li className="nav-item">
    {
      props.authorized ?
      <Link
        onClick={props.onClick}
        className="nav-link"
        activeStyle={{ color: 'white' }}
        to={props.authRoute}>
        {props.authRouteName}
      </Link>
      :
      <Link
        onClick={props.onClick}
        className="nav-link"
        activeStyle={{ color: 'white' }}
        to={props.unAuthRoute}>
        {props.unAuthRouteName}
      </Link>
    }
  </li>
);

AuthNavMenuItem.propTypes = {
  authorized: React.PropTypes.bool.isRequired,
  authRoute: React.PropTypes.string.isRequired,
  authRouteName: React.PropTypes.string.isRequired,
  unAuthRoute: React.PropTypes.string.isRequired,
  unAuthRouteName: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default AuthNavMenuItem;
