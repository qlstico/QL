
import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { DbRelatedContext } from '../index';
import TextField from '@material-ui/core/TextField';
import { ipcRenderer } from 'electron';
const { UPDATE_TABLE_DATA } = require('../../constants/ipcNames');


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
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const IndivTable = () => {
  // For styling components, referencing this directly in
  // components className to access the above styling objects ^^^
  const classes = useStyles();

  // Grabbing the tabledata from the context provider
  const { selectedTableData } = useContext(DbRelatedContext);

  // Setting the matrix created from the context provider's array of objs
  // to render the table cells and to have a 'sandbox copy' in the state
  // to compare changes against the context provider's original version
  const [tableMatrix, setTableMatrix] = useState([]);

  // Will hopefully be able to independently track any changes made to send a smaller
  // load of only pertinent information to the server to make the requested changes
  const [changesMade, setChangesMade] = useState([]);

  // Using this as componentDidMount && componentDidUpdate b/c the provider data from
  // context does not make it in time for the initial mounting
  useEffect(() => {
    // Creating a 2-d matrix of the selectedTableData from provider in order to
    // represent each object in the selectedTableData array as a row, and each of the
    // values in the 'row obj' as a cell
    const matrix = selectedTableData.map(row =>
      // Passing in row id and val as obj to reference inside of
      // handleInputChange and to reference as an attribute inside component
      // Object.values(row).map(value => ({ value, id: row.id }))
      Object.entries(row).map(([key, value]) => ({ value, id: row.id, key }))
    );
    // Setting the matrix created above as the state for the component instead of
    // just using the context provider directly in order to have a copy we can work with without
    // affecting the true values represented by the provider. This lets us have
    // a sandbox to play with any changes without commiting to them until we hit submit.
    setTableMatrix(matrix);
    // We're listening for any changes in selectedDataTable since it takes a little
    // bit for this to come through, therefore we need to update once we actually
    // get ahold of this to properly set our state an kick off rending of the grid table.
  }, [selectedTableData]);

  // Handling any changes in the grid's cells - takes the event to identify the target cell, the row
  // in the matrix the cell exists in, and the ID of the cell's parent row/obj as it exists in the db
  const handleInputChange = (e, matrixRowIdx, dbEntryId, fieldName) => {
    // Destructures the 'name' and value of the event target for ease of access to them
    const { name, value } = e.target;
    // Destructures the rowIdx and colIdx from the string returned by the event.target.name
    const [rowIdx, colIdx] = name.split("-");

    // Makes the changes in state's matrix using the rowIdx and
    //colIdx to locate it's position and rewritting it's value
    setTableMatrix(prevMatrix => {
      // Matrix cells contain objects, therefore we need to find
      //the cell, and reset the value prop within the cell's obj
      prevMatrix[rowIdx][colIdx].value = value;
      return prevMatrix;
    });

    // setChangesMade(prevChanges => {
    //   prevChanges.push({ id: dbEntryId, [fieldName]: value });
    //   return prevChanges;
    // });
  };

  const handleUpdateSubmit = async () => {
    await ipcRenderer(UPDATE_TABLE_DATA, tableMatrix);
  };

  // Tracking which row is in 'edit mode'
  const [editRow, setEditRow] = useState(false);

  // Sets the selected row for editing
  const enableEditRow = rowIdx => {
    setEditRow(rowIdx);
  };

  // Removes the selected editable row from 'edit mode'
  const removeEditRow = () => {
    setEditRow(false);
  };

  return tableMatrix.length ? (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              {/* Column Headers */}
              {Object.keys(selectedTableData[0]).map(key => {
                return (
                  <TableCell key={key} style={{ width: "10px" }}>
                    {key}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Table Rows Data */}
            {tableMatrix.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {/* Rows cell data */}
                {row.map(({ value, id, key }, colIdx) =>
                  // Checks to see if this row is the editable row, if it is render cells as
                  // textField, else render as a normal read only cells.
                  editRow === rowIdx ? (
                    <TableCell
                      key={`${rowIdx}-${colIdx}`}
                      component='th'
                      scope='row'
                    >
                      <TextField
                        className={classes.textField}
                        type='text'
                        defaultValue={value}
                        // Name field is how we reference this cell's equivalent
                        // position in the state matrix to make changes
                        name={`${rowIdx}-${colIdx}`}
                        onChange={e => handleInputChange(e, rowIdx, id, key)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell
                      key={`${rowIdx}-${colIdx}`}
                      component='th'
                      scope='row'
                      // Set this row to be the selected row for 'edit mode' in
                      // the state to rerender as a textField
                      onDoubleClick={() => enableEditRow(rowIdx)}
                      // If this is not an 'edit mode' row, clicking on it will
                      // remove 'edit mode'
                      onClick={() => removeEditRow()}
                      name={`${rowIdx}-${colIdx}`}
                    >
                      {`${value}`}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Button variant="contained" type="button" onClick={handleUpdateSubmit}>

        Submit
      </Button>
      <Button
        variant='contained'
        type='button'
        onClick={() => console.table(tableMatrix)}
      >
        Add Row
      </Button>
      <Button
        variant='contained'
        type='button'
        onClick={() => console.table(tableMatrix)}
      >
        Remove Row
      </Button>
    </div>
  ) : (
    ""
  );
};

export default IndivTable;
