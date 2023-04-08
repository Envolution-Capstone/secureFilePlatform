// client/src/components/UserDetails.js
import React from "react";
import { Avatar } from "@material-ui/core";

const UserDetails = ({ user }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar src={user?.photoURL} />
      <div style={{ marginLeft: "10px" }}>
        <p style={{ fontSize: "14px", fontWeight: "bold", margin: 0 }}>{user?.name}</p>
        <p style={{ fontSize: "12px", margin: 0 }}>{user?.email}</p>
      </div>
    </div>
  );
};

export default UserDetails;
