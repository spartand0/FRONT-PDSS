/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapWindowsParamsQueriesToObject } from '../../../shared/helpers/properties';

import {
	action_diagnosis_getDiagnosticContentByIdContentForEvaluation,
	action_diagnosis_getDiagnosticContentEvaluation,
	action_diagnosis_storeDiagnosticTestResultBySessionForEvaluation,
	action_evaluation_getAll
} from '../../../store/actions';
import { selectDiagnosisContentEvaluation } from '../../../store/reducers/diagnosis.reducer';

const useContentItemComponent = props => {
	const dispatch = useDispatch();
	// Refs and state
	const localParams = {
		diagnosticId: mapWindowsParamsQueriesToObject('id'),
		session: mapWindowsParamsQueriesToObject('session'),
		childId: mapWindowsParamsQueriesToObject('child')
	};

	const [showExtendContent, setShowExtendContent] = useState({ show: false, id: '' });
	const selectedDiagnosisContent = useSelector(selectDiagnosisContentEvaluation);

	// Store final result answer and notes
	const storeFinalResultAnswerAndNotes = body => {
		const diagnosisId = localParams.diagnosticId.value;
		const session = localParams.session.value;
		const childId = localParams.childId.value;
		dispatch(
			action_diagnosis_storeDiagnosticTestResultBySessionForEvaluation({
				contentId: selectedDiagnosisContent[0].id,
				body: {
					...body,
					diagnostic: diagnosisId,
					session: session
				}
			})
		).then(() => {
			dispatch(action_evaluation_getAll(childId));
			if (body?.result?.answer)
				dispatch(
					action_diagnosis_getDiagnosticContentEvaluation({
						id: diagnosisId,
						session: session
					})
				).then(() => {
					dispatch(
						action_diagnosis_getDiagnosticContentByIdContentForEvaluation({
							id: diagnosisId,
							session: session,
							contentId: selectedDiagnosisContent[0]?.id
						})
					);
				});
			else {
				dispatch(
					action_diagnosis_getDiagnosticContentByIdContentForEvaluation({
						id: diagnosisId,
						session: session,
						contentId: selectedDiagnosisContent[0]?.id
					})
				);
			}
		});
	};

	useEffect(() => {
		dispatch(
			action_diagnosis_getDiagnosticContentEvaluation({
				id: localParams?.diagnosticId?.value,
				session: localParams?.session?.value
			})
		);
	}, []);

	useEffect(() => {
		if (showExtendContent.show && showExtendContent.id !== '') {
			dispatch(
				action_diagnosis_getDiagnosticContentByIdContentForEvaluation({
					id: parseInt(localParams?.diagnosticId?.value),
					session: localParams?.session?.value,
					contentId: showExtendContent.id
				})
			);
		}
	}, [showExtendContent.show, showExtendContent.id]);

	useEffect(() => {
		setShowExtendContent({ show: false, id: '' });
	}, [localParams?.session?.value]);

	const handleExpandAccordionTest = id => event => {
		event.preventDefault();
		if (id === showExtendContent.id) {
			setShowExtendContent({
				show: !showExtendContent.show,
				id: id
			});
		} else {
			setShowExtendContent({
				show: true,
				id: id
			});
		}
	};

	// Determine the class name for the accordion item
	const getAccordionItemClassName = content => {
		let className = 'accordion-item';

		if (content.selected_answer) {
			className += content.selected_answer === 'correct' ? ' answered correct' : ' answered incorrect';
		}
		if (showExtendContent.id === content.id) {
			className += ' is-active';
		}
		return className;
	};

	// Return necessary functions and data
	return {
		storeFinalResultAnswerAndNotes,
		handleExpandAccordionTest,
		getAccordionItemClassName,
		showExtendContent,
		selectedDiagnosisContent,
		localParams
	};
};

export default useContentItemComponent;
