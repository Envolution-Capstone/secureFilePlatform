const { UserRepo } = require("../../repos/user/user.repo");

class UserService {
 
  #userRepo;

  constructor() {
    this.#userRepo = new UserRepo();
  }

  getUserGroups = (userID)=> {
    return this.#userRepo.getUserGroups(userID);
  };

  getUser = (userID) => {
    return this.#userRepo.getUser(userID);
  };

  createUser = (userInfo) => {
    // TODO check that userInfo is well-formed
  };

  updateUser = (userID, userUpdateInfo) => {
    // TODO check that userUpdateInfo is well-formed
  };

  deleteUser = (userID) => {
    return this.#userRepo.deleteUser(userID);
  };
}

module.exports = {
  UserService
};