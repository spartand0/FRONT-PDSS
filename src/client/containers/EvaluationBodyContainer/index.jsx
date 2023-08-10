import React from 'react';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';
import AnalysesProfileComponent from '../../components/AnalysesProfileComponent';
import PdssWarningMessageComponent from '../../components/PdssWarningMessageComponent';
import ExportEvaluationPage from '../../pages/EvaluationPage/ExportEvaluationPage';
import ResultEvaluationPage from '../../pages/EvaluationPage/ResultEvaluationPage';

function EvaluationBodyContainer({ t, export_page, result_page, selectedChild }) {
	const handleRender = () => {
		if (selectedChild === '') return <PdssWarningMessageComponent message={t('call_out_no_child_selected')} />;
		else if (export_page) return <ExportEvaluationPage t={t} selectedChild={selectedChild} />;
		if (result_page) return <ResultEvaluationPage t={t} />;
		else
			return (
				<>
					<p>
						<strong>{t('label_profile_full')}</strong>
					</p>
					<AnalysesProfileComponent t={t} format="full" />
				</>
			);
	};
	return (
		<div className={'cell medium-8 '}>
			{handleRender()}
		</div>
	);
}

export default WithReduxConnector(WithRouter(EvaluationBodyContainer), state => ({
	evaluationState: state.GlobalEvaluationState
}));
