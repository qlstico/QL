import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import storage from 'electron-json-storage';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import BreadcrumbsElem from './Breadcrumbs';
const {
  GET_DB_NAMES,
  GET_DB_NAMES_REPLY,
  CLOSE_SERVER
} = require('../../constants/ipcNames');

const getAllDBNames = async () => {
  await ipcRenderer.send(GET_DB_NAMES);
  await ipcRenderer.on(GET_DB_NAMES_REPLY, (_, databaseNames) => {
    storage.set('dbnames', databaseNames, error => {
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
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
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

  // async function sendHome() {
  //   props.history.push('/');
  //   await ipcRenderer.send(CLOSE_SERVER);
  // }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={() => props.history.push('/')}
          >
            qlStico
          </Typography>
          <BreadcrumbsElem
            location={props.location.pathname}
            history={props.history}
          />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="autorenew"
              color="inherit"
              onClick={() => props.history.goBack()}
            >
              <ArrowBack />
            </IconButton>
            {/* <IconButton
              aria-label="autorenew"
              color="inherit"
              onClick={() => props.history.goForward()}
            >
              <ArrowForward />
            </IconButton> */}
            <IconButton
              edge="end"
              aria-label="Account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
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
