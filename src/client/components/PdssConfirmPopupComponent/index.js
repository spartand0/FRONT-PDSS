import React from 'react';

function PdssConfirmPopup({ show, title, description, closePopup, ConfirmPopup }) {
	return (
		show && (
			<div className="reveal-overlay" style={{ display: 'block' }}>
				<dialog open className="show-popup">
					<h3>{title}</h3>
					<div className="grid-x ">
						<p className="description">{description}</p>
					</div>
					<div className="grid-x grid-margin-y ">
						<div className="cell small-6">
							<button type="button" className="button grey" onClick={closePopup}>
								close
							</button>
						</div>
						<div className="cell small-6 text-right">
							<button
								type="submit"
								className="button save"
								onClick={ConfirmPopup}
							>
								ok
							</button>
						</div>
					</div>
				</dialog>
			</div>
		)
	);
}

export default PdssConfirmPopup;
