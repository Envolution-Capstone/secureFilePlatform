import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA7ROErICF1bCa4earw2UoglBq_POrwBrA",
  authDomain: "file-storage-e6537.firebaseapp.com",
  projectId: "file-storage-e6537",
  storageBucket: "file-storage-e6537.appspot.com",
  messagingSenderId: "68930784514",
  appId: "1:68930784514:web:65d2623bfbc3da3f27c61b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const getUserByEmail = async (email) => {
  const usersRef = firebaseApp.firestore().collection('users');
  const snapshot = await usersRef.where('email', '==', email).get();

  if (snapshot.empty) {
    console.log('No matching user found for the email.');
    return null;
  }

  return snapshot.docs[0].id;
};

export { db, storage, auth, provider, getUserByEmail };