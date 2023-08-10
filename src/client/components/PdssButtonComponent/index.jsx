import React from 'react';

function PdssButtonComponent({ disabled, title, clickToAction, type, additionalClass, display }) {
	return display ? (
		<div
			className={'cell medium-4 ' + (additionalClass ? additionalClass : '') + (disabled ? ' disabled' : '')}
			onClick={e => {
				if (!disabled) clickToAction && clickToAction(e);
			}}
		>
			<button className="button " disabled={disabled} type={type}>
				{title}
			</button>
		</div>
	) : null;
}

export default PdssButtonComponent;
