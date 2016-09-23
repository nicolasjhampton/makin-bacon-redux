"use strict";

import React, {Component} from 'react';


class Profile extends Component {

  componentWillMount() {

  }

  render() {
    let authMgr = this.props.authMgr;
    return (
      <div>
        <p>This is {authMgr.getAuth().currentUser} profile page</p>
      </div>
    );
  }
}





export default Profile;
