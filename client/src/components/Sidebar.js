import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContainer, SidebarBtn, SidebarOption, SidebarOptions } from "../styles/Sidebar.styles";
import MobileScreenShareIcon from "@material-ui/icons/MobileScreenShare";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { Badge } from "@material-ui/core";
import DocumentUploadModal from "./Documents/DocumentUploadModal";
import GroupModal from "./Groups/GroupModal";
import { auth } from "../firebase/firebase";
import { BackendRequest } from "../requests/client";
import ComputerIcon from "@material-ui/icons/Computer";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import BackupIcon from "@material-ui/icons/Backup";
import styled from "styled-components";


const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const Sidebar = ({ user }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [inviteCount, setInviteCount] = useState(0);


  const fetchGroupInvitesCount = async () => {
    try {
      const response = await BackendRequest('GET', `/user/${auth.currentUser.uid}/invites`);
      if (response.data.status === "success") {
        setInviteCount(response.data.data.length);
      } else {
        setInviteCount(0);
      }
    } catch (error) {
      console.error('Error fetching group invites count:', error);
      setInviteCount(0);
    }
  };
  

  useEffect(() => {
    fetchGroupInvitesCount();
  }, []);
  
  

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
            <Badge color="error" badgeContent={inviteCount}>
              <button onClick={() => setShowGroupModal(true)}>
                <span> Group </span>
              </button>
            </Badge>
          </SidebarBtn>
        </SidebarOptions>

      </SidebarContainer>
      <GroupModal
        user={user}
        open={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        onUpdateInviteCount={fetchGroupInvitesCount}
      />
    </>
  );
};

export default Sidebar;
