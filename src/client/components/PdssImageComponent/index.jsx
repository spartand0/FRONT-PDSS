import React from 'react';

export default function PdssImageComponent({ path, alt }) {
	return (
		<div className="cell medium-4">
			<img src={`${process.env.REACT_APP_S3_ENDPOINT}/files/images/landingpage/` + path} alt={alt} />
		</div>
	);
}
