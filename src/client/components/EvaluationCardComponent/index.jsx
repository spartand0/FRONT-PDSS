/* eslint-disable eqeqeq */
import React from 'react';

function EvaluationCardComponent({ label, score, raw_value, t }) {
	const color = score.interpretation < 0 ? 'red' : 'green';
	return (
		<div className="cell small-3">
			<div className={'container ' + (label == 'tvalue' ? color : '')}>
				<p className="value">
					<strong>{raw_value}</strong>
				</p>
				<p className="label">{t(`score_label_${label}`)}</p>
			</div>
		</div>
	);
}

export default EvaluationCardComponent;
