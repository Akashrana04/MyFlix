import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "./Navbar.css";
import firebase from "../firebase/base";
import { black, red } from "@material-ui/core/colors";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function Navbar(props) {
  const [show, handleShow] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(firebase.getCurrentUsername());
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(show);
    });
    return () => {
      //window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={"nav nav__black"}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <div
        style={{
          position: "fixed",
          left: "150px",
          width: "150px",
          color: "red",
          fontWeight: "bold",
        }}
      >
        <p onClick={() => props.history.push("/movietab")}>Movies</p>
      </div>
      <div
        style={{
          position: "fixed",
          left: "220px",
          width: "150px",
          color: "red",
          fontWeight: "bold",
        }}
      >
        <p onClick={() => props.history.push("/seriestab")}>Series</p>
      </div>
      <div
        style={{
          position: "fixed",
          right: "100px",
          width: "150px",
          color: "red",
          fontWeight: "bold",
        }}
      >
        <p>{user != "" ? user : ""}</p>
      </div>
      <div style={{ position: "fixed", right: "50px", width: "50px" }}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <img
            className="nav__avatar"
            src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
            alt="Netflix Logo"
          />
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem>
            {/* <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon> */}
            <ListItemText
              primary="Login"
              onClick={() => {
                props.history.replace("/login");
              }}
            />
          </StyledMenuItem>
          <StyledMenuItem>
            {/* <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon> */}
            <ListItemText primary="Profile" />
          </StyledMenuItem>
          <StyledMenuItem>
            {/* <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon> */}
            <ListItemText
              primary="SignUp"
              onClick={() => {
                props.history.replace("/signup");
              }}
            />
          </StyledMenuItem>
          <StyledMenuItem>
            {/* <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon> */}
            <ListItemText
              primary="Logout"
              onClick={() => {
                firebase.logout();
                alert("Logout Successful");
                props.history.push("/");
              }}
            />
          </StyledMenuItem>
        </StyledMenu>
      </div>
    </div>
  );
}

export default Navbar;
