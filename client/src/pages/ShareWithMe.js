import React, { useEffect, useState } from "react";
import { GroupInfo } from "../components/Groups/GroupInfo";
import { DataContainer, DataHeader } from "../styles/DocumentTable.styles";
import DocumentTable from "../components/Documents/DocumentTable";
import { getUserGroups } from "../util/groups/groups";
import { GroupSelector } from "../components/Groups/GroupSelector";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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
    getUserGroups(user.uid).then((groups) => {
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
    // Functionality to remove member from group
    console.log(`Kicking member ${memberID} from group ${groupID}`);
  };

  const handleGroupChange = (val) => {
    setGroupID(val);
    // Set creator value based on user's status in group
    setCreator(val ? true : false);
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
