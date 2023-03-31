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

  async createFile(meta, groupID, file) {
    const fileID = db.collection("group").doc(groupID).collection("files").doc();
    const data = {
      userid: meta.userid,
      filename: meta.filename,
      size: meta.size,
      timestamp: meta.timestamp,
      content: file
    };
    return await fileID.set(data).then(()=>{
      return true;
    })
    .catch((error)=>{
      Log.error(`Error Creating File: ${error}`);
      return false;
    });
  }


  async getFiles(groupID) {
    return db.collection("group").doc(groupID).collection("files")
      .get()
      .then((groupFiles)=> {
        const docs = groupFiles.docs.map((doc)=>{
          const data = doc.data();
          const temp = {
            id: doc.id,
            filename: data.filename,
            size: data.size,
            timestamp: data.timestamp,
          };
          return temp;
        });

        return docs.filter(d => {return d.filename != null});
      });
  }


  update = async (groupID, updatedData) => {
    await this.#groupsRef.doc(groupID).update(updatedData);
  };
  

};

module.exports = {
  GroupRepo
}