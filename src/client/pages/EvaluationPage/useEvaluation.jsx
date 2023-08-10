/* eslint-disable */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mapWindowsParamsQueriesToObject, scrollToTop } from '../../../shared/helpers/properties';

export default props => {
	const {
		action_user_getAllChild,
		action_diagnosis_getSessions,
		SecuritiesState,
		userState
	} = props;
	const localParams = {
		diagnosticId: mapWindowsParamsQueriesToObject('id'),
		childId: mapWindowsParamsQueriesToObject('child'),
		session: mapWindowsParamsQueriesToObject('session')
	};
	const [searchParams, setSearchParams] = useSearchParams();
	const [LocalData, setLocalData] = useState({
		childList: [],
		selectedDiagnosis: localParams?.diagnosticId.exist ? localParams?.diagnosticId.value : '',
		selectChild: localParams?.childId.exist ? localParams?.childId.value : ''
	});
	const HandleScrollToTop = id => {
		scrollToTop();
		setSearchParams({ child: localParams?.childId.value, id: id });
	};

	const handleChange = e => {
		setLocalData(prev => ({
			...prev,
			selectChild: e.target.value
		}));
		if (searchParams.has('session')) {
			searchParams.delete('session');
		}
		setSearchParams({ child: e.target.value });
		if (localParams?.diagnosticId.value)
			setSearchParams({ child: e.target.value, id: localParams?.diagnosticId.value });
	};

	useEffect(() => {
		if (SecuritiesState?.userId)
			action_user_getAllChild({
				userId: SecuritiesState?.userId
			});
	}, [SecuritiesState?.userId]);
	useEffect(() => {
		if (SecuritiesState?.userId && localParams?.childId.value && localParams?.diagnosticId?.value != null)
			action_diagnosis_getSessions({
				userId: SecuritiesState?.userId,
				childId: localParams?.childId.value,
				diagnosisId: localParams?.diagnosticId?.value
			});
	}, [SecuritiesState?.userId, localParams?.childId.value, localParams?.diagnosticId?.value]);

	useEffect(() => {
		if (userState?.childList)
			setLocalData(prev => ({
				...prev,
				childList: userState.childList?.data
			}));
	}, [userState?.childList]);
	return {
		handleChange,
		HandleScrollToTop,
		...LocalData
	};
};
