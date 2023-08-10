import React from 'react';
import PdssListComponent from '../../components/PdssListComponent';

export default function PdssCheckListComponent({ title, list }) {
	return (
		<div className="cell medium-8">
			<h3>{title}</h3>
			<ul className="checklist">
				{list.map((item, index) => (
					<PdssListComponent key={item} item={item} />
				))}
			</ul>
		</div>
	);
}
