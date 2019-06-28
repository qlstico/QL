import React from 'react';
import { DisplayCard } from '../index';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const dummyTables = [
  { TableName: 'Users' },
  { TableName: 'Products' },
  { TableName: 'Sessions' },
  { TableName: 'Orders' },
  { TableName: 'Users' },
  { TableName: 'Products' },
  { TableName: 'Sessions' },
  { TableName: 'Orders' },
  { TableName: 'Users' },
  { TableName: 'Products' },
  { TableName: 'Sessions' },
  { TableName: 'Orders' }
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const AllTables = props => {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <div>
      <h1>Tables: </h1>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {dummyTables.map(table => (
              <Grid key={table.TableName} item>
                <DisplayCard
                  className={classes.control}
                  name={table.TableName}
                  type="table"
                  key={table.TableName}
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
