import { createRef, useEffect, useState } from 'react';
import { textSpeechProvider } from '../../../shared/helpers/properties';
import useTestAsideComponent from './useTestAsideComponent';

const TestAsideComponent = props => {
	const { questionData, t, hideInEvaluation, audioRef, handlePlayInstruction } = props;
	const { instruction, instruction_audio } = questionData;
	const { TargetItem } = useTestAsideComponent(props);
	const [height, setHeight] = useState(document.body.clientHeight);
	const [tooltip, setToolTip] = useState(false);

	const handleHover = () => {
		setToolTip(!tooltip);
	};

	const slideUp = e => {
		if (e.target.parentNode.classList.value.includes('full')) {
			e.target.parentNode.classList.remove('full');
			e.target.childNodes[0].className = 'entypo-up-open';
		} else {
			e.target.parentNode.classList.add('full');
			e.target.childNodes[0].className = 'entypo-down-open';
		}
	};

	const breakpoint = 1000;
	const additionnalClass = height < breakpoint ? `tooltip-${questionData.diagnostic} top` : 'bottom';
	useEffect(() => {
		const handleWindowResize = () => setHeight(document.body.clientHeight);
		window.addEventListener('resize', handleWindowResize);
		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);
	return (
		<>
			{!hideInEvaluation && (
				<a onClick={slideUp} className="slide-up">
					<span
						className="entypo-up-open"
						onClick={e => {
							e.stopPropagation();
						}}
					></span>
				</a>
			)}

			<label>
				{t('diagnostic_test_mode_therapist_label_instruction')}
				{!hideInEvaluation && (
					<span
						onClick={handlePlayInstruction &&handlePlayInstruction(instruction_audio, instruction)}
						className="entypo-sound audio-output"
						title={t('diagnosis_session_test_title_btn_audio')}
					></span>
				)}
			</label>
			{!hideInEvaluation && <audio ref={audioRef} src={'/' + instruction_audio}></audio>}

			<p dangerouslySetInnerHTML={{ __html: instruction }} />
			{hideInEvaluation && <br />}
			{questionData.target_item && <label>{t('diagnosis_session_test_label_answer')}</label>}

			<TargetItem questionData={questionData} />
			{questionData.assistance && (
				<label>
					<span className="test-tooltip has-tip" onMouseEnter={handleHover} onMouseLeave={handleHover}>
						{t('diagnosis_session_test_label_assistance')}
						{tooltip && (
							<div
								className={`tooltip ${additionnalClass} align-left`}
								style={{
									width: '21rem',
									maxWidth: '21rem',
									fontWeight: '300',
									fontSize: '14px',
									textTransform: 'capitalize',
									top: 'none',
									zIndex: 99
								}}
							>
								{questionData.assistance.replace({ '%" %': '"' })}
							</div>
						)}
					</span>
				</label>
			)}
		</>
	);
};

export default TestAsideComponent;
