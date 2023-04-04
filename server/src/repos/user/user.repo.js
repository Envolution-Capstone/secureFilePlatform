const { db } = require('./../../firebase/firebase');

class UserRepo {

  #usersRef;
  #groupsRef;

  constructor() {
    this.#usersRef = db.collection("users");
    this.#groupsRef = db.collection("group");
  }

  createUser = async (userInfo) => {
    await this.#usersRef.doc(userInfo.uid).set(userInfo, {merge: true});
    return true;
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
          const info = await this.#groupsRef.doc(group.id).get();
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
  

  deleteUser = async (userID) => {
    await this.#usersRef.doc(userID).delete()
    .then(()=> {
      return true;
    });
  };

  getUserInvites = async (userid) => {
    const userDoc = await this.#usersRef.doc(userid).get();
    
    if (userDoc.exists) {
      return userDoc.data().groupInvites;
    }

    return null;
  };

  groupInvite = async (groupid, useremail) => {
    const userRef = await db.collection('users').where('email', '==', useremail).get();
    const userData = userDoc.data();
  
    const updatedInvites = userData.groupInvites
      ? [...userData.groupInvites, { groupid, groupName }]
      : [{ groupid, groupName }];
  
    await userRef.set({ groupInvites: updatedInvites }, { merge: true });
  };

  acceptInvite = (groupid, userid) => {
    // TODO
  };

};

module.exports = {
  UserRepo,
};