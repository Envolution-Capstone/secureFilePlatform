import SearchIcon from "@material-ui/icons/Search";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from '../assets/logo.png';
import {
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { PersonAdd } from "@material-ui/icons";
import { useStyles } from "./MuiStyle";
import { HeaderContainer, HeaderLogo, HeaderIcons, HeaderSearch, UserInfo, UserName, UserEmail } from '../styles/Header.styles';
import { signOut } from "../util/user/login";
import AlertsButton from './AlertsButton';

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
    signOut();
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
      <AlertsButton /> {/* Add this line to include the AlertsButton component */}
        <UserInfo>
          <UserName>{user?.displayName}</UserName>
          <UserEmail>{user?.email}</UserEmail>
        </UserInfo>
        <span>
        <div style={{ position: "relative" }}>
          <Avatar style={{
                  width: "45px",
                  height: "45px",
                  marginRight: "13px",
                  borderRadius: "8px",
                }}
                onClick={handleClick} src={user?.photoURL} />
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
                  borderRadius: "8px",
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
