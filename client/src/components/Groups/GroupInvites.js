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
  

  const acceptInvite = async (groupid) => {
    const userid = auth.currentUser.uid;
    await BackendRequest('POST', `/group/${groupid}/accept/${userid}`);
  };

  const declineInvite = async (groupid) => {
    const userid = auth.currentUser.uid;
    await BackendRequest('POST', `/group/${groupid}/decline/${userid}`);
  };

  return (
    <div>
      {invites ? invites.map((invite) => (
        <div key={invite.groupid}>
          <span>{invite.groupName}</span>
          <Button onClick={() => acceptInvite(invite.groupid)}>Accept</Button>
          <Button onClick={() => declineInvite(invite.groupid)}>Decline</Button>
        </div>
      )) : <></>}
    </div>
  );
};

export default GroupInvites;
