import MyDrive from "./pages/MyDrive";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShareWithMe from "./pages/ShareWithMe";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import logo from './assets/logo.png';
import { signIn } from "./util/user/login";

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
const SideBySide = styled.div`
  display:flex; 
  flex-direction:row;
`

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <>
      {user ? (
        <>
          <Header user={user} />
          <BrowserRouter>
          <SideBySide>
          <Sidebar user={user} />
          <Routes>
              <Route index element={<MyDrive user={user} />} />
              <Route path="share-with-me" element={<ShareWithMe user={user} />} />
          </Routes>
          </SideBySide>
          </BrowserRouter>
        </>
      ) : (
        <LoginContainer>
          <img src={logo} alt="logo"/>
          <button onClick={()=>{signIn().then((user)=>{ setUser(user); })}}>Login to Envolution</button>
        </LoginContainer>
      )}
    </>
  );
}

export default App;
