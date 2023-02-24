import MobileScreenShareIcon from "@material-ui/icons/MobileScreenShare";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import PublishIcon from '@material-ui/icons/Publish';
import styled from "styled-components";
import { useState } from "react";
import { Modal } from "@material-ui/core";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import { BackendRequest, setAuthHeader } from "../requests/client";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase/firebase";

import { client } from "../requests/client";
const SidebarContainer = styled.div`
  margin-top: 10px;
`;
const SidebarBtn = styled.div`
  button {
    background: transparent;
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    border-radius: 40px;
    padding: 5px 10px;
    box-shadow: 2px 2px 2px #ccc;
    margin-left: 20px;
    span {
      font-size: 16px;
      margin-right: 20px;
      margin-left: 10px;
    }
    &:hover {
      background: lightblue;
      cursor: pointer;
    }
  }
`;

const SidebarOptions = styled.div`
  margin-top: 10px;
  .progress_bar {
    padding: 0px 20px;
  }
  .progress_bar span {
    display: block;
    color: #333;
    font-size: 13px;
  }
`;

const SidebarOption = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 0px 20px 20px 0px;
  &:hover {
    background: lightblue;
    cursor: pointer;
  }
  svg.MuiSvgIcon-root {
    color: rgb(78, 78, 78);
  }
  span {
    margin-left: 15px;
    font-size: 13px;
    font-weight: 500;
    color: rgb(78, 78, 78);
  }
`;

const ModalPopup = styled.div`
  top: 50%;
  background-color: #fff;
  width: 500px;
  margin: 0px auto;
  position: relative;
  transform: translateY(-50%);
  padding: 10px;
  border-radius: 10px;
`;

const ModalHeading = styled.div`
  text-align: center;
  border-bottom: 1px solid lightgray;
  height: 40px;
`;

const ModalBody = styled.div`
input.modal_submitFile {
  width: 100%;
  background: mediumblue;
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
input.modal_selectFile {
  background: white;
  padding: 13px;
  color: #000;
  display: block;
  margin-top:20px
}
`;

const UploadingPara = styled.p`
  background: green;
  color: #fff;
  margin: 20px;
  text-align: center;
  padding: 10px;
  letter-spacing: 1px;
`;
const Sidebar = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState('');
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    console.log(encryptionKey);

//work on bcrypt
    const data = new FormData() 
    data.append('file',file);
    data.append('filename',file.name);
    data.append('groupid',null);
    
    BackendRequest(user, 'POST', '/file', data)   

    setUploading(false);
    setFile(null);
    setEncryptionKey('');
    setOpen(false);
  }
  


  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalPopup>
          <form>
          <ModalHeading>
              <h3>Select file(s) to upload</h3>
            </ModalHeading>
          
           
            <ModalBody>
            <h3>Encryption key</h3>
            <input type="text" id="encryptionKey" name="encryptionKey" onChange={event => setEncryptionKey(event.target.value)}  value={encryptionKey}/>
              {uploading ? (
                <UploadingPara>Uploading...</UploadingPara>
              ) : (
                <>
                  <input
                    type="file"
                    className="modal_selectfile"
                    onChange={handleFile}
                  />
                  <input
                  disabled={encryptionKey.length < 8 || encryptionKey.length > 16 }
                  type="submit"
                    className="modal_submitFile"
                    onClick={handleUpload}
                  />
                </>
              )}
            </ModalBody>
          </form>
        </ModalPopup>
      </Modal>
      <SidebarContainer>
        <SidebarBtn>
          <button onClick={() => setOpen(true)}>
              <PublishIcon />
              <span> Upload File </span>
          </button>
        </SidebarBtn>
        <SidebarOptions>
          <NavLink to="/">
            <SidebarOption>
              <MobileScreenShareIcon />
              <span>My Drive</span>
            </SidebarOption>
          </NavLink>
          <NavLink to="/share-with-me">
            <SidebarOption>
              <PeopleAltOutlinedIcon />
              <span>Shared with me</span>
            </SidebarOption>
          </NavLink>
          <SidebarOption>
            <DeleteOutlineOutlinedIcon />
            <span>Trash</span>
          </SidebarOption>
        </SidebarOptions>
        <hr />
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
