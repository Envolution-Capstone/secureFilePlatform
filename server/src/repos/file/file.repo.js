const crypto = require('crypto');
const { Log } = require('../../logging/logging');
const { db } = require('./../../firebase/firebase');

class FileRepo {
  
  #filesRef;
  #groupsRef;

  constructor() {
    this.#filesRef = db.collection("myfiles");
  }

  async getInfo(userID) {
    return new Promise((resolve, reject) => { 
      this.#filesRef.where("userid", "==", userID)
      .onSnapshot((snapshot) => {
        const docs = snapshot.docs.map((doc)=>{
          const data = doc.data();
          const temp = {
            id: doc.id,
            filename: data.filename,
            size: data.size,
            timestamp: data.timestamp,
            groupid: doc.groupid || null,
          };
          return temp;
        });
        resolve(docs);
      });
    });
  }

  async get(userID, fileId) {
    const doc = await this.#filesRef.doc(fileId).get();
  
    if (doc.exists) {
      const data = doc.data();
      if (data.userid == userID) {
        return {filename: data.filename, content: data.content};
      }
    }
    return false;
  }

  async create(meta, file) {
    const fileID = this.#filesRef.doc();
    const data = {
      userid: meta.userid,
      groupid: meta.groupid,
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
};


module.exports = {
  FileRepo,
};