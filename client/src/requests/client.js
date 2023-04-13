
import axios from 'axios';
import { auth } from '../firebase/firebase';

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

const BackendRequest = async (type, route, data)=>{
  const user = auth.currentUser;
  if (user){
    const id = await auth.currentUser.getIdToken();
    setAuthHeader(id || null);
  }

  switch(type) {
    case "GET":
      return await client.get(route).catch((error)=>{
        console.log(`Backend Request Error: ${error}`);
      });
    case "POST":
      return await client.post(route, data).catch((error)=>{
        console.log(`Backend Request Error: ${error}`);
      });
    case "PUT":
      return await client.put(route, data).catch((error)=>{
        console.log(`Backend Request Error: ${error}`);
      });
    case "DELETE":
      return await client.delete(route, data).catch((error)=>{
        console.log(`Backend Request Error: ${error}`);
      });
    default:
      throw new Error(`Wrong Request Type: ${type}`);
  }
};


export {
  client,
  setAuthHeader,
  BackendRequest,
};