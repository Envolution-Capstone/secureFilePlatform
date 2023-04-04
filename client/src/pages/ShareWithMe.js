import React, { useEffect, useState } from "react";
import { GroupInfo } from "../components/Groups/GroupInfo";
import { DataContainer, DataHeader } from "../styles/DocumentTable.styles";
import DocumentTable from "../components/Documents/DocumentTable";
import { GroupSelector } from "../components/Groups/GroupSelector";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { getUserGroupsWithNames, getGroupInfo, removeMember } from "../util/groups/groups";


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
  const classes = useStyles();

  useEffect(() => {
    getUserGroupsWithNames(user.uid).then((groups) => {
      setUserGroups(groups);
    }).catch((error) => {
      console.log(`Error Setting Groups: ${error}`);
    });
  }, [user]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKickMember = (memberID) => {
    removeMember(groupID, memberID);
  };

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
      <GroupSelector groups={userGroups} set={handleGroupChange} />
      <GroupInfo group={groupID} open={open} onClose={handleClose} handleKickMember={handleKickMember} creator={creator} />
      <Button className={classes.button} variant="contained" color="primary" onClick={handleOpen} disabled={!groupID}>
        View Group Info
      </Button>
      {groupID ? (
        <DocumentTable user={user} route={`/group/${groupID}/files`} />
      ) : (
        <DocumentTable user={user} route={null} />
      )}
    </DataContainer>
  );
};

export default ShareWithMe;
