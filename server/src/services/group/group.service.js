const { Log } = require('../../logging/logging');
const { GroupRepo } = require('../../repos/group/group.repo');

class GroupService {

  #groupRepo;

  constructor() {
    this.#groupRepo = new GroupRepo();
  }

  getInfo = async (userID, groupID) => {
    const groupInfo = await this.#groupRepo.get(groupID);
    if (groupInfo) {
      Log.debug(JSON.stringify(groupInfo));
      if (groupInfo.members.includes(userID)) {
        return groupInfo;
      }
      Log.debug(`Group doesn't contain member ${userID}`)
    }

    return null;
  };

}

module.exports = {
  GroupService,
};