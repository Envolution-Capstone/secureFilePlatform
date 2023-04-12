const { Log } = require('../../logging/logging');
const { GroupRepo } = require('../../repos/group/group.repo');
const { UserRepo } = require('../../repos/user/user.repo');
const { uploadFile } = require('../../util/file_upload');
const { FileRepo } = require('../../repos/file/file.repo');
const path = require('path');


class GroupService {

  #groupRepo;
  #userRepo;
  #keyService;

  constructor(groupRepo, userRepo, keyService) {
    this.#groupRepo = groupRepo;
    this.#keyService = keyService;
    this.#userRepo = userRepo;
  }

  // --------- GROUPS -----------------------------------------------------------

  getInfo = async (req) => {
    Log.debug(`GroupRepo: getInfo`);

    const groupid = req.params.groupid;
    const userid = req.userid;
    if (!groupid || !userid) {
      return null;
    }


    return await
    this.#require_IsMember(req)
    .then(async (isMember) => {
      if (isMember) {
        return await this.#groupRepo.getInfo(groupid);
      }

      return null;
    })
  };

  createGroup = async (req) => {
    Log.debug(`GroupRepo: createGroup`);

    const userid = req.userid;
    const groupInfo = this.#groupInfo(req);

    if (userid && groupInfo) {
      return await this.#groupRepo.createGroup(groupInfo, userid);
    }

    return null;
  };

  updateGroup = async (req) => {
    Log.debug(`GroupRepo: updateGroup`);

    return await 
    this.#require_IsAdmin(req)
    .then( async (isAdmin) => {
      if (isAdmin) {
        const groupUpdateInfo = this.#groupUpdateInfo(req);
        const groupid = req.params.groupid;

        if (!groupUpdateInfo || !groupid) {
          return null;
        }

        return await this.#groupRepo.updateGroup(groupid, groupUpdateInfo);
      }

      return null;
    });
  };

  deleteGroup = async (req) => {
    Log.debug(`GroupRepo: deleteGroup`);

    const groupid = req.params.groupid;

    if (!groupid) {
      return null;
    }

    return await
    this.#require_IsAdmin(req)
    .then(async (isAdmin) => {
      if (isAdmin) {
        return await this.#groupRepo.deleteGroup(groupid);
      }

      return null;
    });
  };

  // --------- END GROUPS -----------------------------------------------------------

  // --------- GROUP FILES -----------------------------------------------------------

  createFile = async (req) => {
    Log.debug(`GroupRepo: createFile`);
  
    const uploaded = await uploadFile(req);
    if (!uploaded) {
      return null;
    }
  
    const groupid = req.params.groupid;
    if (!groupid) {
      return null;
    }
  
    if (!this.#checkFile(req)) {
      return null;
    }
  
    return await
    this.#require_IsMember(req)
    .then(async (isMember) => {
      if (isMember) {
        const fileExtension = path.extname(req.body.filename).substring(1);
        const meta = {
          userid: req.userid,
          filename: req.body.filename,
          extension: fileExtension,
          timestamp: Date.now(),
          size: req.files.file[0].size
        };
      
        return await this.#groupRepo.createFile(meta, groupid, req.files.file[0].buffer);
      }
  
      return null;
    });
  };
  

  getGroupFilesInfo = async (req) => {
    Log.debug(`GroupRepo: getGroupFilesInfo`);

    const groupid = req.params.groupid;
    if (!groupid) {
      return null;
    }

    return await
    this.#require_IsMember((req))
    .then(async (isMember) => {
      if (isMember) {
        return await this.#groupRepo.getGroupFiles(groupid);
      }

      return null;
    });
  };

  downloadFile = async (req) => {
    Log.debug(`GroupRepo: downloadFile`);

    const groupid = req.params.groupid;
    const fileid = req.params.fileid;

    if (!groupid || !fileid) {
      return null;
    }

    return await
    this.#require_IsMember(req)
    .then(async (isMember) => {
      if (isMember) {
        return await this.#groupRepo.downloadFile(groupid, fileid);
      }

      return null;
    });
  };

  updateFile = async (req) => {
    Log.debug(`GroupRepo: updateFile`);

    const groupid = req.params.groupid;
    const fileid = req.params.fileid;
    
  };

  deleteFile = async (req) => {
    Log.debug(`GroupRepo: deleteFile`);

    const groupid = req.params.groupid;
    const fileid = req.params.fileid;

    return await
    this.#require_IsAdmin(req)
    .then(async (isAdmin) => {
      if (isAdmin) {
        return await this.#groupRepo.deleteFile(groupid, fileid);
      }

      return null;
    });
  };


