import React, { useContext } from 'react';
import Currency from './Currency';
import Context from '../context';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    maxWidth: 700,
  },
  tableContainer:{
  	maxWidth: 700
  },
});

function CurrencyList(props) {
	const { StyledTableCell } = useContext(Context);
	const classes = useStyles();

	return (
		<TableContainer component={Paper} className={classes.tableContainer}>
			 <Table className={classes.table} aria-label="customized table">
			 	<TableHead>
			 		<TableRow>
			        	<StyledTableCell>Currency</StyledTableCell>
			            <StyledTableCell align="right">Buy</StyledTableCell>
			            <StyledTableCell align="right">Sale</StyledTableCell>
			        </TableRow>
			 	</TableHead>
			 	<TableBody>
		        	{Object.entries(props.currencies).map((arrayItem, index) => {
						return <Currency currency={arrayItem[0]} rate={arrayItem[1]} key={index}/>
					})}
		        </TableBody>
			 </Table>
		</TableContainer>
	)
}

export default CurrencyList;