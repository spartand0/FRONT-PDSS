// Removed unnecessary `return` statements in the JSX code and used concise arrow functions.
// Combined the filtering and mapping operations for `valueScore` into a single `flatMap` operation.
// Simplified the conditional rendering of `td` elements by using a single `td` element with conditional properties.

import React from 'react';

// EvaluationTableComponent displays a table based on the provided score data
function EvaluationTableComponent({ score, t }) {
	const hiddenElements = ["replaced_letters", "has_replacement", "has_all_correct", "has_all_replaced"];
	let i = 0;
	return (
		<div className="cell">
			<table>
				<thead>
					<tr>
						{/* Render table headers */}
						{score.head.map((item) => (
							<th key={`table_head_${item}`}>{t(`table_head_${item}`)}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{/* Render table rows */}
					{(score.values && score.values.length > 0) ? (
						score.values.map((valueScore) => (
							<tr key={`row-${valueScore.name}`} className={valueScore.class || ''}>
								{/* Render table cells */}
								{Object.entries(valueScore)
									.filter(([key]) => key !== 'class')
									.flatMap(([key, value]) => {
										if (key === 'columns') {
											return value.map((v) => (
												<td key={`${valueScore.name}-${v}`} dangerouslySetInnerHTML={{ __html: v }} />
											));
										}
										if (hiddenElements.includes(key)) {
											return;
										}
										const cellValue = t(`table_head_${value}`).includes('table_head_')
											? value
											: t(`table_head_${value}`);
										i += 1;
										return (
											<td
												key={`${valueScore.name}-v-${i}`}
												dangerouslySetInnerHTML={
													['target','realized_as','affection'].includes(key)
														? { __html: value }
														: undefined
												}
											>
												{!['target','realized_as','affection'].includes(key) ? cellValue : null}
											</td>
										);
									})}
							</tr>
						))
					) : (
						// Display a message if no matching data is found
						<tr>
							<td colSpan={score.head.length}>{t('table_body_no_matching')}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default EvaluationTableComponent;
