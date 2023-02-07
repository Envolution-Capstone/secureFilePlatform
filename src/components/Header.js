import React from 'react';
import styled from 'styled-components';

import logo from '../assets/logo.png';

import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';


const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: 300px auto 200px;
    align-items: center;
    padding: 5px 20px;
    height: 60px;
    border-bottom: 1px solid lightgray;
`

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

const HeaderSearchBar = styled.div`
    display: flex;
    align-items: center;
    width: 700px;
    background-color: whitesmoke;
    padding: 12px;
    border-radius: 10px;
    input{
        background-color: transparent;
        border: 0;
        outline: 0;
        flex: 1;
    }
`
const HeaderIcons = styled.div`
    display: flex;
    align-items: center;
    span {
        display: flex;
        align-items: center;
        margin-left: 20 px;
    }
    svg.MuiSvgIcon-root{ margin: 0px 10px; }
`


const Header = ( {photoURL} ) => {
    return (
        <HeaderContainer>
            <HeaderLogo>
                <img src={logo} alt="logo"/>
                <span> Envolution </span>
            </HeaderLogo>
            <HeaderSearchBar>
                <SearchIcon />
                <input type="text" placeholder='Search..' />
                <FormatAlignCenterIcon />
            </HeaderSearchBar>
            <HeaderIcons>
                <span>
                    <HelpOutlinedIcon />
                    <SettingsIcon />
                </span>
                <span>
                    <AppsIcon />
                    <Avatar src={photoURL}/>
                </span>
            </HeaderIcons>
        </HeaderContainer>

    )
}

export default Header