  // --------- END GROUP FILES -----------------------------------------------------------

  // --------- GROUP MEMBERS -----------------------------------------------------------

  getMembers = async (req) => {
    Log.debug(`GroupRepo: getMembers`);

    const groupid = req.params.groupid;

    if (!groupid) {
      return null;
    }

    return await
    this.#require_IsMember(req)
    .then(async (isMember)=>{
      if (isMember) {
        return await this.#groupRepo.getMembers(groupid);
      }

      return null;
    });
  };

  inviteMember = async (req) => {
    Log.debug(`GroupRepo: inviteMember`);

    const groupid = req.params.groupid;
    const userid = req.userid;
    const invitee = req.params.memberemail;

    if (!groupid || !userid || !invitee) {
      return null;
    }

    return await
    this.#require_IsAdmin(req)
    .then(async (isAdmin) => {
      if (isAdmin) {
        const info = await this.#groupRepo.getInfo(groupid);
        return await this.#userRepo.groupInvite(groupid, info.groupname, invitee);
      }

      return null;
    });
  };

  updateMember = async (req) => {
    Log.debug(`GroupRepo: updateMember`);

    const groupid = req.params.groupid;
    const userid = req.userid;
    const updateInfo = this.#memberUpdateInfo(req);


    if (!groupid || !userid || !updateInfo) {
      return null;
    }

    return await
    this.#require_IsAdmin(req)
    .then(async (isAdmin) => {
      if (isAdmin) {
        return await this.#groupRepo.updateMember(groupid, updateInfo);
      }

      return null;
    });
  };

  removeMember = async (req) => {
    Log.debug(`GroupRepo: removeMember`);

    const groupid = req.params.groupid;
    const memberid = req.params.memberid;

    if (!groupid || !memberid) {
      return null;
    }

    return await
    this.#require_IsAdmin(req)
    .then(async (isAdmin) => {
      if (isAdmin) {
        await this.#userRepo.leaveGroup(memberid, groupid);
        return await this.#groupRepo.removeMember(groupid, memberid);
      }

      return null;
    });
  };

  userAcceptInvite = async (req) => {

    const groupid = req.params.groupid;
    const userid = req.params.userid;

    const isUser = this.#require_IsUser(req);
    if (isUser) {
      const info = await this.#groupRepo.getInfo(groupid);
      await this.#userRepo.acceptInvite(groupid, info.groupname, userid);
      return await this.#groupRepo.addMember(groupid, {id: userid, admin: false});
    } 

    return null;
  };

  userDeclineInvite = async (req) => {

    const groupid = req.params.groupid;
    const userid = req.params.userid;

    const isUser = this.#require_IsUser(req);
    if (isUser) {
      return await this.#userRepo.declineInvite(groupid, userid);
    } 

    return null;
  };


  // --------- END GROUP MEMBERS -----------------------------------------------------------


  // --------- UTIL -----------------------------------------------------------

  #require_IsMember = async (req) => {
    Log.debug(`#GroupRepo: require_IsMember`);

    const groupid = req.params.groupid;
    const userid = req.userid;


    if (!groupid || !userid) {
      return false;
    }
    const groupInfo = await this.#groupRepo.getInfo(groupid);

    if (groupInfo) {
      const found = groupInfo.members.find((value) => { return value.id === userid; });
      if (found) {
        return true;
      }
    }
    return false;
  };

  #require_IsAdmin = async (req) => {
    Log.debug(`#GroupRepo: require_IsAdmin`);

    const groupid = req.params.groupid;
    const userid = req.userid;

    if (!groupid || !userid) {
      return false;
    }

    const groupInfo = await this.#groupRepo.getInfo(groupid);

    if (groupInfo) {
      const user = groupInfo.members.find((val) => {
        return val.id === userid;
      });

      if (user) {
        return user.admin;
      }
    }

    return false;
  };

  #require_IsUser = (req) => {
    const tokenuser = req.userid;
    const userid = req.params.userid;

    if (!tokenuser || !userid) {
      return false;
    }

    return tokenuser === userid;
  };

  #groupInfo = (req) => {
    if (req.body.name) {
      return {
        groupname: req.body.name
      };
    }

    return false;
  };

  #groupUpdateInfo = (req) => {
    return {
      name: req.body.name || null
    }
  };

  #checkFile(req) {
    if (req.userid && req.body.filename && req.files.file[0].buffer) {
      return true;
    }
    return false;
  }

  #fileUpdateInfo = (req) => {
    return {

    };
  };

  #memberUpdateInfo = (req) => {
    return {};
  };

  // --------- END UTIL -----------------------------------------------------------
}

module.exports = {
  GroupService,
};
