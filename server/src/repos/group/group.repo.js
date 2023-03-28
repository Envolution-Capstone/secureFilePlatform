const { db } = require('../../firebase/firebase');
const { Log } = require('../../logging/logging');

class GroupRepo {

  #groupsRef;

  constructor() {
    this.#groupsRef = db.collection("group");
  }

  get = async (groupID) => {
    const doc = await this.#groupsRef.doc(groupID).get();

    if (doc.exists) {
      Log.debug(`Group ${groupID} Exists`);
      return doc.data();
    } else {
      Log.debug(`Group ${groupID} Doesn't Exist`);
      return null;
    }
  };

  update = async (groupID, updatedData) => {
    await this.#groupsRef.doc(groupID).update(updatedData);
  };
  

};

module.exports = {
  GroupRepo
}