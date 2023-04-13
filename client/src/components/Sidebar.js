import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContainer, SidebarBtn, SidebarOption, SidebarOptions, UploadBtn } from "../styles/Sidebar.styles";
import MobileScreenShareIcon from "@material-ui/icons/MobileScreenShare";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import DocumentUploadModal from "./Documents/DocumentUploadModal";
import GroupModal from "./Groups/GroupModal";
import styled from "styled-components";
import GroupsListModal from "./Groups/GroupsListModal";
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import InviteUserModal from "./Groups/InviteUserModal";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

  
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
  const [showInviteUserModal, setShowInviteUserModal] = useState(false);
  const [updateGroups, setUpdateGroups] = useState(false);


  return (
    <>
      <SidebarContainer>
      <UploadBtn primary>
        <button onClick={() => setShowUpload(!showUpload)}>
          <span> Upload New File </span>
        </button>
      </UploadBtn>
      <DocumentUploadModal user={user} Open={showUpload} onFinished={() => setShowUpload(false)} setRefreshTable={setRefreshTable} updateGroups={updateGroups} />

        <SidebarOptions>
          <StyledNavLink to="/">
            <SidebarOption>
              <MobileScreenShareIcon />
              <span>My Files</span>
            </SidebarOption>
          </StyledNavLink>
          <StyledNavLink to="/share-with-me">
            <SidebarOption>
              <PeopleAltOutlinedIcon />
              <span>Shared with me</span>
            </SidebarOption>
          </StyledNavLink>
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
        <SidebarBtn>
          <button onClick={() => setShowInviteUserModal(true)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ButtonIcon>
                <PersonAddOutlinedIcon />
              </ButtonIcon>
              <span>Invite User</span>
            </div>
          </button>
        </SidebarBtn>

        </div>
        </SidebarOptions>
      </SidebarContainer>
      <GroupModal
        user={user}
        open={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        updateGroups={updateGroups}
        setUpdateGroups={setUpdateGroups}
      />
      <GroupsListModal
        user={user}
        open={showGroupsList}
        onClose={() => setShowGroupsList(false)}
      />
      <InviteUserModal
        user={user}
        open={showInviteUserModal}
        onClose={() => setShowInviteUserModal(false)}
      />
    </>
  );
};

export default Sidebar;
