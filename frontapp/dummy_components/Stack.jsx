"use strict";

import React from 'react';

function Card(props) {
  var unknown = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Question_mark_(black_on_white).png';
  return (
    <div className="card-inverse card-primary col-md-12 stackcard" data-moviedbid={props.moviedbid}>
      <div className="media-right media-middle stats">
        <h1>{props.name}</h1>
        <p>{props.type}</p>
      </div>
      <div className="media-right">
        <img src={props.image == unknown ?
                  props.image :
                  "http://image.tmdb.org/t/p/w92" + props.image}/>
      </div>
    </div>
  );
}

Card.PropTypes = {
  image: React.PropTypes.string.isRequired,
  moviedbid: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  user: React.PropTypes.string.isRequired,
};

function Stack(props) {
  return (
    <div className="col-md-12 container-fluid">
        {props.stack.map(function(card, index) {
          return (
            <Card
              image={card.entry.image}
              moviedbid={card.entry.moviedb_id}
              name={card.entry.name}
              type={card.entry.type}
              user={"start" && card.entry.user && card.entry.user.username}
              key={index}/>
          );
        })}
    </div>
  );
}

Stack.PropTypes = {
  stack: React.PropTypes.array,
};

export default Stack;
