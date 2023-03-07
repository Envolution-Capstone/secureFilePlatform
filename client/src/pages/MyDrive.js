import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ListIcon from "@material-ui/icons/List";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import styled from "styled-components";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

import DocumentTable from "../components/Documents/DocumentTable";

const DataContainer = styled.div`
  flex: 1 1;
  padding: 10px 0px 0px 20px;
`;

const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  height: 40px;
  .headerLeft {
    display: flex;
    align-items: center;
  }
  .headerRight svg {
    margin: 0px 10px;
  }
`;

const MyDrive = ({user}) => {
  return (
    <DataContainer>
      <DataHeader>
        <div className="headerLeft">
          <p>My Drive</p>
          <ArrowDropDownIcon />
        </div>
        <div className="headerRight">
          <ListIcon />
          <InfoOutlinedIcon />
        </div>
      </DataHeader>
      <DocumentTable  user={user} route="/file"></DocumentTable>
    </DataContainer>
  );
};

export default MyDrive;
