"use strict";

import React from 'react';

function StackItem(props) {
  return (
    <div>
      <h1>{props}</h1>
      <p>{props}</p>
      <img src={props}/>
    </div>
  );
}

StackItem.PropTypes = {

};

var Stack = React.createClass({
  propTypes: {

  },
  render: function() {
    return (
      <div id="stack">
        <StackItem />
      </div>
    );
  }
});

export default Stack;
