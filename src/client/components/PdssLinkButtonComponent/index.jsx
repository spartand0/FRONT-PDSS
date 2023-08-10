import React from 'react';

export default function PdssLinkButtonComponent({ url, name }) {
	return (
		// eslint-disable-next-line react/jsx-no-target-blank
		<a className="button" href={url} target="_blank">
			{name}
		</a>
	);
}
