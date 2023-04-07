import React, { useState } from 'react';
import {
  Modal,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GroupInvites from './GroupInvites';
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
  tabPanel: {
    marginTop: theme.spacing(2),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other} = props;

return (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box>{children}</Box>}
  </div>
);
}

const GroupModal = ({ open, onClose, onUpdateInviteCount }) => {
const classes = useStyles();
const [groupName, setGroupName] = useState('');
const [email, setEmail] = useState('');
const [tabValue, setTabValue] = useState(0);

const handleTabChange = (event, newValue) => {
  setTabValue(newValue);
};

const handleCreateGroup = async () => {
  const group = await BackendRequest('POST', '/group', {
    name: groupName
  });
  inviteUserToGroup(email, group.data.data.groupid);
  onClose();
};

const inviteUserToGroup = async (userEmail, groupID) => {
  await BackendRequest('POST', `/group/${groupID}/members/${userEmail}`);
};

return (
  <Modal open={open} onClose={onClose} className={classes.modal}>
    <div className={classes.modalContent}>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Create Group" />
        <Tab label="Group Invites" />
      </Tabs>
      <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
        <Typography variant="h6">Create a Group</Typography>
        <TextField
          label="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className={classes.textField}
          fullWidth
        />
        <TextField
          label="Invite User (Email)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.textField}
          fullWidth
        />
        <Button onClick={handleCreateGroup} variant="contained" color="primary">
          Create Group
        </Button>
      </TabPanel>
      <TabPanel value={tabValue} index={1} className={classes.tabPanel}>
        <GroupInvites onUpdateInviteCount={onUpdateInviteCount} />
      </TabPanel>
    </div>
  </Modal>
);
};

export default GroupModal;
