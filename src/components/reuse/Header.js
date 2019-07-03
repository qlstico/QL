import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withRouter } from "react-router-dom";
import ThreeSixtyIcon from "@material-ui/icons/ThreeSixty";
import { ipcRenderer } from "electron";
import storage from "electron-json-storage";
import SucioBreadcrumbs from "./Breadcrumbs";

const getAllDBNames = async () => {
  await ipcRenderer.send("GET_DB_NAMES");
  await ipcRenderer.on("GET_DB_NAMES_REPLY", (_, databaseNames) => {
    console.log("GET_DB_NAMES_REPLY", databaseNames);
    storage.set("dbnames", databaseNames, error => {
      if (error) throw error;
    });
  });
};

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  }
}));

function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  async function sendHome() {
    props.history.push("/");
    await ipcRenderer.send("CLOSE_SERVER");
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            className={classes.title}
            variant='h6'
            noWrap
            onClick={sendHome}
          >
            qlStico
          </Typography>
          <SucioBreadcrumbs />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label='autorenew'
              color='inherit'
              onClick={getAllDBNames}
            >
              <ThreeSixtyIcon />
            </IconButton>
            <IconButton
              edge='end'
              aria-label='Account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

export default withRouter(PrimarySearchAppBar);
