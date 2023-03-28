import { BackendRequest } from "../../requests/client";
import { db } from '../../firebase/firebase';



const getUserGroups = async (userID) => {
  const resp = await BackendRequest('GET', `/user/${userID}/group`);
  if (resp.data) {
    return resp.data.data;
  }
  return [];
};

const getGroupInfo = async (groupID) => {
  const resp = await BackendRequest('GET', `/group/${groupID}`);
  if (resp.data) {
    return resp.data.data;
  }
  return null;
};

const removeMember = async (groupID, memberID) => {
  const resp = await BackendRequest('DELETE', `/group/${groupID}/member/${memberID}`);
  if (resp.data) {
    return resp.data;
  }
  return null;
};

const getUserGroupsWithNames = async (userID) => {
  const userDoc = await db.collection("users").doc(userID).get();
  const userData = userDoc.data();

  if (!userData.groups) {
    return [];
  }

  const groupPromises = userData.groups.map(async (group) => {
    const groupDoc = await db.collection("group").doc(group.id).get();
    return { ...group, name: groupDoc.data().name };
  });

  return Promise.all(groupPromises);
};



export { getGroupInfo, getUserGroups, getUserGroupsWithNames, removeMember };
