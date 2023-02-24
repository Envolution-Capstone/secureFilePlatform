import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DescriptionIcon from '@material-ui/icons/Description';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { BackendRequest } from '../requests/client';

import { client } from '../requests/client';

const DataGrid = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
`;
const DataListRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px;
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

const DocumentTable = ({user, route}) => {
  const [files, setFiles] = useState([]);

  useEffect(()=>{
    const req = async () => {
      console.log('Requesting Files');
      const response = await BackendRequest(user, 'GET', route);
      console.log(response.data.data);
      setFiles(response.data.data);
    };
    req();
  }, []);

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "txt":
        return <DescriptionIcon />;
      case "JPEG":
      case "jpeg":
      case "PNG":
      case "png":
        return <InsertPhotoIcon />;
      case "pdf":
        return <PictureAsPdfIcon />;
      case "doc":
      case "docx":
        return <InsertDriveFileIcon />;
      default:
        return <InsertDriveFileIcon />;
    }
  };

  const byteConvert = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const downloadFile = (fileid, filename)=>{
    client.get(`/file/${fileid}`, {
      responseType: 'blob'
    })
    .then((response)=>{
      console.log(response);
      const url = URL.createObjectURL(response.data);
      const alink = document.createElement('a');
      alink.href = url;
      alink.setAttribute('download', filename);
      alink.click();
      document.removeChild(alink);
    });
  }

  return (
    <div>
      <DataGrid>
        {files.map((file) => (
          <DataFile key={file.id}>
            <InsertDriveFileIcon onClick={()=>downloadFile(file.id, file.filename)}/>
            <p>{file.filename}</p>
          </DataFile>
        ))}
      </DataGrid>
      <div>
        <DataListRow>
          <p>
            <b>
              Name <ArrowDownwardIcon />
            </b>
          </p>
          <p>
            <b>Shared by</b>
          </p>
          <p>
            <b>Last Modified</b>
          </p>
          <p>
            <b>File Size</b>
          </p>
        </DataListRow>
        {files.map((file) => (
          <DataListRow key={file.id} onClick={()=>downloadFile(file.id, file.filename)}>
            <a>
              <p>
                <InsertDriveFileIcon /> {file.filename}
              </p>
            </a>
            <p>{new Date(file.timestamp?.seconds * 1000).toUTCString()}</p>
            <p>{byteConvert(file.size)}</p>
          </DataListRow>
        ))}
      </div>
    </div>
  );
};

export default DocumentTable;
