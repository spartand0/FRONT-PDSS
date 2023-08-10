import React from 'react';
import { getPercent } from '../../../shared/helpers/properties';

// A function component to display a diagnosis group item with a progress bar
function DiagnosisGroupComponent({ diagnosisGroup }) {
	// Get the percentage of the diagnosis group's progress
	const percentage = getPercent(diagnosisGroup);

	return (
		<div className="cell group">
			<div className="grid-x">
				{/* Renders the diagnosis group's name */}
				<div className="cell small-7">
					<p className="name">{diagnosisGroup.name} </p>
				</div>
				{/* Renders the diagnosis group's progress */}
				<div className="cell small-5">
					<p className="process">
						<span className="status">{percentage}%</span>
						<span className="bar">
							<span className="width" style={{ width: percentage + '%' }}></span>
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default DiagnosisGroupComponent;
