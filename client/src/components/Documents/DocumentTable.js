import React, { useEffect, useState } from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { client } from '../../requests/client';
import { DataGrid, DataFile, DataListRow } from '../../styles/DocumentTable.styles';
import { getFiles } from "../../util/files/files";
import doc from '../../assets/doc.png';

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

  const getIconURLByExtension = (extension) => {
    console.log("Extension:", extension);
    switch (extension) {
      case "pdf":
        return "https://www.gstatic.com/images/icons/material/system/2x/picture_as_pdf_black_24dp.png";
      case "doc":
      case "docx":
        return doc;
      case "xls":
      case "xlsx":
        return "https://www.gstatic.com/images/icons/material/system/2x/grid_on_black_24dp.png";
      case "ppt":
      case "pptx":
        return "https://www.gstatic.com/images/icons/material/system/2x/present_to_all_black_24dp.png";
      case "zip":
      case "rar":
        return "https://www.gstatic.com/images/icons/material/system/2x/archive_black_24dp.png";
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
      <DataGrid>
        {files ? files.map((file) => (
          <DataFile key={file.id}>
            <img
              src={getIconURLByExtension(file.extension)}
              alt={file.extension}
              style={{ width: "60px", height: "60px", cursor: "pointer" }}
              onClick={() => downloadFile(file.id, file.filename)}
            />
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
              <img
                src={getIconURLByExtension(file.extension)}
                alt={file.extension}
                style={{ width: "22px", height: "22px", marginRight: "10px" }}
              />
              {file.filename}
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
