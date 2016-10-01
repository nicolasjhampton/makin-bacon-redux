"use strict";

import io from 'socket.io-client';
localStorage.debug = 'socket.io*';
import { Observable } from 'rxjs-es/Observable';


class IoMgr {

  constructor() {
    this.io = io({transports: ['websocket'], upgrade: false});
  }

  roomStream = (context) => {

  }

  gameListStream = (context) => {
    if(!this.gameList) {
      this.gameListChannel = Observable.create(observer => {
        return this.io.on('games', game => { observer.next(game); });
      });
      return this.gameListChannel.subscribe(games => {
        context.setState({
          games,
        })
      });
    }
  }

  gameStream = (context, id) => {
    console.log('id', id);

    this.gameChannel = Observable.create(observer => {
      return this.io.on(id, move => { observer.next(move); });
    });
    return this.gameChannel.subscribe(move => {
      context.state.stack.unshift(move.stack);
      let stack = context.state.stack;
      let options = move.currentOptions;
      let optionType = context.state.stack[0].entry.type == "actor" ? "movie" : "actor";
      context.setState({
        optionType,
        options,
        stack,
      });
    });
  }
}


export default IoMgr;
