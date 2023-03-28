import { BackendRequest } from "../../requests/client";


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


export {
  getUserGroups,
  getGroupInfo,
  removeMember,
}