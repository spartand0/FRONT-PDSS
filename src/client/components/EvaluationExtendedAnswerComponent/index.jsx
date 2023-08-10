import React from 'react';

function EvaluationExtendedAnswerComponent({ answers, t }) {
	// Function to render answer items
	const renderAnswerItems = () => {
		return answers.map(answer => {
			let additional_class = answer.additional[0]?.class;
			return (
				<li
					className={`${additional_class !== '' ? additional_class : ''}`}
					data-id={answer.question_id}
					data-belonging={answer.belonging_id}
					id={answer.id}
					key={answer.id}
				>
					<p>
						<span className="num">{answer.question_num}</span>
						<span className="text">{answer.answer}</span>
					</p>
					{/* Dropdown for selecting class */}
					<select className="class">
						<option value="">Bitte wählen</option>
						{['green', 'red', 'grey'].map(name => {
							return (
								<option key={name} value={name} className={answer.additional[0]?.class === name ? 'selected' : ''}>
									{t(`classes_${name}`)}
								</option>
							);
						})}
					</select>
					{/* Dropdown for selecting checks */}
					<select className="checks" multiple>
						{['1', '2'].map(name => {
							return (
								<option
								    key={name}
									value={name}
									className={answer.additional[0]?.checks?.includes(name) ? 'selected' : ''}
								>
									{t(`checks_${name}`)}
								</option>
							);
						})}
					</select>
					{/* Reset button */}
					<span className="reset entypo-back" title={t('title_reset')}></span>
				</li>
			);
		});
	};

	// Render answer items
	return <>{answers && renderAnswerItems()}</>;
}

export default EvaluationExtendedAnswerComponent;
