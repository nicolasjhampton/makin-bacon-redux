"use strict";

import React, {Component} from 'react';

class LoggedOut extends Component {

  authorize() {
    if(this.context.authorization) this.context.router.replace(`/profile/${this.context.currentUser}`);
  }

  static contextTypes = {
    submit: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.string,
    authorization: React.PropTypes.string,
    router: React.PropTypes.object,
  }

}

export default LoggedOut;
