import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withRouter } from "react-router-dom";
import { ipcRenderer } from "electron";
import storage from "electron-json-storage";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import BreadcrumbsElem from "./Breadcrumbs";
import logoImg from "../../assets/images/whiteLogo.png";
import { Button } from "@material-ui/core/";

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
    color: "#753689"
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

  return (
    <div className={classes.grow}>
      <AppBar position='static' id='menuBar' style={{ background: "#753689" }}>
        <Toolbar>
          <Button
            style={{ backgroundColor: "transparent" }}
            disableTouchRipple
            onClick={() => props.history.push("/")}
          >
            <img id='headerLogo' src={logoImg} />
          </Button>
          <BreadcrumbsElem
            location={props.location.pathname}
            history={props.history}
          />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label='autorenew'
              onClick={() => props.history.goBack()}
            >
              <ArrowBack style={{ color: "#FFFFFF" }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(PrimarySearchAppBar);
