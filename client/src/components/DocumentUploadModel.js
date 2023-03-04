import React from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import { db, storage } from "../firebase/firebase";
import styled from "styled-components";
import { useState } from "react";
import { Modal } from "@material-ui/core";

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
`
const UploadingPara = styled.p`
  background: green;
  color: #fff;
  margin: 20px;
  text-align: center;
  padding: 10px;
  letter-spacing: 1px;
`;

const DocumentUploadModel = ({
  openDocumentUploadModel,
  setOpenDocumentUploadModel,
}) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    storage
      .ref(`files/${file.name}`)
      .put(file)
      .then((snapshot) => {
        console.log(snapshot);
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("myfiles").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              filename: file.name,
              fileURL: url,
              size: snapshot._delegate.bytesTransferred,
            });
            setUploading(false);
            setFile(null);
            setOpenDocumentUploadModel(false);
          });
      });
  };

  return (
    <Modal
      open={openDocumentUploadModel}
      onClose={() => setOpenDocumentUploadModel(false)}
    >
      <ModalPopup>
        <form>
          <ModalHeading>
            <h3>Select file you want to upload</h3>
            
          </ModalHeading>
          <ModalBody>
            {uploading ? (
              <UploadingPara>Uploading...</UploadingPara>
            ) : (
              <>
              
              
                <input
                  type="file"
                  className="modal_selectFile"
                  onChange={handleFile}
                />
                 
                <input
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
  );
};

export default DocumentUploadModel;
