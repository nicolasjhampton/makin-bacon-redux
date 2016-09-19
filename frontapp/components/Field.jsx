"use strict";

import React, {Component} from 'react';

const Field = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.id}</label>
      <input
        type={props.type}
        className="form-control"
        id={props.id}
        onChange={props.state}
        placeholder={`Enter ${props.id}`}/>
    </div>
  );
}

Field.PropTypes = {
  id: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  state: React.PropTypes.func.isRequired,
}

export default Field;
