

import { BackendRequest } from "../../requests/client";

const uploadFile = async (file)=> {

  const data = new FormData() 
  data.append('file',file);
  data.append('filename',file.name);
  data.append('groupid', null);
  
  return await BackendRequest('POST', '/file', data);
};


export {
  uploadFile,
};