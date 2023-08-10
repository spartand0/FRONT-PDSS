const PdssTextComponent = ({ question_id, loopIndex, label, questionAnswer ,selectExtrasQuestionsAnswer}) => {
	
    const setTextContent = (qValue, qId, questionNumber) =>
			selectExtrasQuestionsAnswer({ question_id: qId, answer: qValue, questionNumber });
    
    return (
		<div className="cell">
			<label for={question_id}>
				<span className="num"> {loopIndex + 1} .</span>
				<span className="text" dangerouslySetInnerHTML={{ __html: label }} />
			</label>
			<input
				type="text"
				id={question_id}
				defaultValue={questionAnswer}
				onBlur={event =>
					questionAnswer != event.target.value &&
					setTextContent(event.target.value, question_id, loopIndex + 1)
				}
			/>
			<div className="speech_recognition">
				<span className="entypo entypo-mic"></span>
			</div>
		</div>
	);
};

export default PdssTextComponent;
