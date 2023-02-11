import MyDrive from "./pages/MyDrive";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { auth, db, provider } from "./firebase/firebase";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ShareWithMe from "./pages/ShareWithMe";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import logo from './assets/logo.png';

const LoginContainer = styled.div`
  background: white;
  padding: 20px;
  width: 400px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  img {
    width: 200px;
  }
  button {
    width: 100%;
    background: lightblue;
    padding: 10px 20px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 16px;
    border: 0;
    outline: 0;
    border-radius: 5px;
    cursor: pointer;
    margin-top:20px
  }
`;
function App() {
  const [user, setUser] = useState(null);
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        db.collection("users")
          .doc(user?.uid)
          .set({
            uid: user?.uid,
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);
  return (
    <>
      {user ? (
        <>
          <BrowserRouter>
            <Header user={user} />
            <Routes>
              <Route
                path="/"
                element={
                  <div className="App">
                    <Sidebar user={user} />
                    <Outlet />
                  </div>
                }
              >
                <Route index element={<MyDrive user={user} />} />
                <Route
                  path="share-with-me"
                  element={<ShareWithMe user={user} />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </>
      ) : (
        <LoginContainer>
          <img src={logo} alt="logo"/>
          <button onClick={signIn}>Login to Envolution</button>
        </LoginContainer>
      )}
    </>
  );
}

export default App;
