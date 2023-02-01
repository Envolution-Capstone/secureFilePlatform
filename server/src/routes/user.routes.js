const express = require('express');
const { Log } = require('../logging/logging');

const makeUserRoutes = (userService) => {
  const UserRoutes = express.Router();

  return UserRoutes;
}

module.exports = {
  makeUserRoutes,
};