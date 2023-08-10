import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import DiagnosisBodyContainer from '../../containers/DiagnosisBodyContainer';
import useDiagnosis from './useDiagnosis';
import DiagnosisAsidePage from './DiagnosisAsidePage';
import { setTemplateHideBox, setTemplateTitle } from '../../../store/reducers/settings.reducer';

function DiagnosisPage(props) {
	useDiagnosis(props);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTemplateTitle(props.t('diagnosis')));
		dispatch(setTemplateHideBox(false));
	}, []);

	return (
		<div className="padding" id="diagnostics">
			{/* change div sections and layout to prevent rerender when children changes */}
			<div className="grid-x grid-margin-x">
				<DiagnosisAsidePage />
				<DiagnosisBodyContainer all={props.all} />
			</div>
		</div>
	);
}
DiagnosisPage.prototype = {
	action_user_getAllChild: PropTypes.func.isRequired,
	action_diagnosis_getAll: PropTypes.func.isRequired,
	action_diagnosis_getInfo: PropTypes.func.isRequired,
	action_diagnosis_getGroups: PropTypes.func.isRequired,
	action_diagnosis_getSessions: PropTypes.func.isRequired,
	action_diagnosis_deleteSession: PropTypes.func.isRequired,
	diagnosisState: PropTypes.object,
	userState: PropTypes.object,
	SecuritiesState: PropTypes.object
};

export default DiagnosisPage;
