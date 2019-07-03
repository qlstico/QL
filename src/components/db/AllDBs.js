import React, { useState, useEffect, useContext } from 'react';
import { DisplayCard, DbRelatedContext } from '../index';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import storage from 'electron-json-storage';
import { root } from 'postcss';
import { ipcRenderer } from 'electron';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const AllDBs = props => {
  const [spacing, setSpacing] = useState(2);
  const [dbs, setDbs] = useState([]);
  const { setTables: setTablesContext, setSelectedDb } = useContext(
    DbRelatedContext
  );
  const classes = useStyles();

  useEffect(() => {
    // componentDidMount to get all dbnames from local storage
    storage.get('dbnames', (error, data) => {
      if (error) throw error;
      setDbs(data);
    });
  }, []);

  const selectDb = async dbname => {
    setSelectedDb(dbname); // set db name in context
    await ipcRenderer.send('GET_TABLE_NAMES', dbname); // message to get all table names
    await ipcRenderer.on('GET_TABLE_NAMES_REPLY', (_, tableNames) => {
      setTablesContext(tableNames);
    });
  };
  console.log(classes.control);
  return (
    <div>
      <h1>Databases: </h1>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {dbs.map(db => (
              <Grid key={db} item onClick={() => selectDb(db)}>
                <DisplayCard className={classes.control} name={db} type="db" />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AllDBs;
