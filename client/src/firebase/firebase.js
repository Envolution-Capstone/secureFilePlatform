import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey:           "AIzaSyA7ROErICF1bCa4earw2UoglBq_POrwBrA",
  authDomain:       "file-storage-e6537.firebaseapp.com",
  projectId:        "file-storage-e6537",
  storageBucket:    "file-storage-e6537.appspot.com",
  messagingSenderId:"68930784514",
  appId:            "1:68930784514:web:65d2623bfbc3da3f27c61b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {
  auth,
  provider,
};

