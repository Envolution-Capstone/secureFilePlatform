import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Modal } from '@mui/material';
import styled from 'styled-components'

import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import { db,storage } from '../firebase';


const SidebarContainer = styled.div`
    margin-top: 10px;
`
const SidebarBtn = styled.div`
    button {
        background: transparent;
        border: 1px solid lightgray;
        display: flex;
        align-items: center;
        border-radius: 40px;
        padding:5px 10px;
        box-shadow:2px 2px 2px #ccc;
        margin-left: 20px;
        span {
            font-size: 16px;
            margin-right: 20px;
            margin-left: 10px;
        }
        &:hover{
            cursor: pointer;
        }
    }
`
const SidebarOptions = styled.div`
    margin-top: 10px
`

const SidebarOption = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 20px;
    border-radius: 0px 20px 20px 0px;
    &:hover{
        background: lightblue;
        cursor: pointer;
    }
`
const ModalPopup = styled.div`
    top: 50%;
    background-color: #fff;
    width: 500px;
    margin: 0px auto;
    position: relative;
    transform: translateY(-50%);
    padding: 10px;
    border-radius: 10px;
`
const ModalHeading = styled.div`
    text-align:center;
    border-bottom: 1px solid lightgray;
    height: 40px;
`

const ModalBody = styled.div`
    input.modal_submitFile {
        width: 100%;
        background: mediumblue;
        padding: 10px 20px;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 5px;
        font-size: 16px;
        border: 0;
        outline: 0;
        border-radius: 5px;
        cursor: pointer;
        margin-top:20px
    }
    input.modal_selectFile {
        background: white;
        padding: 13px;
        color: #000;
        display: block;
        margin-top:20px
    }
`
const UploadingPara = styled.p`
    background: mediumblue;
    color: #fff;
    margin: 20px;
    text-align: center;
    padding: 10px;
    letter-spacing: 1px;
`

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const handleFile = e => {
        if (e.target.files[0]) setFile(e.target.files[0])
    }

    const handleUpload = e => {
        e.preventDefault();
        setUploading(true);
        storage.ref(`files/${file.name}`).put(file).then(snapshot => {
            console.log(snapshot)
            storage.ref("files").child(file.name).getDownloadURL().then(url => {
                db.collection("myfiles").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    filename: file.name,
                    fileURL: url,
                    size: snapshot._delegate.bytesTransferred
                })
                setUploading(false);
                setFile(null);
                setOpen(false)
            })
        })
    }

    return(
        <>
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalPopup>
                <form>
                    <ModalHeading>
                        <h3>Select the file(s) you want to upload</h3>
                    </ModalHeading>
                    <ModalBody>
                        {uploading ? <UploadingPara>Uploading...</UploadingPara>:
                        (
                            <>
                                <input type = "file" className='modal_selectFile' onChange={handleFile}/>
                                <input type= "submit" className="modal_submitFile" onClick={handleUpload}/>
                            </>
                        )
                        }
                    </ModalBody>
                </form>
            </ModalPopup>
        </Modal>
        <SidebarContainer>
            <SidebarBtn>
                <button onClick={() => setOpen(true)}>
                    <UploadFileIcon />
                    <span> Upload File </span>
                </button>
            </SidebarBtn>
            <SidebarOptions>
                <SidebarOption>
                    <MobileScreenShareIcon /><span>My Drive</span>
                </SidebarOption>
                <SidebarOption>
                    <PeopleAltOutlinedIcon /><span>Group Drive</span>
                </SidebarOption>
            </SidebarOptions>
        </SidebarContainer>
        </>
    )
}

export default Sidebar