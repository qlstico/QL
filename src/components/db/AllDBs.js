import React from "react";
import { DisplayCard } from "../index";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { root } from "postcss";

const dummyDbs = [
  { dbName: "Grace Shopper" },
  { dbName: "qlStico" },
  { dbName: "nyscene." }
];

const AllDBs = props => {
  return (
    <div>
      <h1>Databases: </h1>
      {dummyDbs.map(db => (
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <DisplayCard name={db.dbName} type='db' key={db.dbName} />
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default AllDBs;
