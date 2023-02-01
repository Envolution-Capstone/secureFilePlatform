const { Repo } = require("../../repos/base.repo");
const { User } = require("../../repos/user/user.model");


class UserService {
  #repo;

  constructor() {
    this.#repo = new Repo(User);
  }

  createUser = async (userObj) => {
    await this.#repo.create(userObj);
  };
};

module.exports = {
  UserService,
};