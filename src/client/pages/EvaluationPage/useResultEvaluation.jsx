/* eslint-disable */
import { useState } from 'react';
import { mapWindowsParamsQueriesToObject } from '../../../shared/helpers/properties';

export default props => {
	const { action_evaluation_update, SecuritiesState } = props;
	const localParams = {
		diagnosticId: mapWindowsParamsQueriesToObject('id'),
		childId: mapWindowsParamsQueriesToObject('child'),
		session: mapWindowsParamsQueriesToObject('session')
	};
	const [LocalData, setLocalData] = useState({
		selectedSession: ''
	});
	const handleSelectSession = (e, session) => {
		setLocalData(prev => ({
			...prev,
			selectedSession: session
		}));
		action_evaluation_update({
			userId: SecuritiesState?.userId,
			diagnosisId: localParams?.diagnosticId.value,
			childId: localParams?.childId?.value,
			body: {
				session: session,
				use_in_profile: 'yes'
			}
		});
	};

	return {
		handleSelectSession,
		...LocalData
	};
};
