import React, { useContext } from 'react';
import BestCurrency from './BestCurrency';
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
  tableContainer: {
  	maxWidth: 700,
  	marginBottom: "2rem"
  },
  cell:{
  	textTransform: "uppercase"
  },
 
});

function BestExTable(props) {
	const classes = useStyles();
	const { StyledTableCell } = useContext(Context);
	
	let banks = props.banks;
	let currencies = [];
	banks.forEach(bank => {
		let bankCurrensies = Object.keys(bank.currencies);
		currencies.push(...bankCurrensies);
	})

	currencies = Array.from(new Set(currencies));

	return(
		<TableContainer component={Paper} className={classes.tableContainer}>
			 <Table className={classes.table} aria-label="customized table">
			 	<TableHead>
			 		<TableRow>
			        	<StyledTableCell>Currency</StyledTableCell>
			            <StyledTableCell align="right" className={classes.cell}>{props.field}</StyledTableCell>
			            <StyledTableCell align="right">Bank Title</StyledTableCell>
			        </TableRow>
			 	</TableHead>
			 	<TableBody>
		        	{currencies.map((currency, index) => {
						return <BestCurrency banks={banks} field={props.field} currency={currency} key={index}/>
					})}
		        </TableBody>
			 </Table>
		</TableContainer>
	)
}

export default BestExTable;
