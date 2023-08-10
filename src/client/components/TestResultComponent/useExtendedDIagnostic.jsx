/* eslint-disable  */
import { useState } from 'react';
import PdssExtendedResultComponent from '../PdssExtendedResultComponent';
import PdssClassificationComponent from '../PdssClassificationComponent/PdssClassificationComponent';
import PdssCheckBoxComponent from '../PdssCheckBoxComponent/PdssCheckBoxComponent';
import PdssTextComponent from '../PdssTextComponent/PdssTextComponent';

export default props => {
	const {
		diagnosticId,
		questionData,
		t,
		selectExtendedAnswer,
		selectClassificationAdditionalOptionAnswer,
		selectExtrasQuestionsAnswer
	} = props;

	const [checkListReferences, setCheckListReferences] = useState(null);
	const [classificationsResults, setClassificationsResults] = useState([]);
	const ShowExtendedQuestions = ({ children, hide }) => {
		if (questionData.diagnostic === 10 && !hide) {
			return <div className="diagnostic-content-extended always-show">{children[1]}</div>;
		}
		if (questionData.diagnostic == 9 && !hide)
			return (
				<>
					<div className="extended">
						<h3>{t('subheadline_results_extended')}</h3>
						{children[0]}
					</div>
					<div className="diagnostic-content-extended">{children[1]}</div>
				</>
			);
		if (
			([2, 7, 6].includes(Number(diagnosticId)) || [2, 7, 6].includes(Number(questionData.diagnostic))) &&
			questionData &&
			!hide
		)
			return (
				<div className="extended">
					<h3>{t('subheadline_results_extended')}</h3>
					{children[0]}
				</div>
			);
		else return null;
	};

	const MapDataToExtendedQuestionView = ({ dataType, data, content, answer_id, defaultAnswers, display }) => {
		// If `display` is false, return nothing
		if (!display) return;
		// Define a function that will set the selected answer for the current question
		const setCheckMarksValues = answer => selectExtendedAnswer({ [answer_id]: answer });

		// Switch statement to determine which type of question to render
		switch (dataType) {
			case 'enum': // If the question type is enum
				return (
					<div className={`grid-x answered ${dataType}`}>
						<div className="cell small-10">
							<p className="question">{t(data)}</p> {/* Display the question text */}
						</div>
						<div className="cell small-2">
							<div className="grid-x">
								<div className="cell small-6">
									{/* Render a button to select "correct" answer */}
									<a
										className={`button correct ${
											defaultAnswers[answer_id] === 'correct' ? ' selected ' : ''
										}`}
										onClick={() => setCheckMarksValues('correct')}
									>
										<span className="entypo-check"></span>
									</a>
								</div>
								<div className="cell small-6">
									{/* Render a button to select "incorrect" answer */}
									<a
										className={`button incorrect  ${
											!defaultAnswers[answer_id] || defaultAnswers[answer_id] === 'incorrect'
												? ' selected'
												: ''
										}`}
										onClick={() => setCheckMarksValues('incorrect')}
									>
										<span className="entypo-cancel"></span>
									</a>
								</div>
							</div>
						</div>
					</div>
				);

			case 'checkbox': // If the question type is checkbox
				return (
					<div className={`grid-x answered ${dataType}`}>
						<div className="cell" data-answer-id={data}>
							{/* Render a checkbox input */}
							<input
								type="checkbox"
								id={`${data}_${content?.id}`}
								checked={defaultAnswers[answer_id] === 'incorrect' ? true : false}
								onChange={e =>
									selectExtendedAnswer({
										[answer_id]: e.target.checked ? 'incorrect' : 'correct'
									})
								}
							/>
							{/* Display the label for the checkbox */}
							<label for={`${data}_${content?.id}`}>{t(data)}</label>
						</div>
					</div>
				);

			case 'phonetic': // If the question type is phonetic
				return <PdssExtendedResultComponent {...props} />;

			default: // If the question type is not recognized, return nothing
				return null;
		}
	};

	const pickQuestionViewByType = (
		{ type, label, answer, id, label_detail, question_id, questionAnswer, classificationResults },
		{ loopIndex }
	) => {
		classificationResults && setClassificationsResults(classificationResults);
		switch (type) {
			case 'text':
				return (
					<PdssTextComponent
						question_id={question_id}
						loopIndex={loopIndex}
						label={label}
						questionAnswer={questionAnswer}
						selectExtrasQuestionsAnswer={selectExtrasQuestionsAnswer}
					/>
				);
			case 'checkbox':
				return (
					<PdssCheckBoxComponent
						selectExtrasQuestionsAnswer={selectExtrasQuestionsAnswer}
						question_id={question_id}
						label={label}
						questionAnswer={questionAnswer}
						label_detail={label_detail}
					/>
				);
			case 'classification':
				return (
					<PdssClassificationComponent
						question_id={question_id}
						t={t}
						label={label}
						id={id}
						selectExtendedAnswer={selectExtendedAnswer}
						selectClassificationAdditionalOptionAnswer={selectClassificationAdditionalOptionAnswer}
						selectExtrasQuestionsAnswer={selectExtrasQuestionsAnswer}
						checkListReferences={checkListReferences}
						setCheckListReferences={setCheckListReferences}
						classificationsResults={classificationsResults}
					/>
				);
			default:
				return;
		}
	};

	const MapTheExtraQuestionWithNeededViewPortal = ({ extraContent }) => {
		if (!extraContent || extraContent.length === 0) return null;

		return extraContent?.map((qContent, loopIndex) => (
			<div className={`grid-x ${qContent.type}`} key={qContent.id}>
				{pickQuestionViewByType(qContent, { loopIndex })}
			</div>
		));
	};
	return { ShowExtendedQuestions, MapDataToExtendedQuestionView, MapTheExtraQuestionWithNeededViewPortal };
};
