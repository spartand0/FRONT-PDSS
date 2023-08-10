import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import { mapWindowsParamsQueriesToObject } from '../../../shared/helpers/properties';
import { action_diagnosis_deleteSession } from '../../../store/actions';
import { selectChildDetails } from '../../../store/reducers/child.reducer';
import { selectDiagnosisSession } from '../../../store/reducers/diagnosis.reducer';
import { selectCurrentUserId } from '../../../store/reducers/securities.reducers';
import DiagnosisListComponent from '../../components/DiagnosisListComponent';
import PdssTableComponent from '../../components/PdssTableComponent';
import PdssWarningMessageComponent from '../../components/PdssWarningMessageComponent';
import DiagnosisTestHeaderContainer from '../DiagnosisTestHeaderContainer';

function DiagnosisBodyContainer(props) {
	const { t, all } = props;
	const localParams = {
		childId: mapWindowsParamsQueriesToObject('child')
	};
	const currentUserId = useSelector(selectCurrentUserId);
	const diagnosticSessions = useSelector(selectDiagnosisSession);
	const selectedChild = useSelector(selectChildDetails);
	const [showDeletePopup, setShowDeletePopup] = useState({
		show: false,
		data: ''
	});
	const headers = [
		{
			id: 'title',
			className: 'title',
			extendedClassName: '',
			title: 'diagnosis_details_title'
		},
		{
			id: 'date_initialized',
			className: 'datetime',
			extendedClassName: '',
			title: 'diagnosis_details_date_time'
		},
		{
			id: 'seconds_since_start',
			extendedClassName: '',
			className: 'duration',
			title: 'diagnosis_details_duration'
		},
		{
			id: 'status',
			className: 'status',
			extendedClassName: '',
			title: 'diagnosis_details_status'
		},
		{
			id: 'process_percent',
			className: 'bar',
			extendedClassName: '',
			title: 'diagnosis_details_bar'
		},
		{
			id: 'options',
			className: 'options',
			extendedClassName: 'text-right',
			title: 'diagnosis_details_option'
		}
	];
	const dispatch = useDispatch();
	const handleShowDeletePopup = data => event => {
		event.preventDefault();
		setShowDeletePopup({
			show: true,
			data: data.session
		});
	};

	const handleCancel = event => {
		console.log('handleCancel');
		setShowDeletePopup({
			show: false,
			data: ''
		});
	};

	const handleConfirm = event => {
		dispatch(
			action_diagnosis_deleteSession({
				sessionId: showDeletePopup.data,
				userId: currentUserId,
				childId: localParams.childId
			})
		).then(() => {
			setShowDeletePopup({
				show: false,
				data: ''
			});
		});
	};

	const handleRenderView = () => {
		if (typeof selectedChild === 'undefined' || selectedChild === null)
			return <PdssWarningMessageComponent message={t('call_out_no_child_selected')} />;
		else {
			if (all)
				return (
					<PdssTableComponent
						t={t}
						showDeletePopup={showDeletePopup}
						data={diagnosticSessions}
						headers={headers}
						handleDelete={handleShowDeletePopup}
						handleCancel={handleCancel}
						handleConfirm={handleConfirm}
					/>
				);
				else {
					return <DiagnosisListComponent />
				}
		}
	};

	return (
		<div className={'cell medium-8 ' + (all ? 'all' : '')}>
			<p>
				<strong>{all ? t('sub_headline_all_tests') : t('sub_headline_start')}</strong>
			</p>
			{all && <DiagnosisTestHeaderContainer t={t} />}
			{handleRenderView()}
		</div>
	);
}

export default WithRouter(DiagnosisBodyContainer);
