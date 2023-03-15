import { useEffect, useState } from "react";
import { getGroupInfo } from "../../util/groups/groups";


const GroupInfo = ({group}) => {

  const [groupInfo, setGroupInfo] = useState(null);

  useEffect(()=>{
    if (group) {
      getGroupInfo(group).then((info)=>{
        if (info) {
          console.log(`New Info: ${JSON.stringify(info)}`);
          setGroupInfo(info);
        } else {
          setGroupInfo(null);
        }
      })
      .catch((error)=>{
        console.log(`Error Getting Group Info: ${error}`);
        setGroupInfo(null);
      });
    }
  }, [group]);

  return (
    <>
    { 
    groupInfo ? (<h1>{groupInfo.name}</h1>) : (<></>)
    }
    </>
  )
  
};

export {
  GroupInfo,
}