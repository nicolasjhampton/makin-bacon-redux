'use strict';

var express = require('express');
var router = express.Router();

var create = require('./players/create.js');


router.post('/', create);


module.exports = router;
