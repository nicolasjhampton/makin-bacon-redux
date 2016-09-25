'use strict';

import React from 'react';
import { render } from 'react-dom';

import './css/styles.css';

import routes from './router.jsx';

render(routes, document.getElementById("games"));
