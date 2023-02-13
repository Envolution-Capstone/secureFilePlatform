import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import AppsIcon from "@material-ui/icons/Apps";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from '../assets/logo.png';
import {
  Avatar,
  Divider,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { PersonAdd, Settings } from "@material-ui/icons";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import { useStyles } from "./MuiStyle";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto 200px;
  align-items: center;
  padding: 5px 20px;
  height: 60px;
  border-bottom: 1px solid lightgray;
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

const Header = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("user");
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };

  return (
    <HeaderContainer>
      <HeaderLogo>
      <img src={logo} alt="logo"/>
      <span> Envolution </span>
      </HeaderLogo>
      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="Search in Drive" />
        <FormatAlignCenterIcon />
      </HeaderSearch>
      <HeaderIcons>
        <span>
          <HelpOutlineIcon />
          <SettingsIcon />
        </span>
        <span>
          <AppsIcon />
          <div style={{ position: "relative" }}>
            <Avatar onClick={handleClick} src={user?.photoURL} />
            <Menu
              className={classes.menu}
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },

                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar
                  style={{
                    width: "60px",
                    height: "60px",
                    marginRight: "13px",
                  }}
                  src={user?.photoURL}
                />{" "}
                <div>
                  <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {user?.displayName}
                  </p>
                  <p style={{ fontSize: "12px" }}>{user?.email}</p>
                </div>
              </MenuItem>

              <Divider style={{ marginTop: "6px" }} />
              <MenuItem
                style={{
                  marginTop: "25px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                }}
                onClick={handleClose}
              >
                <ListItemIcon style={{ minWidth: "30px" }}>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>

              <MenuItem
                style={{ paddingTop: "12px", paddingBottom: "12px" }}
                onClick={handleLogOut}
              >
                <ListItemIcon style={{ minWidth: "30px" }}>
                  {" "}
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </span>
      </HeaderIcons>
    </HeaderContainer>
  );
};

export default Header;
