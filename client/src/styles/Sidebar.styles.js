import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  min-height: 100vh;
  background-color: #2262c6;
  border-top-right-radius: 75px;
  margin-top: 10px;
  ...
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative; // Add this line
  ...
`;


const SidebarBtn = styled.div`
  padding-top: 5px;
  margin-top: ${({ primary }) => (primary ? "40px" : "20px")};
  display: flex;
  justify-content: center;

  button {
    background: ${({ primary }) => (primary ? "transparent" : "transparent")};
    color: ${({ primary }) => (primary ? "#2262c6" : "#fff")};
    border: none;
    padding: ${({ primary }) => (primary ? "10px 20px" : "5px 10px")};
    font-size: ${({ primary }) => (primary ? "15px" : "15px")};
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 0;
    width: 100%;
    text-align: left;
    padding-left: 20px;

    &:hover {
      background: ${({ primary }) => (primary ? "lightblue" : "lightblue")};
      color: ${({ primary }) => (primary ? "mediumblue" : "#fff")};
      cursor: pointer;
    }
  }
`;

const UploadBtn = styled.div`
  margin-top: ${({ primary }) => (primary ? "40px" : "20px")};
  display: flex;
  justify-content: center;

  button {
    background: ${({ primary }) => (primary ? "white" : "transparent")};
    color: ${({ primary }) => (primary ? "#2262c6" : "inherit")};
    border: 1px solid ${({ primary }) => (primary ? "white" : "lightgray")};
    border-radius: ${({ primary }) => (primary ? "12px" : "40px")};
    padding: ${({ primary }) => (primary ? "10px 20px" : "5px 10px")};
    ...
    span {
      ...
      font-size: ${({ primary }) => (primary ? "20px" : "18px")}; // Increase font size
      color: ${({ primary }) => (primary ? "mediumblue" : "#fff")};
    }
    &:hover {
      background: ${({ primary }) => (primary ? "mediumblue" : "lightblue")};
      color: ${({ primary }) => (primary ? "white" : "inherit")};
      cursor: pointer;
    }
  }
`;


const SidebarOptions = styled.div`
margin-top: 10px;
&:not(:first-child) {
  margin-top: 30px; // Apply margin to all buttons except the first
}
&:first-child {
  margin-top: 30px; // Add margin to the first button in SidebarOptions
}
`;

const SidebarOption = styled.div`
  a {
    text-decoration: none;
  }
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 0px 20px 20px 0px;
  &:hover {
    background: lightblue;
    cursor: pointer;
  }
  svg.MuiSvgIcon-root {
    color: #fff;
  }
  span {
    margin-left: 15px;
    font-size: 15px; // Increase font size
    font-weight: 500; // Increase font-weight to make it bolder
    -webkit-font-smoothing: antialiased; // Enable font smoothing
    -moz-osx-font-smoothing: grayscale; // Enable font smoothing for Firefox on macOS
    color: #fff;
  }
`;

const ModalPopup = styled.div`
  top: 50%;
  background-color: #fff;
  width: 500px;
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
`;

const UploadingPara = styled.p`
  background: green;
  color: #fff;
  margin: 20px;
  text-align: center;
  padding: 10px;
  letter-spacing: 1px;
`;

const StorageBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; // Change this line
  margin-bottom: 100px;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-left: 15px;
`;


const StorageBar = styled.div`
  width: 80%;
  height: 10px;
  background-color: white;
  border-radius: 4px;
  margin: 5px 0;
  overflow: hidden;
  position: relative;
`;

const StorageBarProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #7cabf5;
  border-radius: 5px;
`;

const StorageText = styled.span`
  color: #fff;
  font-size: 14px;
  margin-top: 5px;
`;


export {
  SidebarContainer,
  SidebarBtn,
  SidebarOptions,
  SidebarOption,
  ModalPopup,
  ModalHeading,
  ModalBody,
  UploadingPara,
  StorageText,
  StorageBarProgress,
  StorageBar,
  StorageBarContainer,
  UploadBtn,
};
