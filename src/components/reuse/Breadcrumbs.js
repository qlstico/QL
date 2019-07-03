import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

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

function handleClick(event) {
  event.preventDefault();
  alert("You clicked a breadcrumb.");
}

export default function SucioBreadcrumbs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs separator='/' aria-label='Breadcrumb'>
        <Link color='inherit' href='/' onClick={handleClick}>
          Material-UI
        </Link>
        <Link
          color='inherit'
          href='/getting-started/installation/'
          onClick={handleClick}
        >
          Core
        </Link>
        <Typography color='textPrimary'>Breadcrumb</Typography>
      </Breadcrumbs>
    </div>
  );
}
