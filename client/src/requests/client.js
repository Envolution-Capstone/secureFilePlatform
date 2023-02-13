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


export {
  client,
  setAuthHeader,
};