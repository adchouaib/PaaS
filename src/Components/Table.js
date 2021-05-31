import React ,{ useContext } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Redirect } from "react-router-dom";

import { AuthContext } from "../auth/auth";
import {auth} from "../auth/firebase";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 19,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(id,image, name, caracteristiques) {
  return {id,image, name, caracteristiques};
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const { currentUser } = useContext(AuthContext);
  const rows = props.data;
  const classes = useStyles();
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  
  return (
    <div>
    <br/>
    <div className = "flex justify-between">
      <h1 className = "font-extrabold text-xl">Boku No Hero Villains</h1>
      <button className="bg-black hover:bg-red-600 w-20 py-2 text-white rounded-lg" onClick={() => auth.signOut()}>Sign out</button>
    </div>
    <br/>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Caracteristiques </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                <img src={row.img} alt={row.nom} width="130"/>
              </StyledTableCell>
              <StyledTableCell align="right">{row.nom}</StyledTableCell>
              <StyledTableCell align="right">{row.caracs}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
