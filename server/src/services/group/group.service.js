const { Log } = require('../../logging/logging');
const { GroupRepo } = require('../../repos/group/group.repo');
const { UserRepo } = require('../../repos/user/user.repo');

class GroupService {

  #groupRepo;
  #userRepo;

  constructor() {
    this.#groupRepo = new GroupRepo();
    this.#userRepo = new UserRepo();
  }

  getInfo = async (userID, groupID) => {
    const groupInfo = await this.#groupRepo.get(groupID);
    if (groupInfo) {
      Log.debug(JSON.stringify(groupInfo));
      if (groupInfo.members.includes(userID)) {
        // Fetch user information for each member in the group
        const membersWithInfo = [];
        for (const memberID of groupInfo.members) {
          const userInfo = await this.#userRepo.getUser(memberID);
          if (userInfo) {
            membersWithInfo.push({
              id: memberID,
              displayName: userInfo.displayName,
              email: userInfo.email,
              photoURL: userInfo.photoURL,
            });
          }
        }

        // Replace the original members array with the new array containing user information
        groupInfo.members = membersWithInfo;

        return groupInfo;
      }
      Log.debug(`Group doesn't contain member ${userID}`)
    }

    return null;
  };

  removeMember = async (groupID, memberID) => {
    const groupInfo = await this.#groupRepo.get(groupID);
    if (groupInfo) {
      const members = groupInfo.members.filter((id) => id !== memberID);
      await this.#groupRepo.update(groupID, { members });
  
      // Remove the group from the user's groups
      const userInfo = await this.#userRepo.getUser(memberID);
      if (userInfo) {
        const updatedUserGroups = userInfo.groups.filter((group) => group.id !== groupID);
        await this.#userRepo.updateUser(memberID, { groups: updatedUserGroups });
      }
  
      return true;
    }
    return false;
  };
  
  

}

module.exports = {
  GroupService,
};
