/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';

function PdssInputComponent  ({
	label,
	clickToAction,
	changeAction,
	value,
	type,
	iconClassName,
	additionalClass,
	id,
	placeholder
}) {
	return (
		<div className={additionalClass}>
			{label && <p className="label">{label}</p>}
			<div className="input-group" id={id}>
				<input
					className="input-group-field"
					type={type}
					value={value}
					placeholder={placeholder}
					onChange={e => {
						changeAction(e);
					}}
				/>
				<div className="input-group-button">
					<a
						className="button"
						onClick={e => {
							clickToAction(e, value);
						}}
					>
						<span className={`entypo-${iconClassName}`}></span>
					</a>
				</div>
			</div>
		</div>
	);
};
PdssInputComponent.prototype = {
	label: PropTypes.string,
	iconClassName: PropTypes.string
};

PdssInputComponent.DefaultPropTypes = {
	title: ''
};

export default PdssInputComponent;
