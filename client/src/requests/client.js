import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:9000',
  json: true
});

const setAuthHeader = (token)=>{
  console.log(`SETTING AUTH: ${token}`);
  client.defaults.headers.common['authtoken'] = token;
};


export {
  client,
  setAuthHeader,
};