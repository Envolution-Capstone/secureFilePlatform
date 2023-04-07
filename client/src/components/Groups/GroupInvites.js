import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { auth } from '../../firebase/firebase';
import { BackendRequest } from '../../requests/client';

const GroupInvites = ({ onUpdateInviteCount }) => {
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userid = auth.currentUser.uid;
      const response = await BackendRequest('GET', `/user/${userid}/invites`);
      setInvites(response.data.data || []);
    };
  
    fetchData();
  }, []);
  

  const acceptInvite = async (groupID) => {
    const userid = auth.currentUser.uid;
    await BackendRequest('POST', `/group/${groupID}/accept/${userid}`);
  };

  const declineInvite = async (groupID) => {
    const userid = auth.currentUser.uid;
    await BackendRequest('POST', `/group/${groupID}/decline/${userid}`);
  };

  return (
    <div>
      {invites ? invites.map((invite) => (
        <div key={invite.groupID}>
          <span>{invite.groupName}</span>
          <Button onClick={() => acceptInvite(invite.groupID)}>Accept</Button>
          <Button onClick={() => declineInvite(invite.groupID)}>Decline</Button>
        </div>
      )) : <></>}
    </div>
  );
};

export default GroupInvites;
