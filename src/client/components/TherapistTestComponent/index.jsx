import TestImageComponent from '../TestImageComponent';
import TestAsideComponent from '../TestAsideComponent';
import TestResultComponent from '../TestResultComponent';
import FullScreenLoaderContainer from '../../containers/FullScreenLoaderContainer';
import TherapistTestFooterComponent from '../TherapistTestFooterComponent';
import useTestComponent from './useTestComponent';
import { Fragment, createRef, useEffect } from 'react';
import OnKeyPressComponent from '../KeyPressComponent';
import { action_diagnosis_getDiagnosticContent } from '../../../store/actions';
import { mapWindowsParamsQueriesToObject, textSpeechProvider } from '../../../shared/helpers/properties';

const TherapistTestComponent = props => {
	const { data, DataPointer, session, hideInEvaluation, stop } = props;
	const {
		diagnostic,
		skipToTheNextPage,
		childSelectedImage,
		updateCurrentSession,
		skipToThePreviousPage,
		compareToGetAnswerStatus,
		sendBackCurrentStateData,
		storeFinalResultAnswerAndNotes,
		storeResultAnswerPhonetic,
		answerButtonRef
	} = useTestComponent(props, props.getCurrentTime);

	const localParams = {
		diagnosticId: mapWindowsParamsQueriesToObject('id'),
		childId: mapWindowsParamsQueriesToObject('child'),
		token: mapWindowsParamsQueriesToObject('token'),
		session: mapWindowsParamsQueriesToObject('session')
	};

	const audioRef = createRef();

	useEffect(() => {
		action_diagnosis_getDiagnosticContent({
			id: localParams?.diagnosticId?.value,
			session: localParams?.session?.value
		});
	}, []);

	if (data?.length == 0) return <FullScreenLoaderContainer />;

	const handelRenderClassName = () => {
		if (data[DataPointer]?.selected_answer) {
			if (data[DataPointer]?.selected_answer == 'correct') return 'answered correct';
			else return 'answered incorrect';
		} else return '';
	};

	//store data after pressing F or R from keyboard
	const handleStoreCurrentData = currentAnswer => event => {
		answerButtonRef.current &&
			data[DataPointer]?.selected_answer != currentAnswer &&
			storeFinalResultAnswerAndNotes({ result: { answer: currentAnswer } });
	};
	const handlePlayInstruction = (instruction_audio, instruction) => event => {
		if (instruction_audio) audioRef?.current?.play();
		else textSpeechProvider(instruction);
	};
	return (
		<Fragment>
			<OnKeyPressComponent
				next={skipToTheNextPage}
				previous={skipToThePreviousPage}
				fPress={handleStoreCurrentData('incorrect')}
				rPress={handleStoreCurrentData('correct')}
				iPress={handlePlayInstruction(data[DataPointer].instruction_audio,data[DataPointer].instruction)}
			>
				{!hideInEvaluation && (
					<TestImageComponent
						{...props}
						selectAnswer={an => compareToGetAnswerStatus(an)}
						questionData={data[DataPointer]}
						childSelectedImage={childSelectedImage}
					/>
				)}
				<div className="resultshow">
					<div className="orbit">
						<div className="orbit-wrapper">
							<ul className="orbit-container">
								<li className={` is-active orbit-slide ${handelRenderClassName()}`}>
									<div className="grid-x">
										<div className="cell small-4">
											<aside>
												{hideInEvaluation && (
													<TestImageComponent
														{...props}
														selectAnswer={an => compareToGetAnswerStatus(an)}
														questionData={data[DataPointer]}
														childSelectedImage={childSelectedImage}
													/>
												)}
												<TestAsideComponent
													questionData={data[DataPointer]}
													{...props}
													audioRef={audioRef}
													handlePlayInstruction={handlePlayInstruction}
												/>
											</aside>
										</div>

										<div className="cell small-8">
											<TestResultComponent
												{...props}
												diagnosticId={diagnostic?.id}
												hideInEvaluation={hideInEvaluation}
												storeSyllableData={answer =>
													storeResultAnswerPhonetic({ answer: answer })
												}
												storeCurrentSlideNote={e => {
													if (
														data[DataPointer].currentSlide_note === null &&
														e.target.value === ''
													)
														return;
													data[DataPointer].currentSlide_note != e.target.value &&
														storeFinalResultAnswerAndNotes({
															result: { notes: e.target.value }
														});
												}}
												questionData={data[DataPointer]}
												selectAnswer={answer =>
													data[DataPointer]?.selected_answer != answer &&
													storeFinalResultAnswerAndNotes({ result: { answer } })
												}
												selectExtendedAnswer={event =>
													storeFinalResultAnswerAndNotes({ extended: event })
												}
												selectExtrasQuestionsAnswer={event =>
													storeFinalResultAnswerAndNotes({
														extraContent: event,
														result: { answer: 'incorrect' }
													})
												}
												selectClassificationAdditionalOptionAnswer={event =>
													storeFinalResultAnswerAndNotes({ additionalContent: event })
												}
												answerButtonRef={answerButtonRef}
											/>
										</div>
									</div>
								</li>
							</ul>
							<TherapistTestFooterComponent
								{...props}
								currentSlide={DataPointer}
								stop={stop}
								contentIds={data.map(item => item.id)}
								skipToTheNextPage={skipToTheNextPage}
								updateCurrentSession={updateCurrentSession}
								sessionPaused={session?.status === 'paused'}
								skipToThePreviousPage={skipToThePreviousPage}
								trainingSession={session?.started === 'training'}
								sessionFinished={Math.trunc(session?.process_percent) == 100}
								lastQuestion={data[data.length - 1]?.selected_answer}
							/>
						</div>
					</div>
				</div>
			</OnKeyPressComponent>
		</Fragment>
	);
};

export default TherapistTestComponent;
