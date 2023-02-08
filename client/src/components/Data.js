import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

import styled from 'styled-components';

import {useState, useEffect} from 'react'

const DataContainer = styled.div`
    flex: 1 1;
    padding: 10px 0px 0px 20px;
`

const DataHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    height: 40px;
    .Lheader {
        display: flex;
        align-items: center;
    }
`
const DataFile = styled.div`
    text-align: center;
    border: 1px solid rgb(204 204 204 / 46%);
    margin: 10px;
    min-width: 200px;
    padding: 10px 0px 0px 0px;
    border-radius: 5px;
    svg {
        font-size: 60px;
        color: gray
    }
    p{
        border-top: 1px solid #ccc;
        margin-top: 5px;
        font-size: 12px;
        background whitesmoke;
        padding: 10px 0px;
    }
`
const DataGrid = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
`

const DataListRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding 10px;
    p {
        display: flex;
        align-items: center;
        font-size: 13px;
        b{
            display: flex;
            align-items: center;
        }
        svg{
            font-size: 22px;
            margin: 10px
        }
    }
`

const Data = () => {
    const [files, setFiles] = useState([]);

    useEffect(()=>{
        // TODO get files from backend
    },[])

    const byteConvert = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

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
            return <HistoryEduIcon />;
          default:
            return <InsertDriveFileIcon />;
        }
      };

    return (
        <DataContainer>
            <DataHeader>
                <div className= "Lheader">
                    <p>Your Drive</p>
                    <ArrowDropDownIcon />
                </div>
            </DataHeader>
            <div>
                <DataGrid>
                { files.map(file => (
                        <DataFile key={file.id}>
                            <a href={file.data.fileURL}>
                            {getFileIcon(file.data.filename.split('.').pop())}
                            <p>{file.data.filename}</p>
                            </a>
                        </DataFile>
                    ))}
                </DataGrid>
                <div>
                    <DataListRow>
                        <p><b>Name <ArrowDownwardIcon /></b></p>
                        <p><b>Owner</b></p>
                        <p><b>Last Modified</b></p>
                        <p><b>File Size</b></p>
                    </DataListRow>
                    { files.map(file => (
                        <DataListRow key={file.id}>
                            <a href={file.data.fileURL}>
                                <p>{getFileIcon(file.data.filename.split('.').pop())} {file.data.filename}</p>
                            </a>
                            <p>Owner</p>
                            <p>{new Date(file.data.timestamp?.seconds*1000).toUTCString()}</p>
                            <p>{byteConvert(file.data.size)}</p>
                        </DataListRow>
                    ))}
                </div>
            </div>
        </DataContainer>
    )
}

export default Data