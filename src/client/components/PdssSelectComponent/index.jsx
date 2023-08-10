import React from 'react';
function PdssSelectComponent({ label, selectOption, selectedValue, clickToAction, additionalClass, idToAdd }) {
	return (
		<div className={additionalClass ? additionalClass : 'cell medium-4'}>
			{label && <p className="label">{label}</p>}
			<select id={idToAdd ? idToAdd : 'child_sort'} value={selectedValue ? selectedValue : ''} onChange={clickToAction}>
				{selectOption.map((item, index) => {
					return (
						<option key={item?.label} value={item?.value}>
							{item?.label}
						</option>
					);
				})}
			</select>
		</div>
	);
}

export default PdssSelectComponent;
