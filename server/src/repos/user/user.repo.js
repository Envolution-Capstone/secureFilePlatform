const { db } = require('./../../firebase/firebase');

class UserRepo {

  #usersRef;
  #groupsRef;

  constructor() {
    this.#usersRef = db.collection("users");
    this.#groupsRef = db.collection("group");
  }

  createUser = async (userInfo) => {
    const userDoc = await this.#usersRef.doc(userInfo.uid).get();
    const newuser = false;

    if (!userDoc.exists) {
      newuser = true;
      await this.#usersRef.doc(userInfo.uid).set(userInfo, {merge: true});
    }

    return {newuser, id : userDoc.id};
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
          const info = await this.#groupsRef.doc(group.groupid).get();
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

  groupInvite = async (groupid, groupName, useremail) => {    
    return await 
    this.#usersRef.where('email', '==', useremail).get()
    .then((snapshot) => {
      snapshot.forEach(async (doc) => {
        const userData = doc.data();
        const updatedInvites = userData.groupInvites
          ? [...userData.groupInvites, { groupid, groupName }]
          : [{ groupid, groupName }];

        const userRef = this.#usersRef.doc(doc.id);
        await userRef.set({ groupInvites: updatedInvites }, { merge: true });
      });
      return true;
    });
  };

  leaveGroup = async (userid, groupid) => {
    const userRef = await db.collection('users').doc(userid);
    const userData = (await userRef.get()).data();
  
    const updatedGroups = userData.groups
      ? userData.groups.filter((group) => {return group.groupid !== groupid; })
      : [];
  
    await userRef.set({ groups: updatedGroups }, { merge: true });
    return true;
  };

  acceptInvite = async (groupid, groupname, userid) => {
    const userRef = await db.collection('users').doc(userid);
    const userData = (await userRef.get()).data();
  
    const updatedGroups = userData.groups
      ? [...userData.groups, { groupid, groupname }]
      : [{ groupid, groupname }];
  
    await userRef.set({ groups: updatedGroups }, { merge: true });
    await this.removeSpecificInvite(userid, groupid);
    return true;
  };
  

  declineInvite = async (groupid, userid) => {
    const userRef = await db.collection('users').doc(userid);
    const userData = (await userRef.get()).data();
  
    const updatedGroups = userData.groupInvites
      ? userData.groupInvites.filter((group) => {return group.groupid !== groupid; })
      : [];
  
    await userRef.set({ groupInvites: updatedGroups }, { merge: true });
    return true;
  };

  removeSpecificInvite = async (userid, groupid) => {
    const userRef = this.#usersRef.doc(userid);
    const userData = (await userRef.get()).data();
  
    const updatedInvites = userData.groupInvites
      ? userData.groupInvites.filter((invite) => invite.groupid !== groupid)
      : [];
  
    await userRef.update({ groupInvites: updatedInvites });
  };
  

};

module.exports = {
  UserRepo,
};