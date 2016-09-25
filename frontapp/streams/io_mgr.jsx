"use strict";

import { Observable } from 'rxjs-es/Observable';

class IoMgr {

  constructor(io) {
    this.io = io;
  }

  gameListStream = (context) => {
    this.gameList = io();
    this.gameListChannel = Observable.create(observer => {
      return this.gameList.on('games', game => { observer.next(game); });
    });
    return this.gameListChannel.subscribe(games => context.setState({games: games}));
  }

  gameStream = () => {
    //this.id = id;
    this.game = io(`/${this.id}`);
    this.gameChannel = Observable.create(observer => {
      return this.game.on('move', move => { observer.next(move); });
    });
    return this.gameChannel.subscribe(move => {
      context.state.stack.unshift(move.stack);
      var options = move.currentOptions;
      var optionType = context.state.stack[0].entry.type == "actor" ? "movie" : "actor";
      context.setState({ stack: context.state.stack, options: options, optionType: optionType});
    });
  }
}


export default IoMgr;
