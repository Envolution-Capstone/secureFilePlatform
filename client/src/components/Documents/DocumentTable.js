import React, { useEffect, useState } from "react";

import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DescriptionIcon from '@material-ui/icons/Description';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { client } from '../../requests/client';

import { DataGrid, DataFile, DataListRow } from '../../styles/DocumentTable.styles';
import { getFiles } from "../../util/files/files";



const DocumentTable = ({route}) => {
  const [files, setFiles] = useState([]);

  useEffect(()=>{
    if (route) {
      const req = async () => {
        setTimeout(async ()=>{
          const f = await getFiles(route);
          setFiles(f);
        }, 300);
      };
      req();
    }
  }, [route]);

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
    client.get(`${route}/${fileid}`, {
      responseType: 'blob'
    })
    .then((response)=>{
      if (response.status === 200 && (response.data.status !== "fail" && response.data.status !== "error")) {
        const url = URL.createObjectURL(response.data);
        const alink = document.createElement('a');
        alink.href = url;
        alink.setAttribute('download', filename);
        alink.click();
        document.removeChild(alink);
      } else {
        console.log(`Failed To Download File, Status: ${response.data.status}`);
      }
    });
  }

  return (
    <div>
      <DataGrid>
        {files ? files.map((file) => (
          <DataFile key={file.id}>
            <InsertDriveFileIcon onClick={()=>downloadFile(file.id, file.filename)}/>
            <p>{file.filename}</p>
          </DataFile>
        )) : <></>}
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
        { files ?
        files.map((file) => (
          <DataListRow key={file.id} onClick={()=>downloadFile(file.id, file.filename)}>
            <p>
              <InsertDriveFileIcon /> {file.filename}
            </p>
            <p>{new Date(file.timestamp * 1000).toUTCString()}</p>
            <p>{byteConvert(file.size)}</p>
          </DataListRow>
        )) : <></>}
      </div>
    </div>
  );
};

export default DocumentTable;
