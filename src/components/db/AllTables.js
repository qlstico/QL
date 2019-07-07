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
import { Button, TextField } from '@material-ui/core/';
const {
  GET_TABLE_CONTENTS,
  GET_TABLE_CONTENTS_REPLY,
  CREATE_TABLE,
  CREATE_TABLE_REPLY
} = require('../../constants/ipcNames');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(2)
  },
  highlightSelected: {
    background: 'grey'
  }
}));

const AllTables = props => {
  // FOr styling:
  const classes = useStyles();
  const [spacing] = useState(2);

  // Getting relevant information from context provider component
  const {
    tables: tablesContext,
    setTables: setTablesContext,
    selectedDb,
    setSelectedTableData,
    serverStatus,
    setServerStatus,
    setSelectedTable,
    setCurrentTable
  } = useContext(DbRelatedContext);

  const [tableToAdd, setTableToAdd] = useState(null);
  const handleInputChange = e => {
    const { name, value } = e.target;
    setTableToAdd(value);
  };

  const [currentlySelected, setCurrentlySelected] = useState(false);
  const enableSelected = tableName => {
    setCurrentlySelected(tableName);
  };

  // args === (table, selectedDb)
  const getTableContents = async table => {
    setSelectedTable(table);
    setCurrentTable(table);
    await ipcRenderer.send(GET_TABLE_CONTENTS, [table, selectedDb]);
    await ipcRenderer.on(GET_TABLE_CONTENTS_REPLY, (event, tableData) => {
      setSelectedTableData(tableData);
    });
    props.history.push('/single');
  };

  const createNewTable = async (db, newTableName) => {
    await ipcRenderer.send(CREATE_TABLE, [db, newTableName]);
    await ipcRenderer.on(CREATE_TABLE_REPLY, (event, updatedTables) => {
      setTablesContext(updatedTables);
    });
  };
  // Send provider a true value to kick on server
  useEffect(() => {
    setServerStatus(true);
  }, [tablesContext]);

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

      <TextField
        label="Table Name"
        name="newTableName"
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        type="button"
        color="inherit"
        onClick={() => createNewTable(selectedDb, tableToAdd)}
      >
        Add Table
      </Button>
      <Button variant="contained" type="button" color="inherit">
        Remove Table
      </Button>
    </div>
  );
};

export default withRouter(AllTables);
