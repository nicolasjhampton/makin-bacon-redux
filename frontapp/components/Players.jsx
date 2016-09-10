"use strict";

import React from 'react';


function Player(props) {
  return (
    <div>
      <p>{props}</p>
    </div>
  );
}

Player.PropTypes = {

};

var Players = React.createClass({
  propTypes: {

  },
  render: function() {
    return (
      <div id="players">
        <Player />
      </div>
    );
  }
});


export default Players;
