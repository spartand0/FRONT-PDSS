import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	calculateAgePerMonth,
	getDistance,
	mapWindowsParamsQueriesToObject,
	progressRing
} from '../../../shared/helpers/properties';
import { selectChildDetails } from '../../../store/reducers/child.reducer';
import { t } from 'i18next';

import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';
import PdssTableComponent from '../PdssTableComponent';
import {
	action_diagnosis_deleteSession,
	action_diagnosis_getInfo,
	action_diagnosis_getSessions
} from '../../../store/actions';
import { selectDiagnosisInfo } from '../../../store/reducers/diagnosis.reducer';
import DiagnosisInfoComponent from '../DiagnosisInfoComponent';
import { selectCurrentUserId } from '../../../store/reducers/securities.reducers';
function DiagnosisItemDetailsComponent({
	item,
	show,
	diagnosticSessions,
	GlobalSecuritiesSate,
	action_diagnosis_newSession
}) {
	const selectedChild = useSelector(selectChildDetails);
	const dispatch = useDispatch();
	const [showInformation, setShowInformation] = useState(false);
	const diagnosisInfo = useSelector(selectDiagnosisInfo);
	const currentUserId = useSelector(selectCurrentUserId);
	const localParams = {
		childId: mapWindowsParamsQueriesToObject('child')
	};
	// add pagination for performance
	const [displayCount, setDisplayCount] = useState(10);
	const containerRef = useRef(null);
	const percent = Math.round((item.durationInMin / 60) * 100) || 0;
	const { strokeDasharray, strokeDashoffset } = progressRing(percent, 10);
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

	// remove scroll
	useEffect(() => {
		if (showInformation) {
			document.documentElement.classList.add('zf-has-scroll', 'is-reveal-open');
		} else {
			document.documentElement.removeAttribute('class');
		}
	}, [showInformation]);

	// show information of each diagnosis
	const handleShowInformation = () => {
		dispatch(action_diagnosis_getInfo(item.id));
		setShowInformation(!showInformation);
	};

	const handleCloseInformation = () => {
		setShowInformation(!showInformation);
	};

	// start new test session
	const openTestPageViewInNewWindow = async (diagnostic, childId) => {
		action_diagnosis_newSession({
			diagnosticId: '' + diagnostic?.id,
			diagnosticTitle: diagnostic.title,
			childId: '' + childId,
			userId: '' + GlobalSecuritiesSate?.userId
		});
	};

	// pagination for list of test sessions
	const handleScroll = useCallback(() => {
		const container = containerRef.current;
		if (container.scrollTop + container.clientHeight + 100 >= container.scrollHeight) {
			setDisplayCount(prevShowCount => prevShowCount + 10);
		}
	}, []);
	const itemsToShow = useMemo(() => diagnosticSessions.slice(0, displayCount), [diagnosticSessions, displayCount]);

	// show delete modal
	const handleShowDeletePopup = data => event => {
		event.preventDefault();
		setShowDeletePopup({
			show: true,
			data: data.session
		});
	};
	// handle close delete modal
	const handleCancel = event => {
		event.preventDefault();
		setShowDeletePopup({
			show: false,
			data: ''
		});
	};

	const handleConfirm = event => {
		event.preventDefault();
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
	return (
		<>
			<div className={`cell expand ${show && 'show'}`}>
				<div className={`container distance-${getDistance(item.id)}`}>
					<div className="scroll" ref={containerRef} onScroll={handleScroll}>
						<div className="grid-x">
							<div className="cell medium-6">
								{calculateAgePerMonth(selectedChild.birthdate) < item.ageMin ||
								calculateAgePerMonth(selectedChild.birthdate) > item.ageMax ? (
									<div className="callout warning">{t('diagnosis_details_out_side_the_age')}</div>
								) : (
									<a
										className="button start-test"
										onClick={() => openTestPageViewInNewWindow(item, selectedChild.id)}
									>
										<span className="entypo-video"></span> {t('diagnosis_details_start_new_test')}
									</a>
								)}
							</div>
							<div className="cell medium-6 text-right">
								<a className="button outline open-info" onClick={handleShowInformation}>
									<span className="entypo-info-circled"></span> {t('diagnosis_details_information')}
								</a>
							</div>
							<div className="cell text-right">
								<div className="duration">
									<span className="text">
										<span className="label">{t('diagnosis_details_duration_env')}</span>
										<span className="time">
											{item.durationInMin} {t('diagnosis_details_minutes')}
										</span>
									</span>
									<span className="progress-ring">
										<svg>
											<circle
												r="10"
												cx="20"
												cy="20"
												strokeDasharray={strokeDasharray}
												strokeDashoffset={strokeDashoffset}
											/>
										</svg>
									</span>
								</div>
							</div>
							<div className="cell">
								<p>
									<strong>{t('diagnosis_details_final_tests')}</strong>
								</p>
								<PdssTableComponent
									t={t}
									showDeletePopup={showDeletePopup}
									data={itemsToShow}
									headers={headers}
									handleDelete={handleShowDeletePopup}
									handleCancel={handleCancel}
									handleConfirm={handleConfirm}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showInformation && diagnosisInfo?.[0] && (
				<DiagnosisInfoComponent info={diagnosisInfo[0]} handleCloseInformation={handleCloseInformation} />
			)}
		</>
	);
}

export default WithReduxConnector(DiagnosisItemDetailsComponent, state => ({
	GlobalSecuritiesSate: state.GlobalSecuritiesSate
}));
