import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { uploadFile } from "../../util/files/fileUpload";
import { ModalPopup, ModalBody, UploadingPara, ModalHeading } from "../../styles/DocumentUploadModal.styles";
import { GroupSelector } from "../Groups/GroupSelector";
import { SideBySide } from "../../styles/App.styles";

import { SidebarBtn } from "./../../styles/Sidebar.styles";
import styled from "styled-components";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';


import { getUserGroupsWithNames } from "../../util/groups/groups";


const ButtonIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
`;

const DocumentUploadModal = ({ user, Open, onFinished, setRefreshTable, updateGroups }) => {
  const [uploading, setUploading] = useState(false);
  const [userGroups, setUserGroups] = useState(null);
  const [groupID, setGroupID] = useState(null);
  const [file, setFile] = useState(null);


  useEffect(() => {
    getUserGroupsWithNames(user.uid).then((groups) => {
      setUserGroups(groups);
    }).catch((error) => {
      console.log(`Error Setting Groups: ${error}`);
    });
  }, [user, updateGroups]);
  


  const handleFile = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    uploadFile(file, groupID)
      .then(() => {
        setUploading(false);
        onFinished();
        setRefreshTable((prev) => !prev);
      })
      .finally(() => {
        setGroupID(null);
      });
  };
  

  const handleGroupChange = (groupId) => {
    setGroupID(groupId || null);
  }
  

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
                <SideBySide>
                  <input type="file" className="modal_selectFile" onChange={handleFile} />
                </SideBySide>
                <br/><br/>
                <SideBySide>
                <ButtonIcon>
                      <PeopleOutlineIcon />
                    </ButtonIcon>
                      <span>Select A Group To Share With</span>
                </SideBySide>
                <GroupSelector groups={userGroups} set={handleGroupChange} />
                <br/><br/>
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
