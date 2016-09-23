"use strict";

import React, {Component} from 'react';
import {Route} from 'react-router';

class AuthManager {

  constructor(config) {
    this.store = config.store || window;
    this.primaryStoreKey = config.primaryStoreKey || "sessionStorage";
    this.secondaryStoreKey = config.secondaryStoreKey || "localStorage";
    this.storage = this.primaryStoreKey;
    this.tokenProp = config.tokenProp || "authorization";
    this.userProp = config.userProp || "user";
    this.tokenStrategy = config.tokenStrategy;
    this.getUser = config.getUser;
    this.createUser = config.createUser;
  }

  getAuth() {
    return {
      authorization: this.store[this.storage].getItem(this.tokenProp) || '',
      currentUser: this.store[this.storage].getItem(this.userProp) || '',
    }
  }

  setAuth = (token, user, storage) => {
    this.storage = (storage) ? this.primaryStoreKey : this.secondaryStoreKey;
    this.store[this.storage].setItem(this.tokenProp, token);
    this.store[this.storage].setItem(this.userProp, user);
  }

  deleteAuth = () => {
    this.store[this.storage].setItem(this.tokenProp, '');
    this.store[this.storage].setItem(this.userProp, '');
    this.storage = this.primaryStoreKey;
  };

  attachAuthMgr = (Component, props) => {
    props.authMgr = this;
    return <Component {...props}/>
  }

  initAuth = (nextState, replace) => {
    if(this.store[this.primaryStoreKey].hasOwnProperty(this.tokenProp)
       && this.store[this.primaryStoreKey].hasOwnProperty(this.userProp)) {
      this.storage = this.primaryStoreKey;
    } else if (this.store[this.secondaryStoreKey].hasOwnProperty(this.tokenProp)
       && this.store[this.secondaryStoreKey].hasOwnProperty(this.userProp)) {
      this.storage = this.secondaryStoreKey;
    } else {
      this.storage = this.primaryStoreKey;
      this.store[this.storage].setItem(this.tokenProp, '');
      this.store[this.storage].setItem(this.userProp, '');
    }
  }

  loggedIn = (nextState, replace) => {
    let auth = this.getAuth();
    if(!auth.authorization) replace('/login');
  };

  loggedOut = (nextState, replace) => {
    let auth = this.getAuth();
    if(auth.authorization) replace(`/profile/${auth.currentUser}`);
  };

  login(auth, callback) {
    let token = this.tokenStrategy(auth);
    this.getUser(token).then((data) => {
      this.setAuth(token, data.username, auth.storage);
      return callback(data);
    });
  }

  register(profile, callback) {
    let token = this.tokenStrategy(profile);
    this.createUser(profile).then((data) => {
      this.setAuth(token, data.username, profile.storage);
      return callback(data);
    });
  }
}

export default AuthManager;
