import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Typography, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getUserGroupsWithNames } from '../../util/groups/groups';
import { BackendRequest } from '../../requests/client';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    borderRadius: '8px',
    minWidth: '400px',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    minWidth: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const InviteUserModal = ({ user, open, onClose }) => {
    const classes = useStyles();
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [email, setEmail] = useState('');
  
    useEffect(() => {
        const fetchGroups = async () => {
          if (user) {
            const userGroups = await getUserGroupsWithNames(user.uid);
            setGroups(userGroups);
          }
        };
    
        fetchGroups();
      }, [user, open]);

  const handleInviteUser = async () => {
    if (selectedGroup && email) {
      await BackendRequest('POST', `/group/${selectedGroup}/members/${email}`);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.modalContent}>
        <Typography variant="h6">Invite User to Group</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="group-select-label">Select Group</InputLabel>
          <Select
            labelId="group-select-label"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            {groups?.map((group) => (
              <MenuItem key={group.groupid} value={group.groupid}>{group.groupname}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.textField}
          fullWidth
        />
        <Button onClick={handleInviteUser} variant="contained" color="primary">
          Invite User
        </Button>
      </div>
    </Modal>
  );
};

export default InviteUserModal;
