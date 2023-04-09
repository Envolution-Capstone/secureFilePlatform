import React, { useState, useEffect } from 'react';
import { Badge, IconButton, Popover, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { auth } from '../firebase/firebase';
import { BackendRequest } from '../requests/client';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';


const AlertsButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [invites, setInvites] = useState([]);
  const [inviteCount, setInviteCount] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const fetchGroupInvites = async () => {
    try {
      const response = await BackendRequest('GET', `/user/${auth.currentUser.uid}/invites`);
      if (response.data.status === "success") {
        setInvites(response.data.data);
        setInviteCount(response.data.data.length);
      } else {
        setInvites([]);
        setInviteCount(0);
      }
    } catch (error) {
      console.error('Error fetching group invites:', error);
      setInvites([]);
      setInviteCount(0);
    }
  };

  useEffect(() => {
    fetchGroupInvites();
  }, []);

  const acceptInvite = async (groupid) => {
    const userid = auth.currentUser.uid;
    await BackendRequest('POST', `/group/${groupid}/accept/${userid}`);
    fetchGroupInvites();
  };
  
  const declineInvite = async (groupid) => {
    const userid = auth.currentUser.uid;
    await BackendRequest('POST', `/group/${groupid}/decline/${userid}`);
    fetchGroupInvites();
  };

  return (
    <div>
    <IconButton color="inherit" onClick={handleClick} style={{ marginRight: '100px' }}>
    <Badge badgeContent={inviteCount} color="error">
        <NotificationsIcon />
    </Badge>
    </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List>
          {invites.map((invite) => (
            <ListItem key={invite.groupid}>
            <div style={{ maxWidth: '220px', paddingRight: '33px' }}>
            <ListItemText primary={`${invite.senderName} has invited you to ${invite.groupName}`} primaryTypographyProps={{ style: { wordWrap: 'break-word', fontSize: '0.875rem' } }} />
            </div>
            <ListItemSecondaryAction>
            <IconButton onClick={() => acceptInvite(invite.groupid)} edge="end" aria-label="accept">
                <CheckIcon />
            </IconButton>
            <IconButton onClick={() => declineInvite(invite.groupid)} edge="end" aria-label="decline">
                <CloseIcon />
            </IconButton>
            </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default AlertsButton;
