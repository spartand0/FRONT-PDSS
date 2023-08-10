import React from 'react';
import PropTypes from 'prop-types';

import DiagnosisSessionItemComponent from '../DiagnosisSessionItemComponent';
import DiagnosisSessionTabsComponent from '../DiagnosisSessionTabsComponent';
import useSessionTest from './useSessionTest';
import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';

// DiagnosisSessionListComponent displays a list of diagnosis sessions and their details.
function DiagnosisSessionListComponent(props) {
	const {
		t,
		diagnosticSessions,
		openTestPageViewInNewWindow,
		searchValue,
		showPopup,
		inProfile,
		hideOption,
		handleSelectSession,
		selectedSession
	} = props;
	const {
		handleShowSession,
		handleClickTab,
		activeSession,
		analysesResult,
		loader
	} = useSessionTest(props);

	return (
		<>
			<div className="tests">
				{/* Display test session label if hideOption is true */}
				{hideOption && <h3>{props.t('label_test_session')}</h3>}
				<div className={`${!hideOption ? '' : 'scroll'}`}>
					<ul>
						{/* Render the headline with appropriate fields */}
						<li className="headline">
							{inProfile ? (
								<p className="in-profile">{t('label_in_profile')}</p>
							) : (
								<p className="title">{t('diagnosis_details_title')}</p>
							)}
							<p className="datetime">{t('diagnosis_details_date_time')}</p>
							<p className="duration">{t('diagnosis_details_duration')}</p>
							<p className="status">{t('diagnosis_details_status')}</p>
							<p className="bar">{t('diagnosis_details_bar')}</p>
							{!hideOption ? <p className="options text-right">{t('diagnosis_details_option')}</p> : null}
						</li>

						{/* Render a list of diagnosis sessions */}
						{diagnosticSessions && diagnosticSessions.length ? (
							diagnosticSessions.map((diagnosisSession) => {
								let useInProfile =
									diagnosisSession.use_in_profile === 'yes' ? diagnosisSession.session : null;
								return (
									<DiagnosisSessionItemComponent
										openTestPageViewInNewWindow={openTestPageViewInNewWindow}
										key={diagnosisSession.session}
										searchValue={searchValue}
										diagnosisSession={diagnosisSession}
										t={t}
										showPopup={showPopup}
										hideOption={hideOption}
										inProfile={inProfile}
										handleSelectSession={handleSelectSession}
										handleShowSession={handleShowSession}
										activeSession={activeSession}
										selectedSession={selectedSession === '' ? useInProfile : selectedSession}
									/>
								);
							})
						) : (
							// Wrap this li tag inside curly braces
							<>
								{/* Display a message when there are no tests */}
								<li>
									<p>{t('diagnosis_Expand_label_no_tests')}</p>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
			{/* Render diagnosis session tabs if there is an active session */}
			{activeSession?.session && (
				<DiagnosisSessionTabsComponent
					diagnosisSession={activeSession}
					t={t}
					handleClickTab={handleClickTab}
					analysesResult={analysesResult}
					loader={loader}
				/>
			)}
		</>
	);
}

// Define propTypes for the component
DiagnosisSessionListComponent.propTypes = {
	action_diagnosis_getDiagnosticContent: PropTypes.func.isRequired,
	action_evaluation_getResultScore: PropTypes.func.isRequired,
	GlobalEvaluationState: PropTypes.object,
	diagnosisState: PropTypes.object,
	SecuritiesState: PropTypes.object
};

// Connect the component to Redux store
export default WithReduxConnector(DiagnosisSessionListComponent, state => ({
	evaluationState: state.GlobalEvaluationState,
	SecuritiesState: state.GlobalSecuritiesSate,
	diagnosisState: state.GlobalDiagnosisState
}));
