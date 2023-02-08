import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Data from "./components/Data";

import logo from './assets/logo.png';

import { auth, provider } from "./firebase/firebase";
import styled from 'styled-components';
import { useState } from "react";

import { setAuthHeader } from "./requests/client";

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
`

function App() {
  const [user, setUser] = useState(null);

  const signIn = () => {
    auth.signInWithPopup(provider).then((user) => {
      setUser(user.credential);
      auth.currentUser.getIdToken().then((token)=>{
        setAuthHeader(token);
      });
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <>
    {
      user ? (
        <>
          <Header photoURL={user.photoURL} />
          <div className="App">
            <Sidebar />
            <Data />
          </div>
        </>
      ) : (
        <LoginContainer>
          <img src={logo} alt="logo"/>
          <button onClick={signIn}>Login to Envolution</button>
        </LoginContainer>
      )
    }
  </>
);
}

export default App;
