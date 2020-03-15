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

function BestExTable({banks, field}) {
	const classes = useStyles();
	const { StyledTableCell } = useContext(Context);
	
	let currencies = [];
	banks.forEach(bank => {
		let bankCurrensies = Object.keys(bank.currencies);
		currencies.push(...bankCurrensies);
	})

	currencies = Array.from(new Set(currencies));

	function bestCurrency(field, banks, currency) {
		let bestBanks = new Map();

		for(let bank of banks){
			let isCurrency = bank.currencies[currency];
			if(isCurrency){
				bestBanks.set(Number(isCurrency[field]), {title:bank.title, address: bank.address, city: bank.cityId});
			}
		}
		let objFromMap = Object.fromEntries(bestBanks.entries());
		let objKeys = Object.keys(objFromMap);
		if(field === "ask"){
			let min = Math.min(...objKeys);
			return {currencyValue: min, bank: objFromMap[min]};
		}else{
			let max = Math.max(...objKeys);
			return {currencyValue: max, bank: objFromMap[max]};
		}	
	}

	return(
		<TableContainer component={Paper} className={classes.tableContainer}>
			 <Table className={classes.table} aria-label="customized table">
			 	<TableHead>
			 		<TableRow>
			        	<StyledTableCell>Currency</StyledTableCell>
			            <StyledTableCell align="right" className={classes.cell}>{field}</StyledTableCell>
			            <StyledTableCell align="right">Bank Title</StyledTableCell>
			        </TableRow>
			 	</TableHead>
			 	<TableBody>
		        	{currencies.map((currency, index) => {
						return(
							<BestCurrency 
								res={(field === "buy") ? bestCurrency('bid', banks, currency):
									bestCurrency("ask", banks, currency)
								} 
								currency={currency} 
								key={index}
							/>
						)
					})}
		        </TableBody>
			 </Table>
		</TableContainer>
	)
}

export default BestExTable;
