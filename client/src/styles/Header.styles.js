import styled from "styled-components";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto 300px;
  align-items: center;
  padding: 5px 20px;
  height: 60px;
`;
const HeaderLogo = styled.div`
    display: flex;
    align-items: center;
    img {
        width: 70px;
    }
    span {
        font-size: 38px;
        margin-left: 10px;
        color: #2262c6;
        font-family: 'Roboto', sans-serif;
        font-weight: 600; // Adjust the font-weight as desired
    }
`

const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  margin-left: 70px; /* Add margin to move the search bar to the right */
  background-color: whitesmoke;
  padding: 12px;
  border-radius: 30px;
  input {
    background-color: transparent;
    border: 0;
    outline: 0;
    flex: 1;
  }
`;


const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  svg.MuiSvgIcon-root {
    margin: 0px 10px;
  }

  .icons-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
    margin-right: 130px;
    width: 110px; // Adjust this value to change the spacing between the icons
  }
`;


const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 15px;
`;

const UserName = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`;

const UserEmail = styled.p`
  font-size: 12px;
  margin: 0;
`;

export {
  HeaderContainer,
  HeaderLogo,
  HeaderSearch,
  HeaderIcons,
  UserInfo,
  UserName,
  UserEmail,
};
