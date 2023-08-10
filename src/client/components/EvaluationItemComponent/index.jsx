/* eslint-disable */

import React, { useEffect, useState } from 'react';
import EvaluationCardComponent from '../EvaluationCardComponent';
import EvaluationExtendedAnswerComponent from '../EvaluationExtendedAnswerComponent';
import EvaluationTableComponent from '../EvaluationTableComponent';
import PdssWarningMessageComponent from '../PdssWarningMessageComponent';
import { useDispatch } from 'react-redux';
import { action_evaluation_setQuestions5 } from '../../../store/actions';
import { mapWindowsParamsQueriesToObject } from '../../../shared/helpers/properties';

function EvaluationItemComponent({ score, t, handleClickTab, session }) {
	const [accordionContent, setAccordionContent] = useState([',']);
	const dispatch = useDispatch();
	const [fragen, setFragen] = useState([]);
	const localParams = {
		diagnosticId: mapWindowsParamsQueriesToObject('id')
	};
	// Toggle accordion content
	const showAccordionContent = id => e => {
		e.preventDefault();
		if (accordionContent && accordionContent.includes(id)) {
			return setAccordionContent(accordionContent.filter(item => item !== id));
		} else {
			setAccordionContent([...accordionContent, id]);
		}
	};
	const handleQuestion = async (value, answer) => {
		let question = { ...value };
		question.answer = answer;

		setFragen(prevFragen => {
			// find the index of the question in the array
			const index = prevFragen.findIndex(q => q.id === question.id);

			if (index !== -1) {
				// make a copy of the array
				const newFragen = [...prevFragen];
				// replace the question in the array
				newFragen[index] = question;
				// update the questions in the database
				updateQuestions(session, JSON.stringify({ values: newFragen }));
				// return the new state
				return newFragen;
			}
			// if the question was not found in the array, just return the previous state
			return prevFragen;
		});
	};

	const updateQuestions = (session, newData) => {
		dispatch(action_evaluation_setQuestions5({ session, newData }));
	};
	useEffect(() => {
		if (score.type === 'questions') setFragen(score?.values);
	}, [score]);

	const handleNavigationButton = data => event => {
		switch (data) {
			case 5: {
				handleClickTab(event, 3, true);
				break;
			}
			case 6:
			case 9: {
				handleClickTab(event, 1, true);
				break;
			}
			default:
				break;
		}
	};

	// Render evaluation item component
	return (
		<div
			key={score.scoreName}
			className={'grid-x grid-margin-x grid-margin-y ' + (score.visible === 'no' ? 'hide' : '')}
		>
			{/* Headline */}
			<div className="cell headline">
				<p>
					<strong>{score.scoreName}</strong>
				</p>
			</div>
			{/* Score type: message */}
			{score.type === 'message' && score.scoreName === 'Bitte beachten' && (
				<div className="cell">
					<div className={'callout ' + (score.class !== undefined ? score.class : 'warning')}>
						{score.append_text ? (
							<p
								dangerouslySetInnerHTML={{
									__html: t(`${score.label}`) + score.append_text
								}}
							></p>
						) : (
							<p> {t(`${score.label}`)}</p>
						)}

						{score?.link?.label && (
							<p>
								<a
									className="button"
									href={`/files/downloads/all/${score?.link.href}`} target="_blank" rel="noopener noreferrer"
								>
									{t(`${score.link.label}`)}
								</a>
							</p>
						)}
					</div>
				</div>
			)}
			{/* Score type: values */}
			{score.type === 'values' && (
				<>
					{score.values &&
						Object.entries(score.values).map(([key, value]) => {
							let raw_value = value;
							if (key === 'raw_value') {
								raw_value = Math.trunc(value);
							}
							return (
								<EvaluationCardComponent
									t={t}
									key={`${key}-${score.scoreName}`}
									label={key}
									score={score}
									raw_value={raw_value}
								/>
							);
						})}
					{/* Warning message */}
					<div className="cell">
						<PdssWarningMessageComponent
							message={
								<p
									dangerouslySetInnerHTML={{
										__html: t(`score_interpretation_${score.interpretation}`)
									}}
								/>
							}
						/>
					</div>
				</>
			)}

			{/* Score type: table */}
			{score.type === 'table' && <EvaluationTableComponent t={t} score={score} />}

			{/* Score type: message */}
			{score.type === 'message' && score.scoreName !== 'Bitte beachten' && (
				<div className="cell">
					<div className={'callout ' + (score.class !== undefined ? score.class : 'warning')}>
						{score.append_text ? (
							<p
								dangerouslySetInnerHTML={{
									__html: t(`${score.label}`) + score.append_text
								}}
							></p>
						) : (
							<p> {t(`${score.label}`)}</p>
						)}

						{score.link && (
							<p
								className="button"
								onClick={handleNavigationButton(parseInt(localParams.diagnosticId.value))}
							>
								{t(`${score.link.label}`)}
							</p>
						)}
					</div>
				</div>
			)}

			{/* Score type: compact_values */}
			{score.type === 'compact_values' && (
				<>
					{score.values.map(value => {
						let raw_value;
						if (value.decimals !== undefined) {
							raw_value = value.raw_value || '0,0';
						} else raw_value = value.raw_value;
						return (
							<div
								key={value.name}
								className={'cell ' + (value.width ? value.width : 'auto')}
								data-title={value.name}
							>
								<div className={'container ' + value.class}>
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
					})}
				</>
			)}

			{/* Score type: questions */}
			{score.type === 'questions' && (
				<div className="cell questions">
					{fragen &&
						fragen?.map(value => {
							return (
								<div key={value.label} className={`grid-x enum ${value.answer ? ' answered' : ''}`}>
									<div className="cell small-10">
										<p className="question">{t(`questions_analysis_${value.label}`)}</p>
									</div>
									<div className="cell small-2" data-question-id={value.id}>
										<div className="grid-x">
											<div className="cell small-6">
												<a
													onClick={() => handleQuestion(value, 'correct')}
													className={`button correct ${value.answer === 'correct' ? ' selected' : ''
														} `}
												>
													<span className="entypo-check"></span>
												</a>
											</div>
											<div className="cell small-6">
												<a
													onClick={() => handleQuestion(value, 'incorrect')}
													className={`button incorrect ${value.answer === 'incorrect' ? ' selected' : ''
														} `}
												>
													<span className="entypo-cancel"></span>
												</a>
											</div>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			)}

			{/* Score type: answers */}
			{score.type === 'answers' && (
				<div className="cell classification">
					<label>Liste aller Antworten</label>
					<div className="legend">
						<p>
							<span className="green"></span>Vollständig{' '}
						</p>
						<p>
							<span className="red"></span>Unvollständig{' '}
						</p>
						<p>
							<span className="grey"></span>Elipse{' '}
						</p>
					</div>
					<div className="answers">
						<ul>
							<EvaluationExtendedAnswerComponent answers={score.values} t={t} />
						</ul>
					</div>
				</div>
			)}

			{/* Score type: text */}
			{score.type === 'text' && (
				<div className="cell">
					<p>{t(`${score.label}`)}</p>
				</div>
			)}

			{/* Score type: accordion */}
			{score.type === 'accordion' && (
				<div className="cell">
					<ul
						className="accordion values"
						data-accordion
						data-multi-expand="true"
						data-allow-all-closed="true"
					>
						{Object.entries(score.accordion).map(([key, value]) => {
							return (
								<>
									<li
										className={
											accordionContent && accordionContent.includes(key)
												? 'is-active accordion-item'
												: ' accordion-item'
										}
										onClick={showAccordionContent(key)}
										data-accordion-item
										key={key}
									>
										<a href="#" className="accordion-title">
											{key}
										</a>
									</li>
									{accordionContent && accordionContent.includes(key) && (
										<div
											className="accordion-content"
											style={{ display: 'block' }}
											data-tab-content
										>
											{value.values ? (
												<EvaluationTableComponent t={t} score={value} accordion={true} />
											) : (
												<p className="padding">Bisher noch nicht implementiert</p>
											)}
										</div>
									)}
								</>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}

export default EvaluationItemComponent;
