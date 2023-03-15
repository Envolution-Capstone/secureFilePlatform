import MyDrive from "./pages/MyDrive";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShareWithMe from "./pages/ShareWithMe";
import logo from './assets/logo.png';
import { signIn } from "./util/user/login";
import { auth } from './firebase/firebase';

import { SideBySide, LoginContainer } from "./styles/App.styles";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(authUser=>{
      if (authUser) {
        setUser(authUser);
        localStorage.setItem("user", JSON.stringify(authUser.providerData));
      } else {
        setUser(null);
      }
    });
  }, [user]);

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
