require('dotenv').config();

const admin = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');

const serviceAccount = require(`${__dirname}/../../service-account-credentials.json`);

const firebaseApp = initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://file-storage-e6537.firebaseio.com"
});

module.exports = {
  firebaseApp,
};

