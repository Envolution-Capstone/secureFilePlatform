import React, { useEffect, useState } from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { client } from '../../requests/client';
import { DataGrid, DataFile, DataListRow, DocumentTableTitles } from '../../styles/DocumentTable.styles';
import { getFiles } from "../../util/files/files";
import doc from '../../assets/doc.png';
import pdf from '../../assets/pdf.png';
import txt from '../../assets/txt.png';
import xls from '../../assets/xls.png';
import zip from '../../assets/zip.png';
import {
  NameColumn,
  SharedByColumn,
  LastModifiedColumn,
  FileSizeColumn,
} from "../../styles/DocumentTable.styles";

const DocumentTable = ({route, refreshTable, setRefreshTable }) => {
  const [files, setFiles] = useState([]);

  useEffect(()=>{
    if (route) {
      const req = async () => {
        setTimeout(async ()=>{
          const f = await getFiles(route);
          setFiles(f);
          setRefreshTable(false);
        }, 300);
      };
      req();
    }
  }, [route, refreshTable]);

  const getIconURLByExtension = (extension) => {
    switch (extension) {
      case "txt":
        return txt;
      case "pdf":
        return pdf;
      case "doc":
      case "docx":
        return doc;
      case "xls":
      case "xlsx":
        return xls;
      case "ppt":
      case "pptx":
        return "https://www.gstatic.com/images/icons/material/system/2x/present_to_all_black_24dp.png";
      case "zip":
      case "rar":
        return zip;
      default:
        return "https://www.gstatic.com/images/icons/material/system/2x/insert_drive_file_black_24dp.png";
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
      <DocumentTableTitles>QUICK ACCESS</DocumentTableTitles>
      <DataGrid>
        {files ? files.map((file) => (
          <DataFile key={file.id}>
            <img
              src={getIconURLByExtension(file.extension)}
              alt={file.extension}
              style={{ width: "60px", height: "80px", cursor: "pointer" }}
              onClick={() => downloadFile(file.id, file.filename)}
            />
            <p>{file.filename}</p>
          </DataFile>
        )) : <></>}
      </DataGrid>
      <div>
      <DocumentTableTitles>ALL FILES</DocumentTableTitles>
      <DataListRow>
      <NameColumn>
        <b>
          Name <ArrowDownwardIcon />
        </b>
      </NameColumn>
      <SharedByColumn>
        <b>Shared by</b>
      </SharedByColumn>
      <LastModifiedColumn>
        <b>Last Modified</b>
      </LastModifiedColumn>
      <FileSizeColumn>
        <b>File Size</b>
      </FileSizeColumn>
    </DataListRow>
    {files
      ? files.map((file) => (
          <DataListRow
            key={file.id}
            onClick={() => downloadFile(file.id, file.filename)}
          >
            <NameColumn>
              <img
                src={getIconURLByExtension(file.extension)}
                alt={file.extension}
                style={{
                  width: "22px",
                  height: "22px",
                  marginRight: "10px",
                }}
              />
              {file.filename}
            </NameColumn>
            <SharedByColumn>
            <p>{file.sharedBy}</p>
            </SharedByColumn>
            <LastModifiedColumn>
              {new Date(file.timestamp * 1000).toUTCString()}
            </LastModifiedColumn>
            <FileSizeColumn>{byteConvert(file.size)}</FileSizeColumn>
          </DataListRow>
        ))
      : ""}
      </div>
    </div>
  );
};

export default DocumentTable;
