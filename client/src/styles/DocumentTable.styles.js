import styled from "styled-components";

const DataContainer = styled.div`
  flex: 1 1;
  padding: 10px 0px 0px 20px;
`;

const DataHeader = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 32px;
  color: #2262c6;
  margin-left: 30px;
  margin-right: 70px;
  margin-top: 20px; // Add this line to push the text down
  padding-bottom: 14px; // Add this line to create space for the line below the text
  border-bottom: 1px solid rgba(0, 0, 0, 0.1); // Add this line to create a faint horizontal line under the text
`;

const DataGrid = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 30px;
  width: 100%;
`;
const DataListRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  margin-left: 30px;
  margin-right: 70px;
  p {
    display: flex;
    align-items: center;
    font-size: 13px;
    b {
      display: flex;
      align-items: center;
    }
    svg {
      font-size: 22px;
      margin: 10px;
    }
  }
`;
const DataFile = styled.div`
  text-align: center;
  border: 1px solid rgb(204 204 204 / 46%);
  margin: 10px;
  min-width: 200px;
  padding: 10px 0px 0px 0px;
  border-radius: 5px;
  svg {
    font-size: 60px;
    color: gray;
  }
  p {
    border-top: 1px solid #ccc;
    margin-top: 5px;
    font-size: 12px;
    background: whitesmoke;
    padding: 10px 0px;
  }
`;

const Column = styled.p`
  margin: 0;
  padding: 0;
`;

const NameColumn = styled(Column)`
  width: 20%;
`;

const SharedByColumn = styled(Column)`
  width: 20%;
`;

const LastModifiedColumn = styled(Column)`
  width: 20%;
`;

const FileSizeColumn = styled(Column)`
  width: 10%;
`;

export {
  DataGrid,
  DataListRow,
  DataFile,
  DataContainer,
  DataHeader,
  NameColumn,
  SharedByColumn,
  LastModifiedColumn,
  FileSizeColumn,
};