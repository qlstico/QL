import React, { useState, useEffect, useContext } from "react";
import { DisplayCard, DbRelatedContext } from "../index";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import storage from "electron-json-storage";
import { ipcRenderer } from "electron";
import Button from "@material-ui/core/Button";

const {
  GET_TABLE_NAMES,
  GET_TABLE_NAMES_REPLY,
  CLOSE_SERVER
} = require('../../constants/ipcNames');


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const AllDBs = () => {
  const [spacing] = useState(2);
  const [dbs, setDbs] = useState([]);
  const {
    setTables: setTablesContext,
    setSelectedDb,
    serverStatus,
    setServerStatus
  } = useContext(DbRelatedContext);
  const classes = useStyles();

  useEffect(() => {
    // componentDidMount to get all dbnames from local storage
    storage.get("dbnames", (error, data) => {
      if (error) throw error;
      setDbs(data);
    });
    if (serverStatus) {
      ipcRenderer.send(CLOSE_SERVER);
      setServerStatus(false);
    }
  }, [serverStatus]);

  // when user clicks database, sends message to trigger getting the table data
  // set context with table names
  const selectDb = async dbname => {
    setSelectedDb(dbname); // set db name in context
    await ipcRenderer.send(GET_TABLE_NAMES, dbname); // message to get all table names
    await ipcRenderer.on(GET_TABLE_NAMES_REPLY, (_, tableNames) => {
      setTablesContext(tableNames);
    });
  };
  console.log('IN ALLDBs COMPONENT: ', { serverStatus });
  return (
    <div>
      <h1>Databases: </h1>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={spacing}>
            {dbs.map(db => (
              <Grid key={db} item onClick={() => selectDb(db)}>
                <DisplayCard className={classes.control} name={db} type='db' />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Button
        variant='contained'
        type='button'
        color='green'
        onClick={() => console.table(tableMatrix)}
      >
        Add Database
      </Button>
      <Button
        variant='contained'
        type='button'
        onClick={() => console.table(tableMatrix)}
      >
        Remove Database
      </Button>
    </div>
  );
};

export default AllDBs;
