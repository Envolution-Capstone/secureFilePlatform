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

    if (!userDoc.exists) {
      await this.#usersRef.doc(userInfo.uid).set(userInfo, {merge: true});
    }

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
          console.log(`Group: ${JSON.stringify(group)}`);
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
    console.log(`email: ${useremail}`);
    
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

  acceptInvite = async (groupid, groupName, userid) => {
    const userRef = await db.collection('users').doc(userid);
    const userData = (await userRef.get()).data();
  
    const updatedInvites = userData.groups
      ? userData.groups.filter((group) => {return group.id === groupid; })
      : [];

    const updatedGroups = userData.groups
      ? [...userData.groups, { groupid, groupName }]
      : [{ groupid, groupName }];
  
    await userRef.set({ groupInvites: updatedInvites, groups: updatedGroups }, { merge: true });
    return true;
  };

  declineInvite = async (groupid, userid) => {
    const userRef = await db.collection('users').doc(userid);
    const userData = (await userRef.get()).data();
  
    const updatedGroups = userData.groups
      ? userData.groups.filter((group) => {return group.groupid === groupid; })
      : [];
  
    await userRef.set({ groups: updatedGroups }, { merge: true });
    return true;
  };

};

module.exports = {
  UserRepo,
};