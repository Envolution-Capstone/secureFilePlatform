const express = require('express');
const { Log } = require('../logging/logging');
const { checkAuth } = require('../middleware/authentication/checkAuth');
const { respondData, respondSuccess, respondUnAuthorized, respondFile, respondBadRequest, respondServerError, respondNotFound } = require('../util/responses');
const multer = require('multer');

const moduleStore = multer.memoryStorage();
const upload = multer({
  storage: moduleStore,
});
const Fields = [
  { name: 'file', maxCount:1 },
];
const uploadFile = (req) => {
  return new Promise((resolve, reject) => {
    upload.fields(Fields)(req, {}, (error) => {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });
};


const makeFileRoutes = (fileService) => {
  const FileRoutes = express.Router();
  FileRoutes.use(checkAuth);

  FileRoutes.post('/', (req, res)=>{
    uploadFile(req).then((uploaded)=>{
      if (!uploaded) {
        respondBadRequest(res);
      }

      fileService.create(req)
        .then((created)=>{
          if (created) {
            respondSuccess(res);
          } else {
            respondBadRequest(res);
          }
        })
        .catch((error)=>{
          Log.error(`GET /files : ${error}`);
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
      Log.error(`GET /files : ${error}`);
      respondServerError(res);
    });
  });

  FileRoutes.get('/:id', (req, res)=>{
    fileService.getInfo(req.userid)
    .then((file)=>{
      if (file) {
        respondFile(res, file);
      } else {
        respondNotFound(res);
      }
    })
    .catch((error)=>{
      Log.error(`GET /files : ${error}`);
      respondServerError(res);
    });
  });


  return FileRoutes;
}

module.exports = {
  makeFileRoutes,
};