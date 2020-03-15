import React from 'react';
import Bank from './Bank';

function BanksList({banks}) {
	const styles = {
	    ul:{
	    	listStyle: "none",
	    	padding: 0,
	    	margin: 0
	    }
	}  
	return (
		<ul style={styles.ul}>
			{banks.map((bank, index) => {
				return <Bank bank={bank} key={index + 1} currencies={bank.currencies}/>
			})}
		</ul>
	)
}

export default BanksList;