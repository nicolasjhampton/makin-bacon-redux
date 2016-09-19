"use strict";

import React, {Component} from 'react';
import Field from './Field.jsx';

const StringField = props => {
  return (
    <Field
      id={props.id}
      type="text"
      state={props.state}/>
  );
}

StringField.PropTypes = {
  id: React.PropTypes.string.isRequired,
  state: React.PropTypes.func.isRequired,
}

export default StringField;
