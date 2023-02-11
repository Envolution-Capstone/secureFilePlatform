import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import { db } from "../firebase/firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import { useStyles } from "./MuiStyle";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const UpdateGroupModel = ({
  openUpdateGroupModel,
  setOpenUpdateGroupModel,
  listOfUsers,
  user,
  group,
}) => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [groupName, setGroupName] = useState(group?.groupName);
  const classes = useStyles();
  console.log(personName);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenUpdateGroupModel(false);
    }
  };

  const handleSubmit = () => {
    if (!groupName) return;
    let members = personName.map(({ uid }) => uid);
    members.unshift(user.uid);
    db.collection("groups")
      .add({
        groupName: groupName,
        admin: user.uid,
        members,
        // files:[],
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        handleClose();
      })
      .catch((err) => alert(err));
  };

  // console.log(group);

  return (
    <Dialog
      disableEscapeKeyDown
      open={openUpdateGroupModel}
      onClose={() => setOpenUpdateGroupModel(false)}
    >
      <DialogTitle>Update Group</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "flex" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              onChange={(e) => setGroupName(e.target.value)}
              value={groupName}
              id="outlined-basic"
              label="Group Name"
              variant="outlined"
            />
          </FormControl>
          <FormControl
            className={classes.selectBox}
            sx={{ m: 1, width: 300, mt: 3 }}
          >
            <Select
              style={{ width: "230px" }}
              multiple
              displayEmpty
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Users</em>;
                }
                return selected.map((data) => data.name).join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Users</em>
              </MenuItem>
              {listOfUsers?.map(({ id, data }) => {
                if (user.uid === id) return null;
                return (
                  <MenuItem
                    key={id}
                    value={data}
                    style={getStyles(data?.name, personName, theme)}
                  >
                    {data?.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions style={{ marginTop: 20 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateGroupModel;
