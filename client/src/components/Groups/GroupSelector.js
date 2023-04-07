import { Select, MenuItem } from "@material-ui/core";
import { useState } from "react";



const GroupSelector = ({groups, set}) => {

  const [currGroup, setCurrGroup] = useState("");

  return (
    <Select
          value={currGroup}
          onChange={(e)=>{setCurrGroup(e.target.value); set(e.target.value)}}
          autoWidth
          label="Group">
      {groups.map((group)=>{
        return <MenuItem key={group.groupid} value={group.groupid}>{group.groupname}</MenuItem>
      })}
    </Select>
  );
};

export {
  GroupSelector
}