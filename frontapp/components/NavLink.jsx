"use strict";

import React from 'react';
import {Link} from 'react-router';

const NavLink = props => (
    <Link {...props} className="nav-link" activeStyle={{ color: 'white' }}/>
);

export default NavLink;
