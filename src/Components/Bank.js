import React, {useState, useEffect} from 'react';
import CurrencyList from './CurrencyList';
import RoomIcon from '@material-ui/icons/Room';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Maps from './Map';

function Bank({bank}) {

	let [state, setState] = useState([]);

	useEffect(() => {
		async function fetchProduct() {
			const respounse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${bank.address} ${bank.cityId}&key=AIzaSyD_pYIplFYtz8DGJm_Sq-bJ_PPs16hqzlE`);
			const json = await respounse.json();
			setState(json.results.map(item => {
				if(item.geometry.location) return {location: item.geometry.location, address: item.formatted_address};
				else return null;
			}));
		}
		fetchProduct();
	}, []);

	return (
		<li>
			<div>
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
				<h3 className="bankLocation" onClick={e => {
	            		let wrapper = e.target.closest('div').querySelector('.mapWrapper');
	            		if(wrapper) wrapper.classList.add('visible');
		            }}>
		            {bank.title}
		            <RoomIcon/>
		        </h3>
				<CurrencyList currencies={bank.currencies}/>
			</div>
		</li>
	)
}

export default Bank;