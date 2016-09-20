"use strict";

import React, {Component} from 'react';

class LoggedIn extends Component {

  authorize() {
    if(!this.context.authorization) this.context.router.push('/login');
  }

  static contextTypes = {
    submit: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.string,
    authorization: React.PropTypes.string,
    router: React.PropTypes.object,
  }

}

export default LoggedIn;
