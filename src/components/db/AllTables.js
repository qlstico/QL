import React, { useState, useContext, useEffect } from 'react';
import {
  DisplayCard,
  DbRelatedContext,
  GraphQLDisplayCard,
  VoyagerDisplayCard
} from '../index';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
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
  },
  highlightSelected: {
    background: 'yellow'
  }
}));

const AllTables = props => {
  // FOr styling:
  const classes = useStyles();
  const [spacing] = useState(2);

  // Getting relevant information from context provider component
  const {
    tables: tablesContext,
    selectedDb,
    setSelectedTableData,
    serverStatus,
    setServerStatus,
    setCurrentTable
  } = useContext(DbRelatedContext);

  const [currentlySelected, setCurrentlySelected] = useState(false);
  const enableSelected = tableName => {
    setCurrentlySelected(tableName);
  };

  // args === (table, selectedDb)
  const getTableContents = async (...args) => {
    setCurrentTable(args[0]);
    await ipcRenderer.send(GET_TABLE_CONTENTS, args);
    await ipcRenderer.on(GET_TABLE_CONTENTS_REPLY, (event, arg) => {
      setSelectedTableData(arg);
    });
    props.history.push('/single');
  };

  // Send provider a true value to kick on server
  useEffect(() => {
    setServerStatus(true);
  }, []);

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
                className={
                  currentlySelected === table ? classes.highlightSelected : ''
                }
                onClick={() => enableSelected(table)}
                onDoubleClick={() => getTableContents(table, selectedDb)}
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

export default withRouter(AllTables);
