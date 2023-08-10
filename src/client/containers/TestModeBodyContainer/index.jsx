import React from 'react';

export default function TestModeBodyContainer({ children }) {
	return (
		<div className="content">
			<div className="grid-container">{children}</div>
		</div>
	);
}
