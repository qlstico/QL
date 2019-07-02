import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { DbRelatedContext } from "../index";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}));

const IndivTable = () => {
  const [editMode, setEditMode] = useState(false);
  const { selectedTableData } = useContext(DbRelatedContext);
  const classes = useStyles();

  const toggleEditMode = () => {
    setEditMode(prevEditMode => !prevEditMode);
  };

  return selectedTableData.length ? (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              {Object.keys(selectedTableData[0]).map(key => {
                console.log(key);
                return <TableCell key={key}>{key}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedTableData.map(row => (
              <TableRow key={selectedTableData.indexOf(row)}>
                {Object.values(row).map(value =>
                  editMode ? (
                    <TableCell key={value.id} component='th' scope='row'>
                      <input type='text' defaultValue={value} />
                    </TableCell>
                  ) : (
                    <TableCell
                      key={value.id}
                      component='th'
                      scope='row'
                      onDoubleClick={toggleEditMode}
                    >
                      {value}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  ) : (
    ""
  );
};

export default IndivTable;
