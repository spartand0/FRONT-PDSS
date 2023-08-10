import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';
import EvaluationAsidePage from './EvaluationAsidePage';
import useEvaluation from './useEvaluation';
import EvaluationBodyContainer from '../../containers/EvaluationBodyContainer';
import { useDispatch } from 'react-redux';
import { action_evaluation_getAll } from '../../../store/actions';
import { setTemplateHideBox, setTemplateTitle } from '../../../store/reducers/settings.reducer';

function EvaluationPage(props) {
	const { selectChild, handleChange, HandleScrollToTop } = useEvaluation(props);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTemplateTitle(props.t('evaluation')));
		dispatch(setTemplateHideBox(false));
	}, []);
	useEffect(() => {
		dispatch(action_evaluation_getAll(selectChild));
	}, [selectChild]);
	return (
		<div className="padding" id="analysis">
			<EvaluationAsidePage
				t={props.t}
				handleChange={handleChange}
				HandleScrollToTop={HandleScrollToTop}
			>
				<EvaluationBodyContainer
					selectedChild={selectChild}
					t={props.t}
					export_page={props.export_page}
					result_page={props.result_page}
				/>
			</EvaluationAsidePage>
		</div>
	);
}
EvaluationPage.prototype = {
	action_user_getAllChild: PropTypes.func.isRequired,
	action_evaluation_getAll: PropTypes.func.isRequired,
	action_diagnosis_getSessions: PropTypes.func.isRequired,
	GlobalEvaluationState: PropTypes.object.isRequired,
	SecuritiesState: PropTypes.object,
	GlobalUserState: PropTypes.object.isRequired
};
export default WithReduxConnector(WithRouter(EvaluationPage), state => ({
	evaluationState: state.GlobalEvaluationState,
	SecuritiesState: state.GlobalSecuritiesSate,
	userState: state.GlobalUserState
}));
