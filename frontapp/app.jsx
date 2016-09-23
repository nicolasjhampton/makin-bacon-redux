'use strict';

import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
localStorage.debug = 'socket.io*';

import './css/styles.css';

import routes from './router.jsx';

render(routes, document.getElementById("games"));
