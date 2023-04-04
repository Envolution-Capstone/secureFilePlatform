import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Modal,
  Typography,
  Divider,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { getGroupInfo, removeMember } from "../../util/groups/groups";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  item:{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
},
kickBtn: {
  marginLeft: "8px",
},
}));

const GroupInfo = ({ group, open, onClose, handleKickMember, creator }) => {
const [groupInfo, setGroupInfo] = useState({});
const classes = useStyles();

useEffect(() => {
  if (group) {
    getGroupInfo(group)
      .then((info) => {
        setGroupInfo(info);
      })
      .catch((error) => {
        console.log(`Error Fetching Group Info: ${error}`);
      });
  }
}, [group]);

const handleKick = (memberID) => {
  handleKickMember(memberID);
  removeMember(group, memberID)
    .then(() => {
      // Update the groupInfo state to remove the kicked member
      setGroupInfo((prevState) => {
        return {
          ...prevState,
          members: prevState.members.filter((member) => member.id !== memberID),
        };
      });
    })
    .catch((error) => {
      console.error(`Error removing member ${memberID} from group ${group}: ${error}`);
    });
};


return (
<Modal open={open} onClose={onClose}>
    <div className={classes.modal}>
      <Typography className={classes.title} variant="h5">
        Group Members
      </Typography>
      <Divider />
      <List>
        {groupInfo ? groupInfo.members &&
          groupInfo.members.map((member) => (
            <ListItem key={member.id} className={classes.item}>
              <ListItemAvatar>
                <Avatar alt={member.displayName} src={member.photoURL} />
              </ListItemAvatar>
              <ListItemText
                primary={member.displayName}
                secondary={member.email}
                secondaryTypographyProps={{
                  component: "span",
                  display: "block",
                }}
              >
                {groupInfo.createdBy === member.id && (
                  <Typography variant="caption" color="secondary">
                    (Admin)
                  </Typography>
                )}
              </ListItemText>

              {creator && (
                <Tooltip title="Kick from group">
                  <IconButton
                    className={classes.kickBtn}
                    edge="end"
                    aria-label="kick"
                    onClick={() => handleKick(member.id)}
                  >
                    <Clear />
                  </IconButton>
                </Tooltip>
              )}
            </ListItem>
          )) : <></>}
      </List>
    </div>
  </Modal>
);
};

GroupInfo.propTypes = {
  group: PropTypes.string,
  modalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleKickMember: PropTypes.func.isRequired,
  creator: PropTypes.bool.isRequired,
};


export { GroupInfo };
