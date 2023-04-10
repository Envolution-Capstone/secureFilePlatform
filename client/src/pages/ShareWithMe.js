import React, { useEffect, useState } from "react";
import { GroupInfo } from "../components/Groups/GroupInfo";
import { DataContainer, DataHeader } from "../styles/DocumentTable.styles";
import DocumentTable from "../components/Documents/DocumentTable";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  getUserGroupsWithNames,
  getGroupInfo,
  getAllFilesForGroups,
  getGroupName,
} from "../util/groups/groups";

const useStyles = makeStyles(() => ({
  button: {
    margin: "10px",
  },
}));

const ShareWithMe = ({ user }) => {
  const [userGroups, setUserGroups] = useState([]);
  const [groupID, setGroupID] = useState(null);
  const [open, setOpen] = useState(false);
  const [creator, setCreator] = useState(false);
  const [files, setFiles] = useState([]);
  const classes = useStyles();
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      const groups = await getUserGroupsWithNames(user.uid);
      console.log("User Groups:", groups);
  
      const allFiles = await getAllFilesForGroups(groups.map((group) => group.groupid));
      console.log("All Files:", allFiles);
  
      // Fetch group names using the getGroupName function
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
  }, [user]);
  
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKickMember = (memberID) => {};

  const handleGroupChange = async (val) => {
    setGroupID(val);
    if (val) {
      const groupInfo = await getGroupInfo(val);
      setCreator(groupInfo.createdBy === user.uid);
    } else {
      setCreator(false);
    }
  };

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
      {/* <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleOpen}
        disabled={!groupID}
      >
        View Group Info
      </Button> */}
      <DocumentTable
        user={user}
        sharedFiles={files}
        showGroupColumn
        refreshTable={refreshTable}
        setRefreshTable={setRefreshTable}
      />
    </DataContainer>
  );
};

export default ShareWithMe;
