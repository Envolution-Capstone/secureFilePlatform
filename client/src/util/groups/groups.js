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
    if (resp.data.status === "success") {
      return resp.data.data;
    }
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
  const response = await BackendRequest('GET', `/user/${userID}/groups`);
  
  if (response.data) {
    if (response.data.status === "success") {
      console.log(JSON.stringify(response));
      return response.data.data;
    }
  }

  return [];
};

export { getGroupInfo, getUserGroups, getUserGroupsWithNames, removeMember };
