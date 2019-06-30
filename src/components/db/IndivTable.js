import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { DbRelatedContext } from '../index';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt1', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich1', 237, 9.0, 37, 4.3),
  createData('Eclair1', 262, 16.0, 24, 6.0),
  createData('Cupcake2', 305, 3.7, 67, 4.3),
  createData('Gingerbread3', 356, 16.0, 49, 3.9),
  createData('Frozen yfoghurt', 159, 6.0, 24, 4.0),
  createData('Ice creaem sandwich', 237, 9.0, 37, 4.3),
  createData('Eclafir', 262, 16.0, 24, 6.0),
  createData('Cuvpcake', 305, 3.7, 67, 4.3),
  createData('Gingerdbread', 356, 16.0, 49, 3.9),
  createData('Frozenfs yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice creasfm sandwich', 237, 9.0, 37, 4.3),
  createData('Eclafsdfir', 262, 16.0, 24, 6.0),
  createData('Cupcafsdke', 305, 3.7, 67, 4.3),
  createData('Gingerfdsfvdsbread', 356, 16.0, 49, 3.9),
  createData('Frozencssd yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cserream sandwich', 237, 9.0, 37, 4.3),
  createData('Ecseflair', 262, 16.0, 24, 6.0),
  createData('Cupfewgcake', 305, 3.7, 67, 4.3),
  createData('Gingeawerbread', 356, 16.0, 49, 3.9),
];

const IndivTable = () => {
  const { selectedTableData } = useContext(DbRelatedContext);
  const classes = useStyles();
  console.log('selected table Data in indivtable component', selectedTableData);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default IndivTable;
