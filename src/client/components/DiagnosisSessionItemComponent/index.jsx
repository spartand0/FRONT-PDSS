import moment from 'moment';
import React from 'react';
import reactStringReplace from 'react-string-replace';

import routes from '../../../config/routes';
import { CryptoProviders, getItemsFromCookies } from '../../../shared/helpers/properties';
import NavItemComponent from '../NavItemComponent';

function DiagnosisSessionItemComponent(props) {
	const {
		t,
		diagnosisSession,
		handleShowSession,
		activeSession,
		searchValue,
		showPopup,
		inProfile,
		hideOption,
		handleSelectSession,
		selectedSession
	} = props;
	// here Add handle show popup
	const handleShowPopup = e => {
		e.preventDefault();
		showPopup(diagnosisSession.session);
	};

	const getClassName = () => {
		if (diagnosisSession.status !== 'finished') {
			return 'not-selectable';
		}
		if (activeSession?.session === diagnosisSession.session) {
			return 'active';
		}
		return inProfile ? 'highlighted' : '';
	}

	const getTitle = () => {
		if (searchValue) {
			return (
			<p className="title">
				{reactStringReplace(diagnosisSession.title, searchValue => (
					<span className="highlight">{searchValue}</span>
				))}
			</p>)
		} else {
			return (<p className="title">{diagnosisSession.title}</p>)
		}
	}
	const resumeSession = () => {
		window.open(
			`${routes.test_pages.navigationPath}?id=${diagnosisSession.diagnostic}&child=${diagnosisSession.child
			}&token=${CryptoProviders(
				JSON.stringify({
					child: diagnosisSession.child,
					diagnosticId: diagnosisSession.diagnostic,
					diagnosisTitle: diagnosisSession.title,
					CFToken: getItemsFromCookies('token')
				})
			).hashIt()}&session=${diagnosisSession.session}`,
			'_blank',
			`toolbar=0,location=0,menubar=0,width=1025,height=751,left=${(window.screen.width - 1025) / 2},top=${(window.screen.height - 751) / 2
			}`
		);
	};

	return (
		<li
			key={diagnosisSession.id}
			data-ref={diagnosisSession.diagnostic}
			data-session={diagnosisSession.session}
			className={getClassName()}
			onClick={e => diagnosisSession.status === 'finished' && inProfile && handleShowSession(e, diagnosisSession)}
		>
			{inProfile ? (
				<p
					className="in-profile"
					onClick={e => {
						diagnosisSession.status === 'finished' &&
							inProfile &&
							handleSelectSession(e, diagnosisSession.session);
					}}
				>
					<span
						className={'checkmark' + (selectedSession === diagnosisSession.session ? ' checked' : '')}
					></span>
				</p>
			) :
				getTitle()
			}
			<p className="datetime">{moment(diagnosisSession.date_initialized).format('DD.MM.YYYY HH:mm')}</p>
			<p className="duration">{moment.utc(diagnosisSession.seconds_since_start * 1000).format('HH:mm:ss')}</p>
			<p className="status">
				{t(`diagnosis_Expand_status_${diagnosisSession.status}`)}{' '}
				{diagnosisSession.started === 'training' ? ' (Training)' : null}
			</p>
			<p className="process">
				<span className="percent">{diagnosisSession.process_percent}%</span>
				<span className="bg">
					<span className="bar" style={{ width: `${diagnosisSession.process_percent}%` }}></span>
				</span>
			</p>
			{!hideOption ? (
				<p className="options text-right">
					<NavItemComponent className="resume-test" icon="video" action={resumeSession} />
					<NavItemComponent className="remove-test" icon="trash" action={handleShowPopup} />
				</p>
			) : null}
		</li>
	);
}

export default DiagnosisSessionItemComponent;
