import React, { useEffect, useState } from "react";
import { getUserGroupsWithNames, getGroupInfo } from "../../util/groups/groups";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const GroupsListModal = ({ user, open, onClose }) => {
  const [groups, setGroups] = useState([]);
  const [viewMode, setViewMode] = useState("groupList");
  const [currentGroup, setCurrentGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      if (user) {
        const userGroups = await getUserGroupsWithNames(user.uid);
        setGroups(userGroups);
      }
    };

    fetchGroups();
  }, [user, open]);

  const handleViewMembers = async (group) => {
    setCurrentGroup(group);
    const groupInfo = await getGroupInfo(group.groupid);
    setGroupMembers(groupInfo.members);
    setViewMode("groupMembers");
  };
  

  const handleBack = () => {
    setViewMode("groupList");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {viewMode === "groupList" ? "Your Groups" : `Members of ${currentGroup.groupname}`}
        {viewMode === "groupMembers" && (
          <IconButton edge="end" color="inherit" onClick={handleBack} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent>
        {viewMode === "groupList" ? (
          <List>
            {groups.map((group) => (
              <ListItem key={group.groupid}>
                <ListItemText primary={group.groupname} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="view" onClick={() => handleViewMembers(group)}>
                    <VisibilityIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          <List>
            {groupMembers.map((member) => (
              <ListItem key={member.uid}>
                <ListItemText primary={member.name} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GroupsListModal;
