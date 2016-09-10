'use strict';

import React from 'react';
import ReactDOM from 'react-dom';


import Options from './components/SomeOptions';
import Stack from './components/Stack';
import Players from './components/Players';



function GameApp(props) {
  return (
    <div>
      <Options />
      <Stack />
      <Players />
    </div>
  );
}

ReactDOM.render(<GameApp />, document.getElementById("GameApp"));
