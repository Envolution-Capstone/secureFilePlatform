import React, { useEffect, useState } from "react";
import {
  getUserGroupsWithNames,
  getGroupInfo,
  removeMember,
} from "../../util/groups/groups";
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
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const GroupsListModal = ({ user, open, onClose }) => {
  const [groups, setGroups] = useState([]);
  const [viewMode, setViewMode] = useState("groupList");
  const [currentGroup, setCurrentGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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

    const isAdmin = groupInfo.members.some(
      (member) => member.id === user.uid && member.admin
    );
    setIsAdmin(isAdmin);

    setViewMode("groupMembers");
  };

  const handleBack = () => {
    setViewMode("groupList");
  };

  const onKickMember = async (memberID) => {
    const result = await removeMember(currentGroup.groupid, memberID);
    if (result) {
      setGroupMembers(groupMembers.filter((member) => member.id !== memberID));
    } else {
      console.error("Failed to remove member");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {viewMode === "groupMembers" && (
          <IconButton edge="end" color="inherit" onClick={handleBack} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
        )}
        {viewMode === "groupList"
          ? "Your Groups"
          : `Members of ${currentGroup.groupname}`}
      </DialogTitle>
      <DialogContent>
        {viewMode === "groupList" ? (
          <List>
            {groups.map((group) => (
              <ListItem key={group.groupid}>
                <ListItemText primary={group.groupname} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="view"
                    onClick={() => handleViewMembers(group)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          <List>
            {groupMembers.map((member) => (
              <ListItem key={member.id}>
                <ListItemText primary={member.name} />
                {isAdmin && !member.admin && (
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="kick"
                      onClick={() => onKickMember(member.id)}
                    >
                      {/* Replace this text with a suitable icon */}
                      <HighlightOffIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GroupsListModal;
