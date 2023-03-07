import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import GroupModal from "../components/Groups/GroupModal";
import DocumentUploadModal from "../components/Documents/DocumentUploadModal";
import DocumentTable from "../components/Documents/DocumentTable";
import { db } from "../firebase/firebase";
import UpdateGroupModal from "../components/Groups/UpdateGroupModal";
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { SidebarBtn } from '../styles/Sidebar.styles';

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
const ShareWithMe = ({ user }) => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [group, setGroup] = useState("");
  const [listOfGroups, setListOfGroups] = useState([]);
  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
  const [openDocumentUploadModel, setOpenDocumentUploadModel] = useState(false);
  const [openUpdateGroupModal, setOpenUpdateGroupModal] = useState(false);

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
              <MenuItem onClick={() => setOpenCreateGroupModal(true)} value="">
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
          <GroupModal
            openCreateGroupModal={openCreateGroupModal}
            setOpenCreateGroupModal={setOpenCreateGroupModal}
            listOfUsers={listOfUsers}
            user={user}
          />
        </div>
        <div className="headerRight">
          {group.admin === user.uid && (
            <>
              <SidebarBtn onClick={() => setOpenUpdateGroupModal(true)}>
                <button>
                  <PersonAddIcon />
                  <span>Add Member</span>
                </button>
              </SidebarBtn>
              {/* // update group  */}
              <UpdateGroupModal
                openUpdateGroupModal={openUpdateGroupModal}
                setOpenUpdateGroupModal={setOpenUpdateGroupModal}
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
          <DocumentUploadModal
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
