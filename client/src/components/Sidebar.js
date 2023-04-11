import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContainer, SidebarBtn, SidebarOption, SidebarOptions, UploadBtn } from "../styles/Sidebar.styles";
import MobileScreenShareIcon from "@material-ui/icons/MobileScreenShare";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import DocumentUploadModal from "./Documents/DocumentUploadModal";
import GroupModal from "./Groups/GroupModal";
import ComputerIcon from "@material-ui/icons/Computer";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import BackupIcon from "@material-ui/icons/Backup";
import styled from "styled-components";
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import { StorageBarContainer, StorageBar, StorageBarProgress, StorageText } from "../styles/Sidebar.styles";
import GroupsListModal from "./Groups/GroupsListModal";
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

  
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const GroupOptions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 38px;
`;

const GroupOptionsLine = styled.hr`
  flex-grow: ${({ left }) => (left ? 0.1 : 1)};
  borderColor: rgba(255, 255, 255, 0.3);
  borderWidth: 1px;
`;

const GroupOptionsText = styled.span`
  color: #fff;
  margin: 0 10px;
`;

const ButtonIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
`;

const Sidebar = ({ user, setRefreshTable }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showGroupsList, setShowGroupsList] = useState(false);
 

  return (
    <>
      <SidebarContainer>
      <UploadBtn primary>
        <button onClick={() => setShowUpload(!showUpload)}>
          <span> Upload New File </span>
        </button>
      </UploadBtn>
      <DocumentUploadModal user={user} Open={showUpload} onFinished={() => setShowUpload(false)} setRefreshTable={setRefreshTable} />

        <SidebarOptions>
          <StyledNavLink to="/">
            <SidebarOption>
              <MobileScreenShareIcon />
              <span>My Drive</span>
            </SidebarOption>
          </StyledNavLink>
          <StyledNavLink to="/share-with-me">
            <SidebarOption>
              <PeopleAltOutlinedIcon />
              <span>Shared with me</span>
            </SidebarOption>
          </StyledNavLink>
          <StyledNavLink to="/computers">
            <SidebarOption>
              <ComputerIcon />
              <span>Computers</span>
            </SidebarOption>
          </StyledNavLink>
          <StyledNavLink to="/recent">
            <SidebarOption>
              <AccessTimeIcon />
              <span>Recent</span>
            </SidebarOption>
          </StyledNavLink>
          <StyledNavLink to="/starred">
            <SidebarOption>
              <StarBorderIcon />
              <span>Starred</span>
            </SidebarOption>
          </StyledNavLink>
          <StyledNavLink to="/backups">
            <SidebarOption>
              <BackupIcon />
              <span>Backups</span>
            </SidebarOption>
          </StyledNavLink>
          <SidebarOption>
            <DeleteOutlineOutlinedIcon />
            <span>Trash</span>
          </SidebarOption>
          <div style={{ marginTop: "20px" }}>
          <GroupOptions>
            <GroupOptionsLine left />
            <GroupOptionsText>Group Options</GroupOptionsText>
            <GroupOptionsLine />
          </GroupOptions>

          <SidebarBtn>
          <button onClick={() => setShowGroupModal(true)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <ButtonIcon>
              <GroupAddOutlinedIcon />
            </ButtonIcon>
              <span>Create Group</span>
            </div>
          </button>
        </SidebarBtn>
        <SidebarBtn>
          <button onClick={() => setShowGroupsList(true)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <ButtonIcon>
              <PeopleOutlineIcon />
            </ButtonIcon>
              <span>View Groups</span>
            </div>
          </button>
        </SidebarBtn>

        </div>
        </SidebarOptions>
        <StorageBarContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CloudQueueIcon style={{ color: "#fff" }} />
          <span style={{ color: "#fff", marginLeft: "5px" }}>Storage</span>
        </div>
        <StorageBar>
          <StorageBarProgress style={{ width: "10%" }} />
        </StorageBar>
        <StorageText>999 MB out of 1000 MB used</StorageText>
      </StorageBarContainer>
      </SidebarContainer>
      <GroupModal
        user={user}
        open={showGroupModal}
        onClose={() => setShowGroupModal(false)}
      />
      <GroupsListModal
  user={user}
  open={showGroupsList}
  onClose={() => setShowGroupsList(false)}
/>

    </>
  );
};

export default Sidebar;
