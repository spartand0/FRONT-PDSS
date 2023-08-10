/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import ImageTestViewComponent from '../ImageTestViewComponent';

const TestImageComponent = ({
	questionData,
	selectAnswer,
	diagnosticId,
	MainDivContentReference,
	childSelectedImage,
	childMode,
	hideInEvaluation
}) => {
	// Use destructuring assignment to avoid repeating the 'answer' key
	const [answer, setAnswer] = useState({ id: '', clicked: false });
	const [answerChild, setAnswerChild] = useState('');
	// Use the optional chaining operator to avoid accessing a property of a nullish value
	useEffect(() => {
		if (!childMode && childSelectedImage?.current) {
			setAnswer({
				id: childSelectedImage.current,
				clicked: true
			});
			childSelectedImage.current = null;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [childMode, childSelectedImage?.current]);

	useEffect(() => {
		setAnswerChild('');
	}, [questionData.id]);
	
	const handleSelectAnswer = item => {
		setAnswerChild(item);
	};

	const handleImageTestItemClick = item => {
		selectAnswer(item);
		setAnswer({
			id: item,
			clicked: true
		});
	};

	// Use the conditional operator to simplify the class names
	return (
		<div className={hideInEvaluation ? 'image' : 'testshow'}>
			<div className="slides-container">
				<div className="orbit" role="region" aria-label="Kindansicht">
					<div className="orbit-wrapper">
						<ul className="orbit-container">
							<li className={`is-active ${hideInEvaluation ? '' : 'orbit-slide'}`}>
								<div className="grid-x align-center align-middle">
									<ImageTestViewComponent
										questionData={questionData}
										handleImageTestItemClick={handleImageTestItemClick}
										selectDirectlyFinalAnswer={selectAnswer}
										diagnosticId={diagnosticId}
										answer={answer}
										childMode={childMode}
										hideInEvaluation={hideInEvaluation}
										handleSelectAnswer={handleSelectAnswer}
										setAnswerChild={setAnswerChild}
										answerChild={answerChild}
									/>
								</div>
							</li>
						</ul>
					</div>
					{!hideInEvaluation && (
						<a
							className="btn-fullscreen"
							onClick={() => MainDivContentReference.current.classList.toggle('fullscreen')}
						>
							<span className="entypo-resize-full"></span>
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default TestImageComponent;
