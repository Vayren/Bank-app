import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Maps from '../Map';
import './Modal.css';

function Modal ({ coords, isOpen, setOpen }){
	return(
		<React.Fragment>
			{isOpen && (
				<div className="modal">
					<HighlightOffIcon className="closeBtn" fontSize={"large"} onClick={() => {
						setOpen(false);
						document.querySelector('body').classList.remove('freezBody');
					}}/>
					<div className="modal-body">
						<Maps coords={coords} />
					</div>
				</div>
			)}
		</React.Fragment>
	)
}
export default Modal;