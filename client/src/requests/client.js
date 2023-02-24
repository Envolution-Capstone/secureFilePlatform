
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:9000',
  json: true
});

const setAuthHeader = (token)=>{
  if (token) {
    client.defaults.headers.common['authtoken'] = token;
  } else {
    delete client.defaults.headers.common['authtoken'];
  }
};

const BackendRequest = async (user, type, route, data)=>{
  if (user.stsTokenManager?.accessToken) {
    setAuthHeader(user.stsTokenManager.accessToken);
  }

  switch(type) {
    case "GET":
      return await client.get(route);
    case "POST":
      return await client.post(route, data);
    case "PUT":
      return await client.put(route, data);
    case "DELETE":
      return await client.delete(route, data);
    default:
      throw new Error(`Wrong Request Type: ${type}`);
  }
};


export {
  client,
  setAuthHeader,
  BackendRequest,
};