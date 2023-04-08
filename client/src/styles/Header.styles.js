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
        color: Black;
        font-family: 'Roboto', sans-serif;
    }
`

const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  width: 700px;
  background-color: whitesmoke;
  padding: 12px;
  border-radius: 10px;
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
    margin-left: 20px;
  }
  svg.MuiSvgIcon-root {
    margin: 0px 10px;
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
