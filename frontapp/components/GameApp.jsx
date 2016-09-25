"use strict";

import React from 'react';
import {Link} from 'react-router';
import AuthNavMenuItem from './AuthNavMenuItem.jsx';

const GameApp = props => {
  var obj = props.authMgr.getAuth();
  var profilePath = `/profile/${obj.currentUser}`;
  var authorized = obj.authorization ? true : false;
  return (
    <div className="container">
      <div className="row">
        <nav className="navbar navbar-dark bg-primary">
          <Link
            className="navbar-brand"
            activeStyle={{ color: 'white' }}
            to="home">Makin Bacon</Link>
          <ul className="nav navbar-nav pull-xs-right">
            <AuthNavMenuItem
              authorized={authorized}
              authRoute={"/games"}
              authRouteName={"Games"}
              unAuthRoute={"/"}
              unAuthRouteName={"Home"} />
            <AuthNavMenuItem
              authorized={authorized}
              authRoute={profilePath}
              authRouteName={"Profile"}
              unAuthRoute={"/register"}
              unAuthRouteName={"Register"} />
            <AuthNavMenuItem
              authorized={authorized}
              authRoute={"/login"}
              authRouteName={"Logout"}
              unAuthRoute={"/login"}
              unAuthRouteName={"Login"}
              onClick={props.authMgr.deleteAuth} />
          </ul>
        </nav>
      </div>
      <div className="row">
        {props.children}
      </div>
    </div>
  );
}


export default GameApp;
