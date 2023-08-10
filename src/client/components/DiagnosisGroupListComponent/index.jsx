import React, { Fragment } from 'react';
import { progressRing } from '../../../shared/helpers/properties';

// A function component to display a list of diagnosis groups with progress rings
function DiagnosisGroupListComponent({ diagnosisGroup }) {
	return (
		<div className="cell diagnostics">
			<div className="grid-x">
				{diagnosisGroup &&
					diagnosisGroup.diagnostics.map((diagnostic) => {
						// Calculate the progress ring properties for each diagnostic
						let percent = diagnostic?.process_percent || 0;
						const { strokeDasharray, strokeDashoffset } = progressRing(percent, 5);

						return (
							<Fragment key={`${diagnostic.title}-${percent}`}>
								{/* Renders the progress ring */}
								<div className="cell small-2">
									<span className="progress-ring" data-percent={percent}>
										<svg>
											<circle
												r="5"
												cx="10"
												cy="10"
												strokeDasharray={strokeDasharray}
												strokeDashoffset={strokeDashoffset}
											/>
										</svg>
									</span>
								</div>
								{/* Renders the diagnostic's title */}
								<div className="cell small-10">
									<p className="diagnostic">{diagnostic.title} </p>
								</div>
							</Fragment>
						);
					})}
			</div>
		</div>
	);
}

export default DiagnosisGroupListComponent;
