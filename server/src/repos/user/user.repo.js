const { db } = require('./../../firebase/firebase');

class UserRepo {

  #usersRef;

  constructor() {
    this.#usersRef = db.collection("users");
  }

  createUser = (userInfo)=>{

  };

  getUser = (userID)=>{

  };

  getUserGroups = async (userID)=>{

    const doc = await this.#usersRef.doc(userID).get();

    if (doc.exists) {
      const data = doc.data();
      return data.groups.map((group)=> {
        return {
          id: group.id,
          name: group.name,
        };
      });
    }

    return null;
  };

  updateUser = (userID, userUpdateInfo) => {
  
  };

  deleteUser = (userID) => {

  };
};

module.exports = {
  UserRepo,
};