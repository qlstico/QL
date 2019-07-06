import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { ipcRenderer } from 'electron';
import { DbRelatedContext } from '../index';

const { CLOSE_SERVER } = require('../../constants/ipcNames');

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  paper: {
    padding: theme.spacing(1, 2)
  }
}));

const BreadcrumbsElem = props => {
  const classes = useStyles();
  const { selectedDb, currentTable } = useContext(DbRelatedContext);

  return (
    <div className={classes.root}>
      <Breadcrumbs separator="/" aria-label="Breadcrumb">
        <Link id="breadcrumbs" onClick={() => props.history.push('/')}>
          Connect
        </Link>
        {props.location !== '/' ? (
          <Link id="breadcrumbs" onClick={() => props.history.push('/dbs')}>
            Databases
          </Link>
        ) : (
          ''
        )}
        {props.location === '/tables' ? (
          <Link id="breadcrumbs" onClick={() => props.history.push('/tables')}>
            {selectedDb}
          </Link>
        ) : (
          ''
        )}
        {props.location === '/single' ? (
          <div>
            <Link
              id="breadcrumbs"
              onClick={() => props.history.push('/tables')}
            >
              {selectedDb}
            </Link>
            {'  /  '}
            <Link
              id="breadcrumbs"
              onClick={() => props.history.push('/single')}
            >
              {currentTable}
            </Link>
          </div>
        ) : (
          ''
        )}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsElem;
