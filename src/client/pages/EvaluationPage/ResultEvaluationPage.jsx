import React from 'react';
import PropTypes from 'prop-types';

import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';
import DiagnosisSessionListComponent from '../../components/DiagnosisSessionListComponent';
import PdssWarningMessageComponent from '../../components/PdssWarningMessageComponent';
import useResultEvaluation from './useResultEvaluation';
import { selectDiagnosisSession } from '../../../store/reducers/diagnosis.reducer';
import { useSelector } from 'react-redux';

function ResultEvaluationPage(props) {
	const { handleSelectSession, selectedSession } = useResultEvaluation(props);
	const diagnosticSessions = useSelector(selectDiagnosisSession);

	if (diagnosticSessions && diagnosticSessions.length)
		return (
				<DiagnosisSessionListComponent
					t={props.t}
					diagnosticSessions={diagnosticSessions}
					hideOption={true}
					inProfile={true}
					handleSelectSession={handleSelectSession}
					selectedSession={selectedSession}
				/>
		);
	else return <PdssWarningMessageComponent message={props.t('evaluation_callout_no_results')} />;
}

ResultEvaluationPage.prototype = {
	action_evaluation_update: PropTypes.func.isRequired,
	action_diagnosis_getDiagnosticContent: PropTypes.func.isRequired,
	action_evaluation_getResultScore: PropTypes.func.isRequired,
	GlobalEvaluationState: PropTypes.object.isRequired,
	diagnosisState: PropTypes.object,
	SecuritiesState: PropTypes.object
};
export default WithReduxConnector(ResultEvaluationPage, state => ({
	evaluationState: state.GlobalEvaluationState,
	SecuritiesState: state.GlobalSecuritiesSate
}));
