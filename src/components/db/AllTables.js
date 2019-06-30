import React, { useState, useEffect } from 'react';
import { DisplayCard } from '../index';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import storage from 'electron-json-storage';

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
  const [tables, setTables] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    storage.get('tableNames', (error, data) => {
      if (error) throw error;
      setTables(data);
    });
  }, []);
  return (
    <div>
      <h1>Tables: </h1>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {tables.map(table => (
              <Grid key={table} item>
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
