
import { db, auth, provider } from "../../firebase/firebase";
import { setAuthHeader } from "../../requests/client";

const signIn = async () => {
  const user = await auth.signInWithPopup(provider);
  auth.currentUser.getIdToken().then(token => setAuthHeader(token))
  db.collection("users")
    .doc(user?.uid)
    .set({
      uid: user?.uid,
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
    })
    .catch((err) => console.log(err));

  return user;
};

export {
  signIn
}