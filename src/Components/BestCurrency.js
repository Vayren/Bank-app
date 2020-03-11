import React, { useContext, useEffect, useState } from 'react';
import Context from '../context';
import RoomIcon from '@material-ui/icons/Room';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Maps from './Map';

function BestCurrency(props) {

	let banks = props.banks;
	let [state, setState] = useState([]);

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
			return [min, objFromMap[min]];
		}else{
			let max = Math.max(...objKeys);
			return [max, objFromMap[max]];
		}	
	}
	let res = (props.field === 'buy') ? 
		bestCurrency('bid', banks, props.currency) :
		bestCurrency('ask', banks, props.currency);

	useEffect(() => {
		async function fetchProduct() {
			const respounse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${res[1].address} ${res[1].cityId}&key=KEY`);
			const json = await respounse.json();
			setState(json.results.map(item => {
				if(item.geometry.location) return {location: item.geometry.location, address: item.formatted_address};
				else return null;
			}));
		}
		fetchProduct();
	}, []);
	
	const { StyledTableRow, StyledTableCell } = useContext(Context);

	return(
		<StyledTableRow>
        	<StyledTableCell>{props.currency}</StyledTableCell>
            <StyledTableCell align="right">{res[0]}</StyledTableCell>
            <StyledTableCell align="right">
            	<div className="mapWrapper">
            		<HighlightOffIcon fontSize={"large"} className="closeBtn" onClick={e => {
            			let wrap = e.target.closest('.mapWrapper');
            			if(wrap){
            				wrap.classList.remove('visible')
            			}
            		}}>
            		</HighlightOffIcon>     			
					<Maps coords={state} />
            	</div>
            	<button className="mapBtn" onClick={e => {
	            		let wrapper = e.target.closest('td').querySelector('.mapWrapper');
	            		if(wrapper) wrapper.classList.add('visible');
		            }}>
	            	{res[1].title}
            		<RoomIcon/>
            	</button>
            </StyledTableCell>
        </StyledTableRow>
		
	)
}

export default BestCurrency;