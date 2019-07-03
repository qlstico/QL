/* eslint-disable no-confusing-arrow */
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
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
  const classes = useStyles();
  const [editRow, setEditRow] = useState(false);
  const [tableMatrix, setTableMatrix] = useState([]);
  const { selectedTableData } = useContext(DbRelatedContext);

  const handleInputChange = (e, matrixRowIdx, dbEntryId) => {
    const { name, value } = e.target;
    const [rowIdx, colIdx] = name.split('-');

    setTableMatrix(prevMatrix => {
      prevMatrix[rowIdx][colIdx].value = value;
      return prevMatrix;
    });
  };

  useEffect(() => {
    // using this as componentDidUpdate b/c the provider data from
    // context does not make it in time for the initial mounting
    // const tableDataToUse = tableMatrix.length ? tableMatrix : selectedTableData;
    const matrix = selectedTableData.map(row =>
      // Passing in row id and val as obj to reference inside of handleInputChange and to reference as an attribute inside component
      Object.values(row).map(value => ({ value, id: row.id }))
    );
    setTableMatrix(matrix);
  }, [selectedTableData]);

  const enableEditRow = rowIdx => {
    setEditRow(rowIdx);
  };

  const removeEditRow = () => {
    setEditRow(false);
  };

  return tableMatrix.length ? (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              {/* Column Headers */}
              {Object.keys(selectedTableData[0]).map(key => {
                return (
                  <TableCell key={key} style={{ width: '10px' }}>
                    {key}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Table Data */}
            {tableMatrix.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {row.map(({ value, id }, colIdx) =>
                  editRow === rowIdx ? (
                    <TableCell
                      key={`${rowIdx}-${colIdx}`}
                      component="th"
                      scope="row"
                    >
                      <TextField
                        className={classes.textField}
                        type="text"
                        defaultValue={value}
                        name={`${rowIdx}-${colIdx}`}
                        onChange={e => handleInputChange(e, rowIdx, id)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell
                      key={`${rowIdx}-${colIdx}`}
                      component="th"
                      scope="row"
                      onDoubleClick={() => enableEditRow(rowIdx)}
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
      <Button
        variant="contained"
        type="button"
        onClick={() => console.table(tableMatrix)}
      >
        Submit
      </Button>
    </div>
  ) : (
    ''
  );
};

export default IndivTable;
