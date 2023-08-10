import React from 'react';
import PropTypes from 'prop-types';

function PdssIconBoxComponent({ icon }) {
	return (
		<div className="icon-box">
			<span className={`entypo entypo-${icon}`}></span>
		</div>
	);
}
PdssIconBoxComponent.prototype = {
	icon: PropTypes.string
};
PdssIconBoxComponent.DefaultPropTypes = {
	icon: ''
};

export default PdssIconBoxComponent;
