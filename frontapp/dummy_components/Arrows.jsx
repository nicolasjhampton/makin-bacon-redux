"use strict";

import React from 'react';


const Arrows = props => {
  let show = props.headerContainer ? "" : " hidden-xl-down";
  let display = `col-md-1 col-xs-12 card card-primary card-inverse media height ${show}`;
  return (
    <div className={display}>
      <button
        onClick={props.action(-1)}
        className="action-button btn btn-success col-xs-12">
        {"\u2b45"}
      </button>
      <button
        onClick={props.action(1)}
        className="action-button btn btn-success col-xs-12">
        {"\u2b46"}
      </button>
    </div>
  );
}

Arrows.PropTypes = {
  action: React.PropTypes.func.isRequired,
  headerContainer: React.PropTypes.bool.isRequired,
};

// <div className="media-middle">
//   <button
//     onClick={props.action(-1)}
//     className="arrow action-button btn btn-success col-xs-12">
//     {"\u2b45"}
//   </button>
// </div>
// <div className="media-middle">
//   <button
//     onClick={props.action(1)}
//     className="arrow action-button btn btn-success col-xs-12">
//     {"\u2b46"}
//   </button>
// </div>

export default Arrows;
