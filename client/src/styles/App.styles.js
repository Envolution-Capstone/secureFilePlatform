import styled from "styled-components";


const LoginContainer = styled.div`
  background: white;
  padding: 20px;
  width: 400px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  img {
    width: 200px;
  }
  button {
    width: 100%;
    background: lightblue;
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
`;
const SideBySide = styled.div`
  display:flex; 
  flex-direction:row;
`

export {
  SideBySide,
  LoginContainer,
}