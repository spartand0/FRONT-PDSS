import React from 'react';

const DiagnosticAnalysisComponent = ({ diagnostic_analysis }) => {
	return (
		<div className="grid-x grid-margin-x grid-margin-y">
			{diagnostic_analysis &&
				diagnostic_analysis
					.filter(score => score?.type === 'compact_values')
					.map((score) =>
						score.values
							.filter(value => value?.width)
							.map((value) => {
								let decimals = value.decimals ? value.decimals : 0;
								let raw_value = Number(value.raw_value).toFixed(decimals);
								return (
									<div key={`${value.name}-${value.tvalue}`} className="cell small-3">
										<div className={`container ${value.class}`}>
											<p className="value">
												<strong>
													{raw_value}
													{value.name === 'Vollständigkeit' ? '%' : ''}
												</strong>
											</p>
											<p className="label">{value.name}</p>
											{value.tvalue && (
												<p className="overflow">
													T-WERT: <span className="tvalue">{value.tvalue}</span>
												</p>
											)}
										</div>
									</div>
								);
							})
					)}
		</div>
	);
};

export default DiagnosticAnalysisComponent;
