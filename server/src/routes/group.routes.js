const express = require('express');
const { Log } = require('../logging/logging');
const { checkAuth } = require('../middleware/authentication/checkAuth');
const { respondSuccess, respondServerError, respondBadRequest, respondNotFound, respondData, respondFile } = require('../util/responses');

const makeGroupRoutes = (groupService) => {
  const GroupRoutes = express.Router();
  GroupRoutes.use(checkAuth);

  // -------- Group Routes --------------------------------------------------------------------------------------------

  GroupRoutes.get('/:groupid', (req, res)=>{
    groupService.getInfo(req)
    .then((info)=>{
      if (info) {
        respondData(res, info);
      } else {
        respondBadRequest(res);
      }
    })
    .catch((error)=>{
      Log.error(`GET /group/:groupid : ${error}`);
      respondServerError(res);
    });
  });

  GroupRoutes.post('/', (req, res)=> {
    groupService.createGroup(req)
    .then((groupid)=>{
      if (groupid) {
        respondData(res, groupid);
      } else {
        respondBadRequest(res);
      }
    })
    .catch((error)=>{
      Log.error(`POST /group : ${error}`);
      respondServerError(res);
    });
  });

  GroupRoutes.put('/', (req, res)=> {
    groupService.updateGroup(req)
    .then((updated)=>{
      if (updated) {
        respondSuccess(res);
      } else {
        respondBadRequest(res);
      }
    })
    .catch((error)=>{
      Log.error(`PUT /group/:groupid : ${error}`);
      respondServerError(res);
    });
  });

  GroupRoutes.delete('/:groupid', (req, res)=>{
    groupService.deleteGroup(req)
    .then((deleted)=>{
      if (deleted) {
        respondSuccess(res);
      } else {
        respondBadRequest(res);
      }
    })
    .catch((error)=>{
      Log.error(`DELETE /group/:groupid : ${error}`);
      respondServerError(res);
    });
  });

  // -------- END Group Routes --------------------------------------------------------------------------------------------

  // -------- Group File Routes -------------------------------------------------------------------------------------------


  GroupRoutes.post('/:groupid/files', (req, res)=>{
    groupService.createFile(req)
    .then((created)=>{
      if (created) {
        respondSuccess(res);
      } else {
        respondBadRequest(res);
      }
    })
    .catch((error)=>{
      Log.error(`POST /group/:groupid/files : ${error}`);
      respondServerError(res);
    });
  });


  GroupRoutes.get('/:groupid/files', (req, res) => {
    groupService.getGroupFilesInfo(req)
    .then((info)=>{
      if (info) {
        respondData(res, info);
      } else {
        respondNotFound(res);
      }
    })
    .catch((error)=>{
      Log.error(`GET /group/:groupid/files : ${error}`);
      respondServerError(res);
    });
  });

  GroupRoutes.get('/:groupid/files/:fileid', (req, res)=>{
    groupService.downloadFile(req)
    .then((file)=>{
      if (file) {
        respondFile(res, file);
      } else {
        respondNotFound(res);
      }
    })
    .catch((error)=>{
      Log.error(`GET /group/:groupid/files/:fileid : ${error}`);
      respondServerError(res);
    });
  });

  GroupRoutes.put('/:groupid/files/:fileid', (req, res)=>{
    groupService.updateFile(req)
    .then((updated)=>{
      if (updated) {
        respondSuccess(res);
      } else {
        respondBadRequest(res);
      }
    })
    .catch((error)=>{
      Log.error(`PUT /group/:groupid/files/:fileid : ${error}`);
      respondServerError(res);
    });
  });

  GroupRoutes.delete('/:groupid/files/:fileid', (req, res)=>{
    groupService.deleteFile(req)
    .then((deleted)=>{
      if (deleted) {
        respondSuccess(res);
      } else {
        respondBadRequest(res);
      }
    })
    .catch((error)=>{
      Log.error(`DELETE /group/:groupid/files/:fileid : ${error}`);
      respondServerError(res);
    });
  });

  // -------- END Group File Routes -------------------------------------------------------------------------------------------

  // -------- Group Member Routes -------------------------------------------------------------------------------------------

  GroupRoutes.get('/:groupid/members', (req, res)=>{
    groupService.getMembers(req)
    .then((memebers)=>{
      if (memebers) {
        respondData(res, members);
      } else {
        respondNotFound(res);
      }
    })
    .catch((error)=>{
      Log.error(`GET /group/:groupid/members : ${error}`);
      respondServerError(res);
    });
  });

  GroupRoutes.post('/:groupid/members/:memberemail', (req, res)=>{
    groupService.inviteMember(req)
    .then((invited)=>{
      if (invited) {
        respondSuccess(res);
      } else {
        respondBadRequest(res);
      }
    })
    .catch((error)=>{
      Log.error(`POST /group/:groupid/members/:memberid : ${error}`);
      respondServerError(res);
    });
  });

  GroupRoutes.put('/:groupid/members/:memberid', (req, res)=>{
    groupService.updateMember(req)
    .then((updated)=>{
      if (updated) {
        respondSuccess(res);
      } else {
        respondBadRequest(res);
      }
    })
    .catch((error)=>{
      Log.error(`PUT /group/:groupid/members/:memberid : ${error}`);
      respondServerError(res);
    });
  });

  
  GroupRoutes.delete('/:groupid/members/:memberid', (req, res) => {
    groupService.removeMember(req)
    .then((deleted)=>{
      if (deleted) {
        respondSuccess(res);
      } else {
        respondBadRequest(res);
      }
    })
    .catch((error)=>{
      Log.error(`DELETE /group/:groupid/members/:memberid : ${error}`);
      respondServerError(res);
    });
  });
  

  // -------- END Group Member Routes -------------------------------------------------------------------------------------------

  return GroupRoutes;
}

module.exports = {
  makeGroupRoutes,
};