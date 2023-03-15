import DocumentTable from "../components/Documents/DocumentTable";
import { DataContainer, DataHeader } from "../styles/DocumentTable.styles";


const MyDrive = ({user}) => {
  return (
    <DataContainer>
      <DataHeader>My Drive</DataHeader>
      <DocumentTable  user={user} route="/file"></DocumentTable>
    </DataContainer>
  );
};

export default MyDrive;
