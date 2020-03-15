import React, {useContext} from 'react';
import Context from '../context';

function Currency({currency, rate}) {
	const { StyledTableRow, StyledTableCell } = useContext(Context);
	return(
		<StyledTableRow>
        	<StyledTableCell>{currency}</StyledTableCell>
            <StyledTableCell align="right">{Number(rate['bid'])}</StyledTableCell>
            <StyledTableCell align="right">{Number(rate['ask'])}</StyledTableCell>
        </StyledTableRow>
	)
}

export default Currency;
