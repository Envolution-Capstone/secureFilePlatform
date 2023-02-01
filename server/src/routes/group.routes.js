const express = require('express');
const { Log } = require('../logging/logging');

const makeGroupRoutes = (groupService) => {
  const GroupRoutes = express.Router();

  return GroupRoutes;
}

module.exports = {
  makeGroupRoutes,
};