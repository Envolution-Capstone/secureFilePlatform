require('dotenv').config();

const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
  apiKey:           process.env.APIKEY,
  authDomain:       process.env.AUTHDOMAIN,
  projectId:        process.env.PROJECTID,
  storageBucket:    process.env.STORAGEBUCKET,
  messagingSenderId:process.env.MESSAGINGSENDERID,
  appId:            process.env.APPID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);


module.exports = {
  auth,
};