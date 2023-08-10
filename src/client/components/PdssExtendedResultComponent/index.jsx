import _ from 'lodash';
import { createContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	action_evaluation_getArticulations,
	action_evaluation_update_phonetics
} from '../../../store/actions';
import { selectArticulations } from '../../../store/reducers/evaluation.reducers';
import PdssExtendedReplacement from '../PdssExtendedReplacement';
import PdssResultKeyboardComponent from '../PdssResultKeyboardComponent';
import PdssSyllableComponent from '../PdssSyllableComponent';
import useExtendedResultComponent from './useExtendedResultComponent';
export const ContextExtendedResult = createContext({});
const PdssExtendedResultComponent = props => {
	const { t, questionData, session } = props;
	const { Provider } = ContextExtendedResult;
	const [elements, setElements] = useState([]);
	const [expandKeyboard, setExpandKeyboard] = useState(false);
	const [tooltip, setToolTip] = useState(false);
	const [update, setUpdate] = useState(false);
	const [selected, setSelected] = useState({
		index: 0,
		key: 0,
		char: ''
	});
	const ref = useRef();
	const dispatch = useDispatch();
	const { updateCurrentSpans, updateCurrentSpansAnswers, swapAndCheckData } = useExtendedResultComponent();
	const articulations = useSelector(selectArticulations);

	// handle click on expand keyboard
	const handleExpandKeyboard = (key, index, char) => event => {
		setSelected({ key: key, index: index, char: char });
		setExpandKeyboard(true);
	};

	const handleHover = () => {
		setToolTip(!tooltip);
	};

	useEffect(() => {
		if(!articulations)
		dispatch(action_evaluation_getArticulations());
		if (questionData.answer_04 !== null) {
			//modified syllable
			const currentData = updateCurrentSpansAnswers(questionData.answer_04);
			// original syllables
			const prevData = updateCurrentSpans(questionData.target_item_html);
			setElements(swapAndCheckData(currentData, prevData));
		} else setElements(updateCurrentSpans(questionData.target_item_html));
	}, []);

	// improve api calls performance with _.debounce
	const handleUpdateAnswer = _.debounce(() => {
		// remove first call api for first render
		if (update) {
			dispatch(
				action_evaluation_update_phonetics({
					body: {
						session: session.session,
						diagnosticContent: questionData.id,
						answer: ref.current.innerHTML,
						answerId: 'answer_04',
						diagnosticId: questionData.diagnostic
					}
				})
			);
		}
	}, 500);
	useEffect(() => {
		handleUpdateAnswer();
		return () => handleUpdateAnswer.cancel();
	}, [elements]);

	return (
		<div className="grid-x phonetic">
			<div className="cell info">
				<p>
					<span className="phonetic-tooltip has-tip" onMouseEnter={handleHover} onMouseLeave={handleHover}>
						{t('phonetic_title')}
						{tooltip && (
							<div
								className="tooltip bottom align-left"
								style={{
									width: '21rem',
									maxWidth: '21rem',
									top: '40px'
								}}
								dangerouslySetInnerHTML={{
									__html: t('tooltip_description_phonetic')
								}}
							></div>
						)}
					</span>
				</p>
			</div>
			<div className="cell">
				<Provider
					value={{
						setElements,
						elements,
						handleExpandKeyboard,
						expandKeyboard,
						selected,
						setExpandKeyboard,
						ref,
						dispatch,
						action_evaluation_update_phonetics,
						articulations,
						setUpdate,
						...props
					}}
				>
					<div className="container clearfix" ref={ref}>
						<PdssSyllableComponent ContextExtendedResult={ContextExtendedResult} />
					</div>
					{expandKeyboard && <PdssResultKeyboardComponent ContextExtendedResult={ContextExtendedResult} />}
					<div className="replacements">
						<PdssExtendedReplacement ContextExtendedResult={ContextExtendedResult} />
					</div>
				</Provider>
			</div>
		</div>
	);
};

export default PdssExtendedResultComponent;
