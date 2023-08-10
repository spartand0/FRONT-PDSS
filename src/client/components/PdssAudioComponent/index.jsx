/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useTimer } from '../../../shared/helpers/hooks/Timer';
import PDSSResultAudioComponent from '../PDSSResultAudioComponent';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as Actions from '../../../store/actions';
import { connect, useDispatch, useSelector } from 'react-redux';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import { selectRecords } from '../../../store/reducers/record.reducer';
import PdssConfirmPopup from '../PdssConfirmPopupComponent';
import { action_record_deleteOne } from '../../../store/actions';
import OnKeyPressComponent from '../KeyPressComponent';
const PDSSAudioComponent = props => {
	const {
		action_record_create,
		action_record_getAllBySession,
		t,
		session,
		selectAnswer,
		slideAlreadyAnswered,
		questionData,
		hideInEvaluation
	} = props;
	const { seconds, start, stop } = useTimer();
	const [url, setUrl] = useState('');
	const [play, setPlay] = useState(false);
	const recorder = useRef(null);
	const records = useSelector(selectRecords);
	const [showPopup, setShowPopUp] = useState({ status: false, selected: 0 });
	const dispatch = useDispatch();

	useEffect(() => {
		action_record_getAllBySession({ session: session.session, diagnostic_content: questionData.id });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionData.id]);

	useEffect(() => {
		if (showPopup.status) {
			document.documentElement.classList.add('zf-has-scroll', 'is-reveal-open-modal');
		} else {
			document.documentElement.removeAttribute('class');
		}
	}, [showPopup.status]);

	const getAudio = async () => {
		try {
			let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			recorder.current = new MediaRecorder(stream);
			start();
			recorder.current.start();
			setPlay(!play);
		} catch (e) {
			console.log('error getting stream', e);
		}
	};

	const stopRecorder = async () => {
		if (play) {
			let chunks = [];
			let blob;

			!slideAlreadyAnswered && selectAnswer('incorrect');
			recorder.current.ondataavailable = e => {
				let formData = new FormData();
				chunks.push(e.data);
				if (recorder.current.state === 'inactive') {
					blob = new Blob(chunks, { type: 'audio/webm' });
					let testAudioRecord = URL.createObjectURL(blob);
					setUrl(testAudioRecord);
					formData.append('session', session.session);
					formData.append('diagnostic_content', questionData.id);
					formData.append('duration_in_seconds', seconds);
					formData.append('record', blob);
					action_record_create(formData)
						.then(() =>
							action_record_getAllBySession({
								session: session.session,
								diagnostic_content: questionData.id
							})
						)
						.catch(error => error);
				}
			};
			stop();
			recorder.current.stop();
			setPlay(!play);
		}
	};

	const handleShowDelete = item => event => {
		setShowPopUp({ status: true, selected: item.id });
	};

	const handleConfirmPopup = () => {
		dispatch(
			action_record_deleteOne({
				recordId: showPopup.selected,
				session: session.session,
				diagnostic_content: questionData.id
			})
		)
			.then(() => {
				setShowPopUp({ status: false, selected: 0 });
			})
			.catch(err => err);
	};
	const handleCancelPopup = () => {
		setShowPopUp({ status: false, selected: 0 });
	};

	const handleRecord = () => {
		if (!play) getAudio();
		else stopRecorder();
	};
	return (
		<OnKeyPressComponent spacePress={handleRecord}>
			<div className="quick">
				<div className={`audio ${play && 'recording'}`} data-seconds-since-record-started="0">
					<div className="grid-x grid-margin-x">
						<div className="cell small-7">
							<p className="label">{t('diagnosis_session_record_audio_label')}</p>
						</div>
						<div className="cell small-5 text-right">
							{hideInEvaluation ? (
								<p className="duration">
									{records?.length > 0 && hideInEvaluation
										? `${records.length} ${t('diagnosis_session_record_audio_records_available')}`
										: t('diagnosis_session_record_audio_no_data_label')}{' '}
								</p>
							) : (
								<>
									<p className="duration">{moment.utc(seconds * 1000).format('HH:mm:ss')}</p>
									<a
										className="record"
										title={t('diagnosis_session_record_start_btn_label')}
										onClick={handleRecord}
									>
										<span className="entypo-mic"></span>
									</a>
								</>
							)}
						</div>
						<div className="cell">
							<div className="records">
								<ul>
									{records && (
										<PDSSResultAudioComponent
											url={url}
											records={records}
											session={session}
											handleShowDelete={handleShowDelete}
											{...props}
										/>
									)}
									{play && <li>{t('diagnosis_session_new_record_started')}</li>}
								</ul>
							</div>
						</div>
						<div className="cell">
							<div className="callout alert">
								<p>{t('diagnosis_session_record_delete_info')}</p>
							</div>
						</div>
					</div>
				</div>
				<div id="record-popup">
					<PdssConfirmPopup
						ConfirmPopup={handleConfirmPopup}
						closePopup={handleCancelPopup}
						title={t('diagnosis_session_record_delete_alert_title')}
						description={t('diagnosis_session_record_delete_alert')}
						show={showPopup.status}
						style
					/>
				</div>
			</div>
		</OnKeyPressComponent>
	);
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}
const mapStateToProps = state => ({
	recordState: state.GlobalRecordsState
});
export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(PDSSAudioComponent));
