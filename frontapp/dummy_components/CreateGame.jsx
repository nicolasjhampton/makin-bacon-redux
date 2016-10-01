"use strict";

import React from 'react';
import {Link} from 'react-router';


const CreateGame = props => {
  let sizing = props.headerContainer ? " extend" : " shrink";
  let show = props.headerContainer ? "" : " hidden-xl-down";
  return (
    <div className={"col-md-2 create-game col-xs-12 card card-inverse card-primary container-fluid" + sizing}>
      <div className="card-block action-block row">
        <Link
          className={"btn action-button btn-success col-xs-12 media-middle" + show}
          to="/games/create">
            Create Game
        </Link>
        <button
          type="button"
          className="btn action-button btn-success col-xs-12 media-middle"
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
};

export default CreateGame;
