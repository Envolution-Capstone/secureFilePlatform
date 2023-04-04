

import { BackendRequest } from "../../requests/client";

const uploadFile = async (file, route)=> {

  const data = new FormData() 
  data.append('file',file);
  data.append('filename',file.name);
  return await BackendRequest('POST', route, data);
};


export {
  uploadFile,
};