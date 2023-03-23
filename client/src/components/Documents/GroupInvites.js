import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { db, auth } from '../../firebase/firebase';
import firebase from 'firebase/compat/app';

const GroupInvites = () => {
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRef = db.collection('users').doc(auth.currentUser.uid);
      const unsubscribe = userRef.onSnapshot((snapshot) => {
        const userData = snapshot.data();
        setInvites(userData.groupInvites || []);
      });
  
      return () => {
        // Clean up the listener
        unsubscribe();
      };
    };
  
    fetchData();
  }, []);
  

  const acceptInvite = async (groupID) => {
    const userRef = db.collection('users').doc(auth.currentUser.uid);
    const groupRef = db.collection('group').doc(groupID);

    await userRef.update({
      groups: firebase.firestore.FieldValue.arrayUnion({ id: groupID }),
      groupInvites: invites.filter((invite) => invite.groupID !== groupID),
    });

    await groupRef.update({
      members: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid),
    });

    setInvites(invites.filter((invite) => invite.groupID !== groupID));
  };

  const declineInvite = async (groupID) => {
    const userRef = db.collection('users').doc(auth.currentUser.uid);

    await userRef.update({
      groupInvites: invites.filter((invite) => invite.groupID !== groupID),
    });

    setInvites(invites.filter((invite) => invite.groupID !== groupID));
  };

  return (
    <div>
      {invites.map((invite) => (
        <div key={invite.groupID}>
          <span>{invite.groupName}</span>
          <Button onClick={() => acceptInvite(invite.groupID)}>Accept</Button>
          <Button onClick={() => declineInvite(invite.groupID)}>Decline</Button>
        </div>
      ))}
    </div>
  );
};

export default GroupInvites;
