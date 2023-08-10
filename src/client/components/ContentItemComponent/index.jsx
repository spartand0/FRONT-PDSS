import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDiagnosticContentEvaluation } from '../../../store/reducers/diagnosis.reducer';
import TestAsideComponent from '../TestAsideComponent';
import TestImageComponent from '../TestImageComponent';
import TestResultComponent from '../TestResultComponent';
import useContentItemComponent from './useContentItemComponent';
import { action_diagnosis_getDiagnosticContentEvaluation } from '../../../store/actions';

// A function component to display a content item in a list
function ContentItemComponent(props) {
	const { diagnosisSession } = props;
	// selector for list of diagnosis content evaluation page
	const diagnosis = useSelector(selectDiagnosticContentEvaluation);
	const getSelectedAnswer = (selectAnswer) => {
		if (!selectAnswer) {
			return "-";
		}
		return selectAnswer === 'correct' ? "Richtig" : "Falsch";
	}
	const {
		storeFinalResultAnswerAndNotes,
		handleExpandAccordionTest,
		getAccordionItemClassName,
		selectedDiagnosisContent,
		childSelectedImage,
		storeResultAnswerPhonetic,
		showExtendContent,
		localParams
	} = useContentItemComponent();

    const dispatch = useDispatch();
    const currentSession = localParams?.session?.value;
	const currentDiagnostic = localParams?.diagnosticId?.value;
    useEffect(() => {
		dispatch(
			action_diagnosis_getDiagnosticContentEvaluation({
				id: currentDiagnostic,
				session: currentSession
			})
		);
	}, [currentSession]);
	return diagnosis && diagnosis.map((content, index) => (
		<li key={content.id} className={getAccordionItemClassName(content)} data-accordion-item data-id={content.id}>
			<div className="accordion-title clearfix" onClick={handleExpandAccordionTest(content.id)}>
				<span className="inline id">{index + 1}</span>
				<span className="inline name">{content.name ? content.name : content.instruction}</span>
				{diagnosisSession.diagnostic !== 10 && diagnosisSession.diagnostic !== 5 && (
					<span className="inline answer">
						{getSelectedAnswer(content.selected_answer)}
					</span>
				)}
			</div>
			{showExtendContent.id === content.id && showExtendContent.show && selectedDiagnosisContent && (
				<div className="accordion-content" style={{ display: 'block' }}>
					<div className="test">
						<div className="content">
							<div className="grid-container">
								<div className="resultshow">
									<div className="grid-x">
										<div className="cell small-3">
											<aside id="eval-aside">
												<TestImageComponent
													{...props}
													diagnosticId={parseInt(localParams?.diagnosticId?.value)}
													hideInEvaluation={true}
													selectAnswer={() => { }}
													questionData={selectedDiagnosisContent[0]}
													childSelectedImage={childSelectedImage}
												/>
												<TestAsideComponent
													questionData={selectedDiagnosisContent[0]}
													{...props}
												/>
											</aside>
										</div>
										<div className="cell small-9">
											<TestResultComponent
												{...props}
												diagnosticId={content.diagnostic}
												hideInEvaluation
												selectClassificationAdditionalOptionAnswer={event =>
													storeFinalResultAnswerAndNotes({ additionalContent: event })
												}
												storeSyllableData={answer =>
													storeResultAnswerPhonetic({ answer: answer })
												}
												storeCurrentSlideNote={e =>
													selectedDiagnosisContent[0] != e.target.value &&
													storeFinalResultAnswerAndNotes({
														result: { notes: e.target.value }
													})
												}
												questionData={selectedDiagnosisContent[0]}
												selectAnswer={answer =>
													selectedDiagnosisContent[0]?.selected_answer != answer &&
													storeFinalResultAnswerAndNotes({ result: { answer } })
												}
												selectExtendedAnswer={event =>
													storeFinalResultAnswerAndNotes({ extended: event })
												}
												selectExtrasQuestionsAnswer={event =>
													storeFinalResultAnswerAndNotes({ extraContent: event })
												}
												session={diagnosisSession}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</li>
	));
}

export default ContentItemComponent;
