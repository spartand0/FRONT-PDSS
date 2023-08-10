import React, { useEffect } from 'react';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import PdssWarningMessageComponent from '../../components/PdssWarningMessageComponent';
import DiagnosticCheckboxListComponent from '../../components/DiagnosticCheckboxListComponent';
import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';
import { useDispatch } from 'react-redux';
import { setTemplateHideBox, setTemplateTitle } from '../../../store/reducers/settings.reducer';

function ExportEvaluationPage({ t, selectedChild }) {
	
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTemplateTitle(t('evaluation')));
		dispatch(setTemplateHideBox(false));
	}, []);
	return (
		<div>
			<p>
				<strong>{t('label_export')}</strong>
			</p>
			<PdssWarningMessageComponent message={t('label_export_detail')} />
			<p>{t('label_tests')}</p>
			<DiagnosticCheckboxListComponent
				t={t}
				classDesignation={'export-select ids'}
				selectedChild={selectedChild}
			/>
		</div>
	);
}

export default WithReduxConnector(WithRouter(ExportEvaluationPage), state => ({
	evaluationState: state.GlobalEvaluationState,
}));