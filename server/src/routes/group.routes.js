const express = require('express');
const { Log } = require('../logging/logging');
const { checkAuth } = require('../middleware/authentication/checkAuth');
const { respondUnAuthorized, respondSuccess, respondServerError, respondBadRequest, respondNotFound, respondData, respondFile } = require('../util/responses');

const { uploadFile } = require('../util/file_upload');

const makeGroupRoutes = (groupService) => {
  const GroupRoutes = express.Router();
  GroupRoutes.use(checkAuth);

  GroupRoutes.post('/:groupID/files', (req, res)=>{
    console.log("post groupid");
    uploadFile(req).then((uploaded)=>{
      if (!uploaded) {
        respondBadRequest(res);
      }

      groupService.createFile(req.userid, req.params.groupID, req)
        .then((created)=>{
          if (created) {
            respondSuccess(res);
          } else {
            respondBadRequest(res);
          }
        })
        .catch((error)=>{
          Log.error(`POST /group/:groupID : ${error}`);
          respondServerError(res);
        });
    });
  });


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


  GroupRoutes.get('/:groupID/files', (req, res) => {
    console.log("getting group files");
    groupService.getFiles(req.userid, req.params.groupID)
    .then((files)=>{
      if (files) {
        respondData(res, files);
      } else {
        respondNotFound(res);
      }
    })
    .catch((error)=>{
      Log.error(`DELETE /group/:groupID/member/:memberID : ${error}`);
      respondServerError(res);
    });
  });


  GroupRoutes.get('/:groupID/files/:fileID', (req, res)=>{
    groupService.downloadFile(req.userid, req.params.groupID, req.params.fileID)
    .then((file)=>{
      if (file) {
        respondFile(res, file);
      } else {
        respondNotFound(res);
      }
    })
    .catch((error)=>{
      Log.error(`GET /group/:groupID/files/:fileID : ${error}`);
      respondServerError(res);
    });
  });

  GroupRoutes.delete('/:groupID/member/:memberID', (req, res) => {
    groupService
      .removeMember(req.params.groupID, req.params.memberID)
      .then((success) => {
        if (success) {
          res.status(204).send();
        } else {
          respondNotFound(res);
        }
      })
      .catch((error) => {
        Log.error(`DELETE /group/:groupID/member/:memberID : ${error}`);
        respondServerError(res);
      });
  });
  

  return GroupRoutes;
}

module.exports = {
  makeGroupRoutes,
};