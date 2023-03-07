import MobileScreenShareIcon from "@material-ui/icons/MobileScreenShare";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import DocumentUploadModal from "./Documents/DocumentUploadModal";

import { SidebarContainer, SidebarBtn, SidebarOption, SidebarOptions } from '../styles/Sidebar.styles';


const Sidebar = () => {

  const [showUpload, setShowUpload] = useState(false);

  return (
    <> 
      <SidebarContainer>
      <SidebarBtn>
          <button onClick={() => setShowUpload(!showUpload)}>
              <span> Upload File </span>
          </button>
        </SidebarBtn>
      <DocumentUploadModal Open={showUpload} onFinished={()=> {setShowUpload(false)}}/>

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
