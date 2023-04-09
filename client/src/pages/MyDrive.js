import DocumentTable from "../components/Documents/DocumentTable";
import { DataContainer, DataHeader } from "../styles/DocumentTable.styles";
import FolderSharedIcon from '@material-ui/icons/FolderShared';

const MyDrive = ({user}) => {
  return (
    <DataContainer>
      <DataHeader>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        My Drive
        <span style={{ marginLeft: '10px' }}>
          <FolderSharedIcon style={{ fontSize: '40px', marginTop: '7px' }}/>
        </span>
        </span>
      </DataHeader>
      <DocumentTable  user={user} route="/file"></DocumentTable>
    </DataContainer>
  );
};

export default MyDrive;
