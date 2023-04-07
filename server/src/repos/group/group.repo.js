const { db } = require('../../firebase/firebase');
const { Log } = require('../../logging/logging');
const { Encryption } = require('../../services/encryption/encryption.service');
const { firebase } = require("firebase/app");

class GroupRepo {

  #groupsRef;
  #encryption;

  constructor() {
    this.#groupsRef = db.collection("group");
    this.#encryption = new Encryption();
  }

  createGroup = async (groupInfo, creatorid) => {

    const groupRef = await this.#groupsRef.doc();
    const groupID = groupRef.id;

    const groupDoc = await groupRef.set({
      groupid: groupRef.id,
      groupname: groupInfo.groupname,
      createdBy: creatorid,
      members: [
        { id: creatorid, admin: true}
      ],
    });
  
    const userRef = db.collection('users').doc(creatorid);
    const userInfo = await userRef.get();


    await userRef.update({
      groups: [...userInfo.data().groups, { groupname: groupInfo.groupname, groupid: groupID}],
    });
    const fdoc = await db.collection("group").doc(groupID).collection("files").add({});

    return { groupname: groupInfo.groupname, groupid: groupID};
  };

  getInfo = async (groupid) => {
    const doc = await this.#groupsRef.doc(groupid).get();

    if (doc.exists) {
      return doc.data();
    } else {
      return null;
    }
  };

  deleteGroup = async (groupid) => {
    return await this.#groupsRef.doc(groupid).delete()
    .then(()=>{
      return true;
    });
  };

  updateGroup = async (groupid, groupInfo) => {
    // TODO 
  };

  

  getMembers = async (groupid) => {
    const groupinfo = await this.#groupsRef.doc(groupid).get();
    if (groupinfo.exists) {
      return groupinfo.data().members;
    }

    return null;
  };

  addMember = async (groupid, memberInfo) => {
    const groupRef = await db.collection('group').doc(groupid);
    const groupData = (await groupRef.get()).data();
  
    const updatedMembers = groupData.members
      ? [...groupData.members, memberInfo]
      : [memberInfo];
  
    await groupRef.set({ members: updatedMembers }, { merge: true });
    return true;
  };

  updateMember = async (groupid, updateInfo) => {
    // TODO
  };

  removeMember = async (groupid, memberid) => {
    // TODO
  };



  createFile = async (meta, groupid, file) => {

    const encryptedFile = await this.#encryption.encrypt(groupid, file);

    const fileID = db.collection("group").doc(groupid).collection("files").doc();
    const data = {
      userid: meta.userid,
      filename: meta.filename,
      size: meta.size,
      timestamp: meta.timestamp,
      content: encryptedFile
    };
    
    return await
    fileID.set(data).then(()=>{
      return true;
    })
    .catch((error)=>{
      Log.error(`Error Creating Group File: ${error}`);
      return false;
    });
  }

  getGroupFiles = async (groupid) => {
    return db.collection("group").doc(groupid).collection("files")
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
  };

  downloadFile = async (groupid, fileid) => {
    const doc = await db.collection("group").doc(groupid).collection("files").doc(fileid).get();

    if (doc.exists) {
      const data = doc.data();
      const content = await this.#encryption.decrypt(groupid, data.content);

      return {filename: data.filename, content: content};
    }

    return null;
  };

  deleteFile = async (groupid, fileid) => {
    return await 
    db.collection("group").doc(groupid).collection("files").doc(fileid).delete()
    .then(()=>{
      return true;
    });
  };
};

module.exports = {
  GroupRepo
}