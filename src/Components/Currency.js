import React, {useContext} from 'react';
import Context from '../context';

function Currency(props) {
	const { StyledTableRow, StyledTableCell } = useContext(Context);
	return(
		<StyledTableRow>
        	<StyledTableCell>{props.currency}</StyledTableCell>
            <StyledTableCell align="right">{Number(props.rate['bid'])}</StyledTableCell>
            <StyledTableCell align="right">{Number(props.rate['ask'])}</StyledTableCell>
        </StyledTableRow>
	)
}

export default Currency;
