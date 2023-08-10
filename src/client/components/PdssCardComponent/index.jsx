import React from 'react';

export default function PdssCardComponent({ backgroundImage, title, description }) {
	return (
		<div className="cell medium-6 large-4">
			<div className="box">
				<div className="image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
				<div className="text">
					<div className="padding">
						<p>
							<strong>{title}</strong>
						</p>
						<p className="subline">{description}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
