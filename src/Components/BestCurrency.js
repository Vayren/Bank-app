import React, { useContext, useEffect, useState } from 'react';
import Context from '../context';
import RoomIcon from '@material-ui/icons/Room';
import Modal from './Modal/Modal';

function BestCurrency({ currency, res }) {
	let [locationData, setLocationData] = useState([]);
	let [isOpen, setOpen] = useState(false);

	useEffect(() => {
		fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${res.bank.address} ${res.bank.cityId}&key=KEY`)
		.then(respounse => respounse.json())
		.then(json => {
			setLocationData(json.results.map(item => {
				if(item.geometry.location) return {location: item.geometry.location, address: item.formatted_address};
				else return false;
			}));
		})
	}, [res]);
	
	const { StyledTableRow, StyledTableCell } = useContext(Context);

	return(
		<StyledTableRow>
        	<StyledTableCell>{currency}</StyledTableCell>
            <StyledTableCell align="right">{res.currencyValue}</StyledTableCell>
            <StyledTableCell align="right">
            	<button className="mapBtn" onClick={() => {
					setOpen(true);
					document.querySelector('body').classList.add('freezBody');
				}}>
	            	{res.bank.title}
            		<RoomIcon/>
            	</button>
            	<Modal coords={locationData} isOpen={isOpen} setOpen={setOpen}/>
            </StyledTableCell>
        </StyledTableRow>
	)
}

export default BestCurrency;