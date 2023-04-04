
import { auth, provider } from "../../firebase/firebase";
import { BackendRequest } from "../../requests/client";

const signIn = async () => {
  const user = await auth.signInWithPopup(provider);

  if (user.user) {

    const userInfo = {
      uid: user?.user.uid,
      name: user?.user.displayName,
      email: user?.user.email,
      photoURL: user?.user.photoURL,
      groups: [],
    };

    await BackendRequest('POST', `/user/${userInfo.uid}/login`, userInfo);
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