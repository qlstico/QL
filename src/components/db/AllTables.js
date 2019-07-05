import React, { useState, useContext, useEffect } from 'react';
import {
  DisplayCard,
  DbRelatedContext,
  GraphQLDisplayCard,
  VoyagerDisplayCard
} from '../index';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ipcRenderer } from 'electron';
const {
  GET_TABLE_CONTENTS,
  GET_TABLE_CONTENTS_REPLY
} = require('../../constants/ipcNames');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const AllTables = () => {
  const [spacing] = useState(2);
  const {
    tables: tablesContext,
    selectedDb,
    setSelectedTableData,
    serverStatus,
    setServerStatus
  } = useContext(DbRelatedContext);
  const classes = useStyles();

  // args === (table, selectedDb)
  const getTableContents = async (...args) => {
    await ipcRenderer.send(GET_TABLE_CONTENTS, args);
    await ipcRenderer.on(GET_TABLE_CONTENTS_REPLY, (event, arg) => {
      setSelectedTableData(arg);
    });
  };

  useEffect(() => {
    setServerStatus(true);
  }, []);
  console.log({ serverStatus });

  return (
    <div>
      <h1>GraphQL Tools: </h1>
      <GraphQLDisplayCard />
      <VoyagerDisplayCard />
      <h1>Tables: </h1>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {tablesContext.map(table => (
              <Grid
                key={table}
                item
                onClick={() => getTableContents(table, selectedDb)}
              >
                <DisplayCard
                  className={classes.control}
                  name={table}
                  type="table"
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {/* <Button
        variant="contained"
        type="button"
        color="inherit"
        onClick={() => console.table(tableMatrix)}
      >
        Add Table
      </Button>
      <Button
        variant="contained"
        type="button"
        color="inherit"
        onClick={() => console.table(tableMatrix)}
      >
        Remove Table
      </Button> */}
    </div>
  );
};

export default AllTables;
