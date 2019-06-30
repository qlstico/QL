import React from 'react';
import { DisplayCard } from '../index';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { root } from 'postcss';

const dummyDbs = [
  { dbName: 'Grace Shopper' },
  { dbName: 'qlSEtico' },
  { dbName: 'lelme.' },
  { dbName: 'Blemmer Shopper' },
  { dbName: 'qlStico' },
  { dbName: 'eek.' },
  { dbName: 'Chees Shopper' },
  { dbName: 'qlStklfkglico' },
  { dbName: 'nyscdsm,fene.' },
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const AllDBs = props => {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <div>
      <h1>Databases: </h1>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {dummyDbs.map(db => (
              <Grid key={db.dbName} item>
                <DisplayCard
                  className={classes.control}
                  name={db.dbName}
                  type="db"
                  key={db.dbName}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AllDBs;
