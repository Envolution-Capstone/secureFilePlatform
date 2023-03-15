import React, { useEffect, useState } from "react";
import { GroupInfo } from "../components/Groups/GroupInfo";
import { DataContainer, DataHeader } from "../styles/DocumentTable.styles";
import DocumentTable from "../components/Documents/DocumentTable";
import { getUserGroups } from "../util/groups/groups";
import { GroupSelector } from "../components/Groups/GroupSelector";

const ShareWithMe = ({ user }) => {

  const [userGroups, setUserGroups] = useState([]);
  const [groupID, setGroupID] = useState(null);

  useEffect(() => {
    getUserGroups(user.uid).then((groups)=>{
      setUserGroups(groups);
    }).catch((error)=>{
      console.log(`Error Setting Groups: ${error}`);
    });
  }, [user]);

  return (
    <DataContainer>
      <DataHeader>Shared With Me</DataHeader>
      <GroupSelector groups={userGroups} set={(val)=>{setGroupID(val);}}/>
      <GroupInfo group={groupID}/>
      {groupID ? (
        <DocumentTable user={user} route={`/group/${groupID}/files`} />
      ) : (
        <DocumentTable user={user} route={null} />
      )}
    </DataContainer>
  );
};

export default ShareWithMe;