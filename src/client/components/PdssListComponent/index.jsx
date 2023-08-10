import React from 'react';

export default function PdssListComponent({ item }) {
	return (
		<li>
			<div dangerouslySetInnerHTML={{ __html: item }}></div>
		</li>
	);
}
