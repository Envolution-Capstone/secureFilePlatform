const { db } = require('./../../firebase/firebase');

class UserRepo {

  #usersRef;
  #groupsRef;

  constructor() {
    this.#usersRef = db.collection("users");
    this.#groupsRef = db.collection("groups");
  }

  createUser = (userInfo)=>{

  };

  getUser = async (userID) => {
    const doc = await this.#usersRef.doc(userID).get();
    if (doc.exists) {
      return doc.data();
    }
    return null;
  };


  getUserGroups = async (userID)=>{

    const doc = await this.#usersRef.doc(userID).get();

    if (doc.exists) {
      const data = doc.data();
      const g = await Promise.all(
        data.groups.map(async (group)=> {
          console.log(JSON.stringify(group));
          const info = await this.#groupsRef.doc(group.id).get();
          console.log(JSON.stringify(info.data()));
          return info.data();
        })
      );
      return g;
    }

    return null;
  };

  updateUser = async (userID, userUpdateInfo) => {
    await this.#usersRef.doc(userID).update(userUpdateInfo);
  };
  

  deleteUser = (userID) => {

  };
};

module.exports = {
  UserRepo,
};