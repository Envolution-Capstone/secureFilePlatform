import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import GroupModel from "../components/GroupModel";
import DocumentUploadModel from "../components/DocumentUploadModel";
import DocumentTable from "../components/DocumentTable";
import { db } from "../firebase/firebase";
import UpdateGroupModel from "../components/UpdateGroupModel";
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const DataContainer = styled.div`
  flex: 1 1;
  padding: 10px 0px 0px 20px;
`;

const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  height: 60px;
  .headerLeft {
    cursor: pointer;
  }
  .MuiFormControl-root {
    width: 200px;
  }
  .MuiInput-underline::before {
    display: none;
  }
  .MuiInput-underline::after {
    display: none;
  }
  .MuiSelect-select:focus {
    background: transparent;
  }
  .headerRight {
    display: flex;
    align-items: center;
  }
  .headerRight svg {
    margin: 0px 10px;
  }
`;

const SidebarBtn = styled.div`
  button {
    background: transparent;
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    border-radius: 40px;
    padding: 5px 10px;
    box-shadow: 2px 2px 2px #ccc;
    margin-left: 20px;
    span {
      font-size: 16px;
      margin-right: 20px;
      margin-left: 10px;
    }
  }
`;

const ShareWithMe = ({ user }) => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [group, setGroup] = useState("");
  const [listOfGroups, setListOfGroups] = useState([]);
  const [openCreateGroupModel, setOpenCreateGroupModel] = useState(false);
  const [openDocumentUploadModel, setOpenDocumentUploadModel] = useState(false);
  const [openUpdateGroupModel, setOpenUpdateGroupModel] = useState(false);

  const handleChange = (event) => {
    setGroup(event.target.value);
  };

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setListOfUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {
    db.collection("groups")
      .where("members", "array-contains", user?.uid)
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => ({ id: doc.id })));
        setListOfGroups(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [user]);

  // useEffect(()=>{

  // },[group])

  return (
    <DataContainer>
      <DataHeader>
        <div className="headerLeft">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-controlled-open-select-label">
              Choose Group
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={group}
              label="Group"
              onChange={handleChange}
            >
              <MenuItem onClick={() => setOpenCreateGroupModel(true)} value="">
                <em>Create Group</em>
              </MenuItem>
              {listOfGroups?.map(({ id, data }) => (
                <MenuItem key={id} value={data}>
                  {data?.groupName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Model  */}
          <GroupModel
            openCreateGroupModel={openCreateGroupModel}
            setOpenCreateGroupModel={setOpenCreateGroupModel}
            listOfUsers={listOfUsers}
            user={user}
          />
        </div>
        <div className="headerRight">
          {group.admin === user.uid && (
            <>
              <SidebarBtn onClick={() => setOpenUpdateGroupModel(true)}>
                <button>
                  <PersonAddIcon />
                  <span>Add Member</span>
                </button>
              </SidebarBtn>
              {/* // update group  */}
              <UpdateGroupModel
                openUpdateGroupModel={openUpdateGroupModel}
                setOpenUpdateGroupModel={setOpenUpdateGroupModel}
                listOfUsers={listOfUsers}
                user={user}
                group={group}
              />
            </>
          )}
          <SidebarBtn>
            <button onClick={() => setOpenDocumentUploadModel(true)}>
              <AddIcon />
              <span>Contribute</span>
            </button>
          </SidebarBtn>
          <DocumentUploadModel
            openDocumentUploadModel={openDocumentUploadModel}
            setOpenDocumentUploadModel={setOpenDocumentUploadModel}
          />
        </div>
      </DataHeader>
      {/* table  */}

      <DocumentTable user={user} />
    </DataContainer>
  );
};

export default ShareWithMe;
