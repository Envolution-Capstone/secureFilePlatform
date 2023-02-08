const express = require('express');
const { Log } = require('../logging/logging');
const { checkAuth } = require('../middleware/authentication/checkAuth');
const { respondData } = require('../util/responses');

const makeFileRoutes = (fileService) => {
  const FileRoutes = express.Router();
  FileRoutes.use(checkAuth);

  FileRoutes.get('/', (req, res)=>{
    respondData(res, "it worked");
  });

  return FileRoutes;
}

module.exports = {
  makeFileRoutes,
};