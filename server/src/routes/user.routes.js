const express = require('express');
const { Log } = require('../logging/logging');
const { checkAuth } = require('../middleware/authentication/checkAuth');
const { respondNotFound, respondData, respondServerError, respondUnAuthorized } = require('../util/responses');

const makeUserRoutes = (userService) => {
  const UserRoutes = express.Router();

  UserRoutes.use(checkAuth);

  UserRoutes.get('/:id/group/', (req, res)=>{
    if(req.params.id == req.userid) {
      userService.getUserGroups(req.params.id)
      .then((groups)=>{
        if (groups) {
          respondData(res, groups);
        } else {
          respondNotFound(res);
        }
      })
      .catch((error)=>{
        Log.error(`GET /user/:id/group : ${error}`);
        respondServerError(res);
      });
    } else {
      respondUnAuthorized(res);
    }
  });

  return UserRoutes;
}

module.exports = {
  makeUserRoutes,
};