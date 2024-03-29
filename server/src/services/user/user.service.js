const { Log } = require("../../logging/logging");
const { UserRepo } = require("../../repos/user/user.repo");

class UserService {
 
  #userRepo;
  #keyService;

  constructor(userRepo, keyService) {
    this.#keyService = keyService;
    this.#userRepo = userRepo;
  }

  getUserGroups = async (req) => {
    const userID = req.params.userid;
    if (userID) {
      return await this.#userRepo.getUserGroups(userID);
    }
    return null;
  };

  getUserInvites = async (req) => {
    const userid = req.params.userid;
    
    const isUser = this.#require_IsUser(req);
    if (isUser) {
      return await this.#userRepo.getUserInvites(userid);
    }

    return null;
  };

  getUser = async (req) => {

    const userid = req.params.userid;
    if (!userid) {
      return null;
    }

    return await this.#userRepo.getUser(userid);
  };

  userLogin = async (req) => {
    const userInfo = this.#createUserInfo(req);

    if (!userInfo) {
      return null;
    }

    const user = await this.#userRepo.createUser(userInfo);
   
      await this.#keyService.addEntity(user.id);
    
    
    return user.id;
  };

  updateUser = async (req) => {
    if (!this.#require_IsUser(req)) {
      return null;
    }
  };

  deleteUser = async (req) => {
    if (!this.#require_IsUser(req)) {
      return null;
    }

    return this.#userRepo.deleteUser(userID);
  };

  // ------ UTIL -------------------------------------------------------

  #require_IsUser = (req) => {
    const tokenuser = req.userid;
    const userid = req.params.userid;

    if (!tokenuser || !userid) {
      return false;
    }

    return tokenuser === userid;
  };

  #createUserInfo = (req) => {
    const userInfo = {
      uid: req.body.uid,
      name: req.body.name,
      email: req.body.email,
      photoURL: req.body.photoURL,
      groups: [],
      groupInvites: [],
    };
    
    if (!userInfo.uid || !userInfo.name || !userInfo.email) {
      return null;
    }

    return userInfo;
  };
}

module.exports = {
  UserService
};