import React from 'react';

export default function PdssCheckBoxListComponent({ id, label, status, name, handleChange, checked }) {
	return (
		<li>
			<input
				type="checkbox"
				id={id}
				checked={checked}
				onChange={() => handleChange(id, !checked)}
				disabled={!status}
			/>

			<label htmlFor={label}>{name}</label>
		</li>
	);
}
