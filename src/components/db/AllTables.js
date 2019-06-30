import React, { useState, useContext } from 'react';
import { DisplayCard, DbRelatedContext } from '../index';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { ipcRenderer } from 'electron';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const AllTables = props => {
  const [spacing, setSpacing] = useState(2);
  const {
    tables: tablesContext,
    selectedDb,
    setSelectedTableData,
  } = useContext(DbRelatedContext);
  const classes = useStyles();

  const getTableContents = async (...args) => {
    await ipcRenderer.send('GET_TABLE_CONTENTS', args);
    await ipcRenderer.on('GET_TABLE_CONTENTS_REPLY', (event, arg) => {
      setSelectedTableData(arg);
    });
  };

  return (
    <div>
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
    </div>
  );
};

export default AllTables;

// {
// 	dummyTables.map(table => (
// 		<Grid container spacing={3}>
// 			<Grid item xs={3} sm={6}>
// 				<DisplayCard
// 					name={table.TableName}
// 					type="table"
// 					key={table.TableName}
