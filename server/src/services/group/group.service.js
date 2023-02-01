const { Repo } = require("../../repos/base.repo");
const { Group } = require('./../../repos/group/group.model')

class GroupService {
  #repo;

  constructor() {
    this.#repo = new Repo(Group);
  }
}

module.exports = {
  GroupService,
};