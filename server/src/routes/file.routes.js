const express = require('express');
const { Log } = require('../logging/logging');

const makeFileRoutes = (fileService) => {
  const FileRoutes = express.Router();

  return FileRoutes;
}

module.exports = {
  makeFileRoutes,
};