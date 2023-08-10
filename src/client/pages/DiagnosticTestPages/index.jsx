import React from 'react';
import PropTypes from 'prop-types';

import WithRouter from '../../../shared/helpers/hooks/HOC';
import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';
import { mapWindowsParamsQueriesToObject } from '../../../shared/helpers/properties';
import ChildModePage from './ChildModePage';
import TherapistModePage from './TherapistModePage';
import config from '../../../config';
import { GuardRoute, InjectApprovedSession, PinRedemptionRouteChecker } from '../../../security';

const DiagnosticTestPages = props => {
	const target = mapWindowsParamsQueriesToObject(config.diagnosis_test.child_mode_query_key);

	return (
		<section>
			{target.exist ? (
				<ChildModePage childMode={true} {...props} />
			) : (
				<InjectApprovedSession {...props}>
					<PinRedemptionRouteChecker {...props}>
						<GuardRoute {...props}>
							<TherapistModePage {...props} />
						</GuardRoute>
					</PinRedemptionRouteChecker>
				</InjectApprovedSession>
			)}
		</section>
	);
};

DiagnosticTestPages.prototype = {
	action_child_getOneById: PropTypes.func.isRequired,
	action_diagnosis_getDiagnosticContent: PropTypes.func.isRequired,
	action_diagnosis_getOneById: PropTypes.func.isRequired,
	GlobalDiagnosisState: PropTypes.object.isRequired,
	GlobalChildState: PropTypes.object.isRequired,
	GlobalSecuritiesSate: PropTypes.object.isRequired
};
export default WithReduxConnector(WithRouter(DiagnosticTestPages), state => ({
	GlobalDiagnosisState: state.GlobalDiagnosisState,
	GlobalChildState: state.GlobalChildState,
	SecuritiesState: state.GlobalSecuritiesSate
}));
