import React, {useState, useEffect} from 'react';
import CurrencyList from './CurrencyList';
import RoomIcon from '@material-ui/icons/Room';
import Modal from './Modal/Modal';

function Bank({bank}) {

	let [locationData, setLocationData] = useState([]);
	let [isOpen, setOpen] = useState(false);

	useEffect(() => {
		fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${bank.address} ${bank.cityId}&key=KEY`)
		.then(respounse => respounse.json())
		.then(json => {
			setLocationData(json.results.map(item => {
				if(item.geometry.location) return {location: item.geometry.location, address: item.formatted_address};
				else return false;
			}));
		})
	}, [bank]);

	return (
		<li>
			<div>
				<h3 className="bankLocation" onClick={() => {
					setOpen(true);
					document.querySelector('body').classList.add('freezBody');
				}}>
					{bank.title}
			        <RoomIcon/>
			    </h3>			
            	<Modal coords={locationData} isOpen={isOpen} setOpen={setOpen}/>
				<CurrencyList currencies={bank.currencies}/>
			</div>
		</li>
	)
}

export default Bank;