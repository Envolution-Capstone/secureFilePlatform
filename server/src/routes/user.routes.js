const express = require('express');
const { Log } = require('../logging/logging');
const { checkAuth } = require('../middleware/authentication/checkAuth');
const { respondNotFound, respondData, respondServerError, respondUnAuthorized, respondSuccess, respondBadRequest } = require('../util/responses');

const makeUserRoutes = (userService) => {
  const UserRoutes = express.Router();
  UserRoutes.use(checkAuth);

  UserRoutes.get('/:userid', (req, res) => {
    userService.getUser(req)
    .then((info) => {
      if (info) {
        respondData(res, info);
      } else {
        respondNotFound(res);
      }
    })
    .catch((error) => {
      Log.error(`GET /user/:userid : ${error}`);
      respondServerError(res);
    })
  });

  UserRoutes.post('/:userid/login', (req, res) => {
    userService.userLogin(req)
    .then((created) => {
      if (created) {
        respondSuccess(res);
      } else {
        respondNotFound(res);
      }
    })
    .catch((error) => {
      Log.error(`POST /user/:userid/login : ${error}`);
      respondServerError(res);
    })
  });

  UserRoutes.get('/:userid/groups', (req, res)=>{
    userService.getUserGroups(req)
    .then((groups)=>{
      if (groups) {
        respondData(res, groups);
      } else {
        respondNotFound(res);
      }
    })
    .catch((error)=>{
      Log.error(`GET /user/:id/groups : ${error}`);
      respondServerError(res);
    });
  });

  UserRoutes.get('/:userid/invites', (req, res)=> {
    userService.getUserInvites(req)
    .then((invites) => {
      if (invites) {
        respondData(res, invites);
      } else {
        respondBadRequest(res);
      }
    })
    .catch((error) => {
      Log.error(`GET /user/:id/invites : ${error}`);
      respondServerError(res);
    })
  })

  return UserRoutes;
}

module.exports = {
  makeUserRoutes,
};