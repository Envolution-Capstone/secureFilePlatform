
import { db, auth, provider } from "../../firebase/firebase";
import { setAuthHeader } from "../../requests/client";

const signIn = async () => {
  const user = await auth.signInWithPopup(provider);
  if (user.user) {
    auth.currentUser.getIdToken().then(token => setAuthHeader(token));
    const userRef = db.collection("users").doc(user?.user.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await userRef.set({
        uid: user?.user.uid,
        name: user?.user.displayName,
        email: user?.user.email,
        photoURL: user?.user.photoURL,
        groups: [],
      });
    }

    localStorage.setItem("user", JSON.stringify(user.user));

    return user.user;
  }

  return null;
};


const signOut = async () => {
  auth
  .signOut()
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem("user");
      window.location.reload();
    })
    .catch((error) => {
      // An error happened.
      alert(error);
    });
};

export {
  signIn,
  signOut
}