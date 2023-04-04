const { Log } = require('../../logging/logging');
const { Encryption } = require('../../services/encryption/encryption.service');
const { db } = require('./../../firebase/firebase');

class FileRepo {
  
  #filesRef;
  #encryption;

  constructor() {
    this.#filesRef = db.collection("myfiles");
    this.#encryption = new Encryption();
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
            timestamp: data.timestamp
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
        const content = await this.#encryption.decrypt(userID, data.content);
        return {filename: data.filename, content: content};
      }
    }
    return false;
  }

  async create(meta, file) {
    const fileID = this.#filesRef.doc();

    const content = await this.#encryption.encrypt(meta.userid, file);

    const data = {
      userid: meta.userid,
      filename: meta.filename,
      size: meta.size,
      timestamp: meta.timestamp,
      content: content
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