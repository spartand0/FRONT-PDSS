import React from 'react';

export default function GenericModalLayout({ children, open, title }) {
	return (
		open && (
			<div className={`reveal-overlay ${open && 'display_item_block'}`}>
				<div className={`reveal ${open && 'display_item_block'}`} id="modal-additional-signup">
					{title && <h3>{title}</h3>}
					{children}
				</div>
			</div>
		)
	);
}
