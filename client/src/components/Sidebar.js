import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContainer, SidebarBtn, SidebarOption, SidebarOptions } from "../styles/Sidebar.styles";
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
  



const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const Sidebar = ({ user }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);


  

  return (
    <>
      <SidebarContainer>
      <SidebarBtn primary>
        <button onClick={() => setShowUpload(!showUpload)}>
          <span> Upload New File </span>
        </button>
      </SidebarBtn>
        <DocumentUploadModal user={user} Open={showUpload} onFinished={() => setShowUpload(false)} />

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
          <SidebarBtn>
              <button onClick={() => setShowGroupModal(true)}>
                <span> Group </span>
              </button>
          </SidebarBtn>
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
    </>
  );
};

export default Sidebar;
