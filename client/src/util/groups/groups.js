import { BackendRequest } from "../../requests/client";
import { getFiles } from "../files/files";

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
  const resp = await BackendRequest('DELETE', `/group/${groupID}/members/${memberID}`);
  if (resp.data) {
    return resp.data;
  }

  return null;
};

const getUserGroupsWithNames = async (userID) => {
  const response = await BackendRequest('GET', `/user/${userID}/groups`);
  
  if (response.data) {
    if (response.data.status === "success") {
      return response.data.data;
    }
  }

  return [];
};

const getAllFilesForGroups = async (groupIDs) => {
  try {
    const allFiles = [];

    for (const groupID of groupIDs) {
      const files = await getFiles(`/group/${groupID}/files`);
      console.log(`Files for group ${groupID}:`, files);
      const filesWithGroupID = files.map((file) => ({
        ...file,
        groupID: groupID,
      }));
      allFiles.push(...filesWithGroupID);
    }

    return allFiles;
  } catch (error) {
    console.error(`Error fetching all files for groups: ${error}`);
    return [];
  }
};


export { getGroupInfo, getUserGroups, getUserGroupsWithNames, removeMember, getAllFilesForGroups };
