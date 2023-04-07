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
        <SidebarBtn>
          <button onClick={() => setShowUpload(!showUpload)}>
            <span> Upload File </span>
          </button>
        </SidebarBtn>
        <DocumentUploadModal user={user} Open={showUpload} onFinished={() => setShowUpload(false)} />

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
          <SidebarBtn>
            <Badge color="error" badgeContent={inviteCount}>
              <button onClick={() => setShowGroupModal(true)}>
                <span> Group </span>
              </button>
            </Badge>
          </SidebarBtn>
        </SidebarOptions>
        <hr />
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
