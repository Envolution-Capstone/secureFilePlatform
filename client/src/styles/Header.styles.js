import styled from "styled-components";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto 200px;
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
  span {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  svg.MuiSvgIcon-root {
    margin: 0px 10px;
  }
`;

export {
  HeaderContainer,
HeaderLogo,
HeaderSearch,
HeaderIcons,
}