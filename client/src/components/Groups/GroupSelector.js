import { Select, MenuItem } from "@material-ui/core";
import { useState } from "react";



const GroupSelector = ({groups, set}) => {

  const [currGroup, setCurrGroup] = useState("");

  return (
    <Select
          value={currGroup}
          onChange={(e)=>{setCurrGroup(e.target.value); set(e.target.value)}}
          fullWidth
          label="Group">
      {groups ? groups.map((group)=>{
        return <MenuItem key={group.groupid} value={group.groupid}>{group.groupname}</MenuItem>
      }) : <MenuItem key={"asdfasdfasdfasdfasdfasdfasdf"} value={null}>No Groups</MenuItem> }
    </Select>
  );
};

export {
  GroupSelector
}