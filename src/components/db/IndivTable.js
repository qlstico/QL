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
  }
}));

const IndivTable = () => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const [tableMatrix, setTableMatrix] = useState([]);
  const { selectedTableData } = useContext(DbRelatedContext);

  useEffect(() => {
    // using this as componentDidUpdate b/c the provider data from
    // context does not make it in time for the initial mounting
    const matrix = selectedTableData.map(row =>
      Object.values(row).map(value => value)
    );
    setTableMatrix(matrix);
  }, [selectedTableData]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    const [rowIdx, colIdx] = name.split('-');
    setTableMatrix(prevMatrix => {
      prevMatrix[rowIdx][colIdx] = value;
      return prevMatrix;
    });
  };

  const toggleEditMode = () => {
    setEditMode(prevEditMode => !prevEditMode);
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
                {Object.values(row).map((value, colIdx) =>
                  editMode ? (
                    <TableCell
                      key={`${rowIdx}-${colIdx}`}
                      component="th"
                      scope="row"
                    >
                      <TextField
                        type="text"
                        defaultValue={value}
                        name={`${rowIdx}-${colIdx}`}
                        onChange={handleInputChange}
                      />
                    </TableCell>
                  ) : (
                    <TableCell
                      key={`${rowIdx}-${colIdx}`}
                      component="th"
                      scope="row"
                      onDoubleClick={toggleEditMode}
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
