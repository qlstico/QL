import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { ipcRenderer } from "electron";

const { CLOSE_SERVER } = require("../../constants/ipcNames");

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  paper: {
    padding: theme.spacing(1, 2)
  }
}));

const BreadcrumbsElem = props => {
  const classes = useStyles();

  async function sendHome() {
    props.history.push("/");
    await ipcRenderer.send(CLOSE_SERVER);
  }

  const maybeClose = async () => {
    if (!CLOSE_SERVER) await ipcRenderer.send(CLOSE_SERVER);
  };

  return (
    <div className={classes.root}>
      <Breadcrumbs separator='/' aria-label='Breadcrumb'>
        <Link id='breadboi' onClick={sendHome}>
          Connect
        </Link>
        {props.location !== "/" ? (
          <Link
            id='breadboi'
            onClick={() => props.history.push("/dbs") && maybeClose()}
          >
            Databases
          </Link>
        ) : (
          ""
        )}
        {props.location === "/tables" ? (
          <Link id='breadboi' onClick={() => props.history.push("/tables")}>
            Tables
          </Link>
        ) : (
          ""
        )}
        {props.location === "/single" ? (
          <div>
            <Link id='breadboi' onClick={() => props.history.push("/tables")}>
              Tables
            </Link>
            {"  /  "}
            <Link id='breadboi' onClick={() => props.history.push("/single")}>
              Table Contents
            </Link>
          </div>
        ) : (
          ""
        )}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsElem;
