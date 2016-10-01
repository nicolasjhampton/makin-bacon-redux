"use strict";

import React, {Component} from 'react';

class Options extends Component {

  state = {
    id: [],
    type: '',
  }

  onSubmit = (e) => {
    e.preventDefault();
    var that = this;
    this.props.submitOption(this.state);
  }

  onOptionChange = (e) => {
    console.log({ id: e.target.value, type: this.props.type, });
    this.setState({ id: e.target.value, type: this.props.type, });
  }

  render = () => {
    var type = this.props.type;
    return (
      <div className="col-md-12 container-fluid">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <select className="form-control" onChange={this.onOptionChange}>
              {this.props.options.map(function(option, index) {
                //var value = { id: option.moviedb_id, type: type };
                return (
                  <option
                    key={index}
                    value={option.moviedb_id}>
                    {option.name}
                  </option>
                );
              })}
            </select>
            <input className="form-control" type="submit" value="Submit Move" />
          </div>
        </form>
      </div>
    );
  }

}


export default Options;
