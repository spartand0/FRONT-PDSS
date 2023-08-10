import React from 'react';
import ChildListContainer from '../ChildListContainer';

function ChildBodyListContainer(props) {
	return (
		<div className="grid-x" id="children">
			<div className="cell large-12">{<ChildListContainer {...props} />}</div>
		</div>
	);
}

export default ChildBodyListContainer;
