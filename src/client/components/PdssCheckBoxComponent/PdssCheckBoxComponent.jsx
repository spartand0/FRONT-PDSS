const PdssCheckBoxComponent = ({ question_id, label, questionAnswer, label_detail,selectExtrasQuestionsAnswer}) => {
	
    const setCheckBoxContent = (cValue, qId) =>
			selectExtrasQuestionsAnswer({ question_id: qId, answer: cValue ? 'checked' : '' });
    return (
		<div className="cell">
			<input
				type="checkbox"
				id={question_id}
				checked={questionAnswer === 'checked' ? true : false}
				onChange={event => setCheckBoxContent(event.target.checked, question_id)}
			/>
			<label for={question_id}> {label} </label>
			{label_detail && label_detail?.length > 0 && (
				<>
					<span className="entypo entypo-info"></span>
					<div className="label_detail">
						<p dangerouslySetInnerHTML={{ __html: label_detail }} />
					</div>
				</>
			)}
		</div>
	);
};
export default PdssCheckBoxComponent;
