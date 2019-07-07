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
  CREATE_TABLE_REPLY,
  DELETE_TABLE,
  DELETE_TABLE_REPLY
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

  // Sets and stores values provided from "add table" field
  const [tableToAdd, setTableToAdd] = useState(null);
  const handleInputChange = e => {
    const { name, value } = e.target;
    setTableToAdd(value);
  };

  // Managed which table is 'currently selected'
  const [currentlySelected, setCurrentlySelected] = useState(false);
  const enableSelected = tableName => {
    setCurrentlySelected(tableName);
  };

  // Retrieves the tables data from the double clicked table icon
  const getTableContents = async table => {
    setSelectedTable(table);
    setCurrentTable(table);
    await ipcRenderer.send(GET_TABLE_CONTENTS, [table, selectedDb]);
    await ipcRenderer.on(GET_TABLE_CONTENTS_REPLY, (event, tableData) => {
      setSelectedTableData(tableData);
    });
    props.history.push('/single');
  };

  // function for creating table via GUI
  const createNewTable = async (currentDb, newTableName) => {
    if (newTableName) {
      await ipcRenderer.send(CREATE_TABLE, [currentDb, newTableName]);
      await ipcRenderer.on(CREATE_TABLE_REPLY, (event, updatedTables) => {
        setTablesContext(updatedTables);
      });
    }
  };

  // function for deleting table via the GUI
  const deleteTable = async (currentDb, selectedTableName) => {
    if (selectedTableName) {
      await ipcRenderer.send(DELETE_TABLE, [currentDb, selectedTableName]);
      await ipcRenderer.on(DELETE_TABLE_REPLY, (event, updatedTables) => {
        setTablesContext(updatedTables);
      });
    }
  };

  // Send provider a true value to kick on server
  useEffect(() => {
    setServerStatus(true);
    //listens for rerender when anything in the tables context provider changes,
    // i.e. a table is added or removed
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
        label="Add New Table"
        name="newTableName"
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        type="button"
        color="inherit"
        size="small"
        onClick={() => createNewTable(selectedDb, tableToAdd)}
      >
        Add New Table
      </Button>
      {currentlySelected && (
        <Button
          variant="contained"
          type="button"
          color="inherit"
          size="small"
          onClick={() => deleteTable(selectedDb, currentlySelected)}
        >
          Remove Table
        </Button>
      )}
      {/* <TextField
        label='Table Name'
        name='newTableName'
        onChange={handleInputChange}
      /> */}
    </div>
  );
};

export default withRouter(AllTables);
