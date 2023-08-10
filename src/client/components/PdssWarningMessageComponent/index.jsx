import React from 'react';
import PropTypes from 'prop-types';

function PdssWarningMessageComponent({ message }) {
	return <div className="callout warning">{message}</div>;
}

PdssWarningMessageComponent.prototype = {
	message: PropTypes.string
};
PdssWarningMessageComponent.DefaultPropTypes = {
	message: ''
};

export default PdssWarningMessageComponent;
