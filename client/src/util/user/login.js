
import { db, auth, provider } from "../../firebase/firebase";
import { setAuthHeader } from "../../requests/client";

const signIn = async () => {
  const user = await auth.signInWithPopup(provider);
  if (user.user) {
    auth.currentUser.getIdToken().then(token => setAuthHeader(token))
    db.collection("users")
      .doc(user?.user.uid)
      .set({
        uid: user?.user.uid,
        name: user?.user.displayName,
        email: user?.user.email,
        photoURL: user?.user.photoURL,
        groups: [],
      })
      .catch((err) => console.log(err));
  
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