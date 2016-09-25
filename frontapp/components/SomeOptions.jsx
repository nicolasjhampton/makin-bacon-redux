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
    this.props.submitOption(this.state.option);
  }

  onOptionChange = (e) => {
    console.log({ id: e.target.value, type: this.props.type, });
    this.setState({option: { id: e.target.value, type: this.props.type, }});
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


// var Options = React.createClass({
//   propTypes: {
//     type: React.PropTypes.string.isRequired,
//     submitOption: React.PropTypes.func.isRequired,
//     options: React.PropTypes.array.isRequired,
//     // loaded: React.PropTypes.bool.isRequired,
//   },
//   getInitialState: function() {
//     // return {
//     //   option: "id=" + this.props.options[0].moviedb_id + "&type=" + this.props.type
//     // };
//     return {
//       option: {
//         id: this.props.options[0].moviedb_id,
//         type: this.props.type,
//       }
//     };
//   },
//   onSubmit: function(e) {
//     e.preventDefault();
//     var that = this;
//     this.props.submitOption(this.state.option);
//   },
//   onOptionChange: function(e) {
//     console.log({ id: e.target.value, type: this.props.type, });
//     this.setState({option: { id: e.target.value, type: this.props.type, }});
//   },
//   render: function() {
//     var type = this.props.type;
//     return (
//       <div className="col-md-12 container-fluid">
//         <form onSubmit={this.onSubmit}>
//           <div className="form-group">
//             <select className="form-control" onChange={this.onOptionChange}>
//               {this.props.options.map(function(option, index) {
//                 //var value = { id: option.moviedb_id, type: type };
//                 return (
//                   <option
//                     key={index}
//                     value={option.moviedb_id}>
//                     {option.name}
//                   </option>
//                 );
//               })}
//             </select>
//             <input className="form-control" type="submit" value="Submit Move" />
//           </div>
//         </form>
//       </div>
//     );
//   }
// });


export default Options;
