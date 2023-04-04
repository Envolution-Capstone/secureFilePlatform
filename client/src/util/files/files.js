
import { BackendRequest } from "../../requests/client";

const getFiles = async (route) => {
  const response = await BackendRequest('GET', route);

  if (response.data) {
    if (response.data.status === "success") {
      return response.data.data;
    }
  }

  return null;
};


export {
  getFiles,
};