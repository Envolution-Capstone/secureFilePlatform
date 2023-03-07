import React from "react";
import { useState } from "react";
import { Modal } from "@material-ui/core";
import { uploadFile } from "../../util/files/fileUpload";
import { ModalPopup, ModalBody, UploadingPara, ModalHeading } from "../../styles/DocumentUploadModal.styles";

const DocumentUploadModal = ({ Open, onFinished }) => {
  const [uploading, setUploading] = useState(false);
  const [encryptKey, setEncryptKey] = useState(null);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    
    uploadFile(file)
    .then(()=> {
      setUploading(false);
      onFinished();
    });
  };

  return (
    <Modal open={Open} onClose={()=> onFinished()}>
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
                <input type="text" className="encrypt_key" onChange={(e)=>{setEncryptKey(e.target.value)}} />
                <input type="file" className="modal_selectFile" onChange={handleFile} />
                <input type="submit" className="modal_submitFile" onClick={handleUpload}/>
              </>
            )}
          </ModalBody>
        </form>
      </ModalPopup>
    </Modal>
  );
};

export default DocumentUploadModal;
