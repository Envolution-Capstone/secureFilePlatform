const { Log } = require('../../logging/logging');
const { db } = require('./../../firebase/firebase');


class FileRepo {
  
  #filesRef;
  #groupsRef;

  constructor() {
    this.#filesRef = db.collection("myfiles");
  }

  async getInfo(userID) {
    return this.#filesRef.where("user", "==", userID)
    .onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc)=>{
        const data = doc.data();
        return {
          id: doc.id,
          filename: data.filename,
          size: data.size,
        };
      });

      return docs;
    });
  }

  async get(userID, fileId) {
    return this.#filesRef.doc(fileId).get().then((doc)=>{
      if (doc.exists) {
        if (doc.data().user == userID) {
          return doc.data().fileURL;
        }
      }
      return false;
    });
  }

  async create(meta, file) {
    this.#filesRef.put(file, meta);
  }

};


module.exports = {
  FileRepo,
};