"use strict";

import React from 'react';

// function GameOption(props) {
//   return (
//     <option value="moviedb_id">{props}</option>
//   );
// }
//
// function Options(props) {
//
// }
//
// Options.PropTypes = {
//
// };

var Options = React.createClass({
  propTypes: {
    submitOption: React.PropTypes.func.isRequired,
    options: React.PropTypes.array.isRequired,
    loaded: false,
  },
  getInitialState: function() {
    return {
      option: this.props.options[0].moviedb_id,
    };
  },
  // componentDidMount: function() {
  //   if(this.props.loaded) {
  //     var that = this;
  //     this.setState({ option: that.props.options[0].moviedb_id });
  //   }
  // },
  onSubmit: function(e) {
    e.preventDefault();
    var that = this;
    this.props.submitOption(this.state.option);
    //this.setState({ option: that.props.options[0].moviedb_id });
  },
  onOptionChange: function(e) {
    console.log(e.target.value);
    this.setState({option: e.target.value});
  },
  render: function() {
    return (
      <div className="col-md-4 container-fluid">
        <form onSubmit={this.onSubmit}>
          <div>
            <select onChange={this.onOptionChange}>
              {this.props.options.map(function(option) {
                return (
                  <option value={option.moviedb_id}>{option.name}</option>
                );
              })}
            </select>
            <input type="submit" value="Submit Move" />
          </div>
        </form>
      </div>
    );
  }
});


export default Options;
