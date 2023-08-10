/* eslint-disable */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mapWindowsParamsQueriesToObject, scrollToTop } from '../../../shared/helpers/properties';
import { selectCurrentTab, setCurrentTab } from '../../../store/reducers/evaluation.reducers';
import { useDispatch, useSelector } from 'react-redux';

export default props => {
	const { action_diagnosis_getDiagnosticContent, action_evaluation_getResultScore, evaluationState, diagnosisState } =
		props;
	const localParams = {
		diagnosticId: mapWindowsParamsQueriesToObject('id'),
		childId: mapWindowsParamsQueriesToObject('child'),
		session: mapWindowsParamsQueriesToObject('session')
	};
	const [searchParams, setSearchParams] = useSearchParams();

	const [LocalData, setLocalData] = useState({
		analysesResult: null,
		diagnosticContents: [],
		activeSession: { session: localParams.session.value || '' },
		tabSelected: 1,
		error: null,
		loader: true
	});
	const childIdValue = localParams?.childId?.value;
	const diagnosticIdValue = localParams?.diagnosticId?.value;
	const sessionValue = localParams?.session?.value;
	const diagnosticTestContentValue = diagnosisState?.diagnosticTestContent;
	const dispatch = useDispatch();
	const currentTab = useSelector(selectCurrentTab);
	const handleClickTab = (e, id, goTo = false) => {
		e.preventDefault();
		if (goTo) {
			scrollToTop();
		}
		setLocalData(prev => ({
			...prev,
			tabSelected: id
		}));
		dispatch(setCurrentTab(id));
	};
	useEffect(() => {
		if (!window.location.search.includes('session')) {
			setLocalData(prev => ({
				...prev,
				activeSession: ''
			}));
		}
	}, [window.location.search]);

	const handleShowSession = (e, session) => {
		setLocalData(prev => ({
			...prev,
			activeSession: session
		}));
		dispatch(setCurrentTab(1));
		searchParams.set('session', session.session);
		setSearchParams(searchParams);
	};

	useEffect(() => {
		if (childIdValue && diagnosticIdValue && sessionValue) {
			setSearchParams({
				child: localParams.childId.value,
				id: localParams.diagnosticId.value,
				session: localParams.session.value
			});
		}
	}, [diagnosticIdValue]);

	useEffect(() => {
		setLocalData(prev => ({
			...prev,
			tabSelected: 1
		}));
	}, [LocalData.activeSession]);

	useEffect(() => {
		if (diagnosticIdValue && sessionValue) {
			action_diagnosis_getDiagnosticContent({
				id: localParams.diagnosticId.value,
				session: localParams.session.value
			});
		}
	}, [diagnosticIdValue, sessionValue]);

	useEffect(() => {
		if (sessionValue && (currentTab !==  1)) {
			action_evaluation_getResultScore(localParams.session.value);
		}
	}, [currentTab, sessionValue]);
	useEffect(() => {
		if (evaluationState?.analysisResult) {
			setLocalData(prev => ({
				...prev,
				analysesResult: evaluationState?.analysisResult?.scores,
				loader: false,
				error: null
			}));
		}
		if (diagnosticTestContentValue) {
			setLocalData(prev => ({
				...prev,
				diagnosticContents: diagnosisState.diagnosticTestContent,
				loader: false,
				error: null
			}));
		}
	}, [evaluationState?.analysisResult, diagnosticTestContentValue]);
	return {
		handleShowSession,
		handleClickTab,
		...LocalData
	};
};
