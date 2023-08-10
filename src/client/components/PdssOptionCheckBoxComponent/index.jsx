import React from 'react';

export default function PdssOptionCheckBoxComponent({ defaultValue, id, label, name, onChange }) {
	return (
		<li>
			<input type="checkbox" defaultValue={defaultValue} id={id} defaultChecked onChange={e => onChange(e)} />
			<label htmlFor={label}>{name}</label>
		</li>
	);
}
