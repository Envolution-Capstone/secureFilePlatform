const express = require('express');
const { Log } = require('../logging/logging');
const { checkAuth } = require('../middleware/authentication/checkAuth');
const { respondUnAuthorized, respondServerError, respondNotFound, respondData } = require('../util/responses');

const makeGroupRoutes = (groupService) => {
  const GroupRoutes = express.Router();
  GroupRoutes.use(checkAuth);

  GroupRoutes.get('/:id', (req, res)=>{
    groupService.getInfo(req.userid, req.params.id)
    .then((info)=>{
      if (info) {
        respondData(res, info);
      } else {
        respondNotFound(res);
      }
    })
    .catch((error)=> {
      Log.error(`GET /group/:id : ${error}`);
      respondServerError(res);
    });
  });

  GroupRoutes.get('/:id/files', (req, res)=>{
    respondUnAuthorized(res);
  });

  return GroupRoutes;
}

module.exports = {
  makeGroupRoutes,
};