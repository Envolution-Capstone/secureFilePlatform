

import { BackendRequest } from "../../requests/client";

const uploadFile = async (file, groupID) => {
  const data = new FormData();
  data.append("file", file);
  data.append("filename", file.name);

  const route = groupID ? `/group/${groupID}/files` : "/file";
  return await BackendRequest("POST", route, data);
};


export {
  uploadFile,
};