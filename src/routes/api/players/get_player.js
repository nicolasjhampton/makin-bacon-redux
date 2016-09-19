'use strict';

module.exports = (req, res, next) => {
  res.location('/');
  res.json(req.user);
};
