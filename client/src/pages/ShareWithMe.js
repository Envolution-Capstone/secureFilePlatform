import React, { useEffect, useState } from "react";
import { GroupInfo } from "../components/Groups/GroupInfo";
import { DataContainer, DataHeader } from "../styles/DocumentTable.styles";
import DocumentTable from "../components/Documents/DocumentTable";
import {
  getUserGroupsWithNames,
  getAllFilesForGroups,
  getGroupName,
} from "../util/groups/groups";


const ShareWithMe = ({ user, refreshTable, setRefreshTable }) => {

  const [groupID] = useState(null);
  const [open, setOpen] = useState(false);
  const [creator] = useState(false);
  const [files, setFiles] = useState([]);


  useEffect(() => {
    const fetchFiles = async () => {
      const groups = await getUserGroupsWithNames(user.uid);
      console.log("User Groups:", groups);
  
      const allFiles = await getAllFilesForGroups(groups.map((group) => group.groupid));
      console.log("All Files:", allFiles);
  
      const filesWithGroupNames = await Promise.all(
        allFiles.map(async (file) => {
          const groupName = await getGroupName(file.groupID);
          return {
            ...file,
            groupName: groupName || "Unknown",
          };
        })
      );
  
      setFiles(filesWithGroupNames);
    };
  
    fetchFiles().catch((error) => {
      console.log(`Error Setting Groups: ${error}`);
    });
  }, [user, refreshTable]);
  
  


  const handleClose = () => {
    setOpen(false);
  };

  const handleKickMember = (memberID) => {};


  return (
    <DataContainer>
      <DataHeader>Shared With Me</DataHeader>
      <GroupInfo
        group={groupID}
        open={open}
        onClose={handleClose}
        handleKickMember={handleKickMember}
        creator={creator}
      />
      <DocumentTable
        user={user}
        route={`/group/${groupID}/files`}
        sharedFiles={files}
        showGroupColumn
        refreshTable={refreshTable}
        setRefreshTable={setRefreshTable}
      />
    </DataContainer>
  );
};

export default ShareWithMe;
