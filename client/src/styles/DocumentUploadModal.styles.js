import styled from "styled-components";

const ModalPopup = styled.div`
  top: 50%;
  background-color: #fff;
  width: 25%;
  margin: 0px auto;
  position: relative;
  transform: translateY(-50%);
  padding: 10px;
  border-radius: 10px;
`;

const ModalHeading = styled.div`
  text-align: center;
  border-bottom: 1px solid lightgray;
  height: 40px;
`;

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
  background: green;
  color: #fff;
  margin: 20px;
  text-align: center;
  padding: 10px;
  letter-spacing: 1px;
`;


export {
  ModalPopup,
  ModalHeading,
  ModalBody,
  UploadingPara, 
}