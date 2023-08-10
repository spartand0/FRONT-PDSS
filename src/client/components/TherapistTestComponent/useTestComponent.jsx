/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { mapWindowsParamsQueriesToObject } from '../../../shared/helpers/properties';
import {
	Consumer_ChildDemandData,
	Consumer_ChildPickAnswer,
	Provider_CurrentStateToChild,
	Provider_TherapistDiagnosticList
} from '../../../shared/providers/socket';

const useTestComponent = props => {
	// Extract props
	const {
		data,
		GlobalDiagnosisState,
		getCurrentDianoeticTestContentData,
		DataPointer,
		socketTriggerEffect,
		action_diagnosis_updateSession,
		action_diagnosis_storeDiagnosticTestResultBySession,
		SecuritiesState,
		hideInEvaluation,
		diagnosticId,
		diagnosisSession,
		getCurrentTime,
		action_diagnosis_timer_on_close
	} = props;

	// Refs and state
	const childSelectedImage = useRef();
	const dispatch = useDispatch();
	const [childId, setChildId] = useState(null);
	const  answerButtonRef= useRef(null)
	
	// Get child id once on mount
	useEffect(() => {
		const id = mapWindowsParamsQueriesToObject('child');
		setChildId(id);
	}, []);

	// Fetch test data on mount and when diagnostic session status changes
	useEffect(() => {
		if (!hideInEvaluation) {
			getCurrentDianoeticTestContentData();
		}
	}, [GlobalDiagnosisState?.diagnostic?.session?.status]);

	// Store final result answer and notes
	const storeFinalResultAnswerAndNotes = body => {
		const diagnosisId = hideInEvaluation ? diagnosticId : GlobalDiagnosisState?.diagnostic?.id;
		const session = hideInEvaluation ? diagnosisSession.session : GlobalDiagnosisState?.diagnostic?.session.session;
		action_diagnosis_storeDiagnosticTestResultBySession({
			contentId: data[DataPointer]?.id,
			diagnosticId: diagnosisId,
			body: {
				...body,
				diagnostic: diagnosisId,
				session: session
			},
			forceRefresh: () => Provider_TherapistDiagnosticList({ otherDetails: { session: SecuritiesState?.userId } })
		});
	};

	//***************************** Child Socket providers ****************************************** */
	// Get answer status
	const compareToGetAnswerStatus = pickedItem => {
		let response;
		switch (GlobalDiagnosisState?.diagnostic?.id) {
			case 1:
			case 4:
				response = pickedItem === data[DataPointer]?.target_item ? 'correct' : 'incorrect';
				break;

			case 3:
				response = pickedItem;
				break;

			default:
				break;
		}
		storeFinalResultAnswerAndNotes({ result: { answer: response } });
	};
	// Send current state data to child
	const sendBackCurrentStateData = () => {
		data[DataPointer] &&
			Provider_CurrentStateToChild({
				content: data[DataPointer],
				otherDetails: GlobalDiagnosisState?.diagnostic
			});
	};

	useEffect(() => {
		if (socketTriggerEffect.current) sendBackCurrentStateData();
	}, [DataPointer, socketTriggerEffect.current, data]);
	useEffect(() => {
		const handleWindowClose = () => {
			// Notify the parent window that the child window is closing
			window.opener.postMessage('CHILD_WINDOW_CLOSED', window.origin);
		};

		window.onbeforeunload = handleWindowClose;

		// Cleanup the event listener when the component unmounts
		return () => {
			window.onbeforeunload = null;
		};
	}, []);
	// Subscribe to child demand data
	useEffect(() => {
		if (socketTriggerEffect?.current && !hideInEvaluation) {
			const { closeup } = Consumer_ChildDemandData(
				sendBackCurrentStateData,
				GlobalDiagnosisState?.diagnostic?.session.session
			);
			return () => closeup();
		}
	}, [socketTriggerEffect?.current, sendBackCurrentStateData]);

	// Subscribe to child pick answer data
	useEffect(() => {
		if (socketTriggerEffect?.current && !hideInEvaluation) {
			const { closeup } = Consumer_ChildPickAnswer(data => {
				compareToGetAnswerStatus(data?.item);
				childSelectedImage.current = data?.item;
			}, GlobalDiagnosisState?.diagnostic?.session.session);
			return () => closeup();
		}
	}, [
		socketTriggerEffect?.current,
		GlobalDiagnosisState,
		DataPointer,
		data,
		compareToGetAnswerStatus,
		storeFinalResultAnswerAndNotes
	]);

	//***************************** Action Providers ****************************************** */

	// Update current session
	const updateCurrentSession = useCallback(
		body => {
			if (GlobalDiagnosisState?.diagnostic?.session?.id && !hideInEvaluation) {
				action_diagnosis_updateSession({
					diagnosticItemsToUpdate: {
						id: GlobalDiagnosisState?.diagnostic?.session?.id,
						diagnosticId: GlobalDiagnosisState?.diagnostic?.id,
						session: GlobalDiagnosisState?.diagnostic?.session.session,
						childId: childId?.value,
						userId: SecuritiesState?.userId,
						body
					},
					forceRefresh: () =>
						Provider_TherapistDiagnosticList({ otherDetails: { session: SecuritiesState?.userId } })
				});
			}
		},
		[
			action_diagnosis_updateSession,
			childId?.value,
			GlobalDiagnosisState?.diagnostic?.id,
			GlobalDiagnosisState?.diagnostic?.session?.id,
			GlobalDiagnosisState?.diagnostic?.session.session,
			hideInEvaluation,
			SecuritiesState?.userId
		]
	);

	// **************************************** Diagnostic Pagination ************************** /

	// Check if user can skip to the next or previous slide
	const userCanSkipToTheNextOrPreviousSlide = useCallback(
		target =>
			GlobalDiagnosisState?.diagnostic?.session?.status !== 'paused' &&
			((target === 'next' && DataPointer < data.length - 1) || (target === 'previous' && DataPointer > 0)),
		[DataPointer, GlobalDiagnosisState?.diagnostic?.session?.status, data.length]
	);

	// Skip to the previous slide
	const skipToThePreviousPage = useCallback(() => {
		if (userCanSkipToTheNextOrPreviousSlide('previous')) {
			updateCurrentSession({
				current_slide: DataPointer - 1,
				seconds_since_start: getCurrentTime()
			});
		}
	}, [DataPointer, updateCurrentSession, userCanSkipToTheNextOrPreviousSlide]);

	// Skip to the next slide
	const skipToTheNextPage = useCallback(() => {
		if (userCanSkipToTheNextOrPreviousSlide('next')) {
			updateCurrentSession({
				current_slide: DataPointer + 1,
				seconds_since_start: getCurrentTime()
			});
		}
	}, [DataPointer, updateCurrentSession, userCanSkipToTheNextOrPreviousSlide]);

	// ***************************************************************************************** //

	const handleCloseWindow = useCallback(
		event => {
			dispatch(
				action_diagnosis_timer_on_close({
					id: GlobalDiagnosisState?.diagnostic?.session?.id,
					diagnosticId: GlobalDiagnosisState?.diagnostic?.id,
					session: GlobalDiagnosisState?.diagnostic?.session.session,
					childId: childId?.value,
					userId: SecuritiesState?.userId,
					body: { seconds_since_start: getCurrentTime() }
				})
			);
		},
		[dispatch]
	);

	useEffect(() => {
		if (!hideInEvaluation) {
			window.addEventListener('beforeunload', handleCloseWindow);
			return () => {
				window.removeEventListener('beforeunload', handleCloseWindow);
			};
		}
	}, [hideInEvaluation, handleCloseWindow]);

	// Return necessary functions and data
	return {
		sendBackCurrentStateData,
		DataPointer,
		skipToTheNextPage,
		updateCurrentSession,
		skipToThePreviousPage,
		childSelectedImage,
		storeFinalResultAnswerAndNotes,
		diagnostic: GlobalDiagnosisState?.diagnostic,
		compareToGetAnswerStatus,
		answerButtonRef
	};
};

export default useTestComponent;
