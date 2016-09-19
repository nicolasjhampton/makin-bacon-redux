"use strict";

import React from 'react';


const CreateGame = props => {
  let sizing = props.headerContainer ? " extend" : " shrink";
  let show = props.headerContainer ? "" : " hidden-xl-down";
  return (
    <div className={"col-md-2 col-xs-12 card card-primary card-inverse container-fluid" + sizing}>
      <div className="card-block row">
        <button
          type="button"
          className={"btn btn-success col-xs-12 media-middle" + show}
          onClick={props.action}>
            Create Game
          </button>
        <button
          type="button"
          className="btn btn-success col-xs-12 media-middle"
          onClick={props.headerControl}>
            Show Header
          </button>
      </div>
    </div>
  );
}

CreateGame.PropTypes = {
  headerControl: React.PropTypes.func.isRequired,
  headerContainer: React.PropTypes.bool.isRequired,
  action: React.PropTypes.func.isRequired,
};

export default CreateGame;
