
import { db, auth, provider } from "../../firebase/firebase";
import { setAuthHeader } from "../../requests/client";

const signIn = async () => {
  const user = await auth.signInWithPopup(provider);
  auth.currentUser.getIdToken().then(token => setAuthHeader(token))
  db.collection("users")
    .doc(user?.user.uid)
    .set({
      uid: user?.user.uid,
      name: user?.user.displayName,
      email: user?.user.email,
      photoURL: user?.user.photoURL,
    })
    .catch((err) => console.log(err));

  return user.user;
};

export {
  signIn
}