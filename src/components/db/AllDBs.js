import React, { useState, useEffect } from 'react';
import { DisplayCard } from '../index';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import storage from 'electron-json-storage';
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
  const [spacing, setSpacing] = useState(2);
  const [dbs, setDbs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    storage.get('dbnames', (error, data) => {
      if (error) throw error;
      setDbs(data);
    });
  }, []);
  console.log('dbs', dbs);
  return (
    <div>
      <h1>Databases: </h1>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {dbs.map(db => (
              <Grid key={db} item>
                <DisplayCard
                  className={classes.control}
                  name={db}
                  type="db"
                  key={db}
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
