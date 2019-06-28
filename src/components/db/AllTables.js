import React from "react";
import { DisplayCard } from "../index";
import Grid from "@material-ui/core/Grid";

const dummyTables = [
  { TableName: "Users" },
  { TableName: "Products" },
  { TableName: "Sessions" },
  { TableName: "Orders" }
];

const AllTables = props => {
  return (
    <div>
      <h1>Tables: </h1>
      {dummyTables.map(table => (
        <Grid container spacing={3}>
          <Grid item xs={3} sm={6}>
            <DisplayCard
              name={table.TableName}
              type='table'
              key={table.TableName}
            />
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default AllTables;
