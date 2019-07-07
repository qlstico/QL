import React, { useState, useEffect, useContext } from "react";
import { DisplayCard, DbRelatedContext } from "../index";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import storage from "electron-json-storage";
import { ipcRenderer } from "electron";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
const {
  GET_TABLE_NAMES,
  GET_TABLE_NAMES_REPLY,
  CLOSE_SERVER
} = require("../../constants/ipcNames");

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(2)
  },
  highlightSelected: {
    background: "grey"
  }
}));

const AllDBs = props => {
  // For styling:
  const classes = useStyles();
  const [spacing] = useState(2);

  // Getting relevant information from context provider component
  const {
    setTables: setTablesContext,
    setSelectedDb,
    serverStatus,
    setServerStatus
  } = useContext(DbRelatedContext);

  // Setting up initial state values for rendering/interacting with components
  const [dbs, setDbs] = useState([]);
  const [currentlySelected, setCurrentlySelected] = useState(false);
  // Indirectly re-sets state to be the clicked on DB
  const enableSelected = dbName => {
    setCurrentlySelected(dbName);
  };

  // Hooks for setting/retrieving neccesary info to/from config file and context provider
  useEffect(() => {
    // componentDidMount to get all dbnames from local storage
    storage.get("dbnames", (error, data) => {
      if (error) throw error;
      setDbs(data); //setting that response to be component's stateful representation
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
    props.history.push("/tables"); // finally push onto the next component
  };

  return (
    <div>
      <h1>Databases: </h1>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={spacing}>
            {dbs.map(db => (
              <Grid
                key={db}
                className={
                  currentlySelected === db ? classes.highlightSelected : ""
                }
                item
                onClick={() => enableSelected(db)}
                onDoubleClick={() => selectDb(db)}
              >
                <DisplayCard className={classes.control} name={db} type='db' />
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
        Add Database
      </Button>
      <Button
        variant="contained"
        type="button"
        color="inherit"
        onClick={() => console.table(tableMatrix)}
      >
        Remove Database
      </Button> */}
    </div>
  );
};

export default withRouter(AllDBs);
