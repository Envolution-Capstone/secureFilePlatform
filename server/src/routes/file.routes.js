const express = require('express');
const path = require('path');
const { Log } = require('../logging/logging');
const { checkAuth } = require('../middleware/authentication/checkAuth');
const { respondData, respondSuccess, respondUnAuthorized, respondFile, respondBadRequest, respondServerError, respondNotFound } = require('../util/responses');

const { uploadFile } = require('../util/file_upload');

const makeFileRoutes = (fileService) => {
  const FileRoutes = express.Router();
  FileRoutes.use(checkAuth);

  FileRoutes.post('/', (req, res)=>{
    uploadFile(req).then((uploaded)=>{
      if (!uploaded) {
        respondBadRequest(res);
      }
      
      const file = req.files.file[0];
      const extension = path.extname(file.originalname).substring(1);
      req.extension = extension;

      fileService.create(req)
        .then((created)=>{
          if (created) {
            respondSuccess(res);
          } else {
            respondBadRequest(res);
          }
        })
        .catch((error)=>{
          Log.error(`POST /file : ${error}`);
          respondServerError(res);
        });
    });
  });

  FileRoutes.get('/', (req, res)=>{
    fileService.getInfo(req.userid)
    .then((file)=>{
      if (file) {
        respondData(res, file);
      } else {
        respondNotFound(res);
      }
    })
    .catch((error)=>{
      Log.error(`GET /file : ${error}`);
      respondServerError(res);
    });
  });

  FileRoutes.get('/:id', (req, res)=>{
    fileService.get(req.userid, req.params.id)
    .then((file)=>{
      if (file) {
        respondFile(res, file);
      } else {
        respondNotFound(res);
      }
    })
    .catch((error)=>{
      Log.error(`GET /file/:id : ${error}`);
      respondServerError(res);
    });
  });

  FileRoutes.delete('/:id', (req, res)=>{
    fileService.deleteFile(req.userid, req.params.id)
    .then((file)=>{
      if (file) {
        respondFile(res, file);
      } else {
        respondNotFound(res);
      }
    })
    .catch((error)=>{
      Log.error(`GET /file/:id : ${error}`);
      respondServerError(res);
    });
  });


  return FileRoutes;
}

module.exports = {
  makeFileRoutes,
};