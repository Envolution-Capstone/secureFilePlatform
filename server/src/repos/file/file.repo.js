const { Log } = require('../../logging/logging');
const { Encryption } = require('../../services/encryption/encryption.service');
const { db } = require('./../../firebase/firebase');

class FileRepo {
  
  #filesRef;
  #usersRef;
  #encryption;

  constructor(encryption) {
    this.#filesRef = db.collection("myfiles");
    this.#usersRef = db.collection("users");
    this.#encryption = encryption;
  }

  async getInfo(userID) {
    return new Promise(async (resolve, reject) => {
      this.#filesRef.where("userid", "==", userID)
        .onSnapshot(async (snapshot) => {
          const docs = await Promise.all(snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const sharedByName = await this.getUserNameByUid(data.userid);
            const temp = {
              id: doc.id,
              filename: data.filename,
              extension: data.extension,
              size: data.size,
              timestamp: data.timestamp,
              sharedBy: sharedByName
            };
            return temp;
          }));
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
      extension: meta.extension,
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


  deleteFile = async (userid, fileid) => {
    const docRef =this.#filesRef.doc(fileid);
    const doc = await docRef.get();
  
    if (doc.exists) {
      const data = doc.data();
      if (data.userid == userid) {
        console.log(`deleting ${fileid}`);
        await docRef.delete();
        return true;
      }
      console.log(`not users ${fileid}`);  
    }
    console.log(`doesnt exist ${fileid}`);
    console.log(`didnt ${fileid}`);
    return false;
  };

  async getUserNameByUid(uid) {
    try {
      const userDoc = await this.#usersRef.doc(uid).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        return userData.name;
      }
      return 'Unknown';
    } catch (error) {
      Log.error(`Error getting user name by UID: ${error}`);
      return 'Unknown';
    }
  }

};


module.exports = {
  FileRepo,
};