"use strict";

import React from 'react';

function GameOption(props) {
  return (
    <option value="moviedb_id">{props}</option>
  );
}

GameOption.PropTypes = {

};

var Options = React.createClass({
  propTypes: {

  },
  render: function() {
    return (
      <div id="options">
        <select id="currentOptions" name="currentOptions">
          <GameOption />
        </select>
      </div>
    );
  }
});


export default Options;
