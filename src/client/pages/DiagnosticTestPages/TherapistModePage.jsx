import React, { useEffect, useState } from 'react';

import FullScreenLoaderContainer from '../../containers/FullScreenLoaderContainer';
import TestModeBodyContainer from '../../containers/TestModeBodyContainer';
import { useDiagnosticsTherapistMode } from './useDiagnosticsTest';
import TherapistTestComponent from '../../components/TherapistTestComponent';
import TherapistTestHeaderComponent from '../../components/TherapistTestHeader';
import PauseScreenComponent from '../../components/PauseScreenComponent';
import PrehistoryComponent from '../../components/PrehistoryComponent';
import CancelTestPopupComponent from '../../components/CancelTestPopupComponent';
import TherapistInitializedTestComponent from '../../components/TherapistInitializedTestComponent';
import { useTimerV2 } from '../../../shared/helpers/hooks/TimerV2';
import PdssConfirmPopup from '../../components/PdssConfirmPopupComponent';

export const TherapistModePage = props => {
	const { t } = props;

	const {
		child,
		diagnostic,
		loader,
		openIntroductionPopUp,
		updateSession,
		getCurrentDianoeticTestContentData,
		TeleportToTheTargetContentReference,
		openTestPageViewInNewWindow,
		generateChildDynamicLink,
		socketClient,
		DataPointer,
		socketTriggerEffect,
		setDataPointer,
		MainDivContentReference,
		diagnosticTestContent
	} = useDiagnosticsTherapistMode(props);

	const { start, pause, initialize, stop, getCurrentTime } = useTimerV2();

	const handleShowAbort = () => {
		pause();
		setShowPopUp({ first: true, second: false });
	};
	const handleConfirmPopup = () => {
		updateSession('cancel_session', getCurrentTime());
		setShowPopUp({ first: false, second: true });
	};
	const handleCancelPopup = () => {
		if(diagnostic?.session?.status ==='played')
		start();
		setShowPopUp({ first: false, second: false });
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
		if (diagnostic?.session?.status === 'played') start();
	}, [diagnostic?.session?.status]);
	useEffect(() => {
		initialize(diagnostic?.session?.seconds_since_start);
	}, [diagnostic?.session?.seconds_since_start]);
	const [showPopUp, setShowPopUp] = useState({ first: false, second: false });

	if (loader && (!child || !diagnostic)) return <FullScreenLoaderContainer />;
	const handleRenderClassName = () => {
		switch (diagnostic?.session.started) {
			case 'yes':
				return 'started';
			case 'training':
				return 'training';
			default:
				return '';
		}
	};
	return (
		<div
			ref={MainDivContentReference}
			data-process-percent={
				diagnostic?.session?.process_percent ? Math.trunc(diagnostic?.session?.process_percent) : 0
			}
			data-status={diagnostic?.session?.status}
			className={`test login  ${handleRenderClassName()} ${DataPointer == '0' ? 'first-item' : ''} ${
				DataPointer == diagnosticTestContent?.length - 1 ? ' last-item' : ''
			}
			`}
		>
			<PrehistoryComponent diagnostic={diagnostic} openIntroductionPopUp={openIntroductionPopUp} t={t} />

			{showPopUp.second && <CancelTestPopupComponent t={t} />}
			<PdssConfirmPopup
				ConfirmPopup={handleConfirmPopup}
				closePopup={handleCancelPopup}
				title={t('diagnostic_test_mode_therapist_header_dropdown_btn_test_cancel')}
				description={t('diagnostic_test_desc_close_confirm_msg')}
				show={showPopUp.first}
			/>
			<TherapistTestHeaderComponent
				{...props}
				child={child}
				diagnostic={diagnostic}
				data={diagnosticTestContent}
				updateSession={updateSession}
				generateChildDynamicLink={generateChildDynamicLink}
				openTestPageViewInNewWindow={openTestPageViewInNewWindow}
				sessionStated={['yes', 'training'].includes(diagnostic?.session.started)}
				handleShowAbort={handleShowAbort}
				setShowPopUp={setShowPopUp}
				showPopUp={showPopUp}
			/>

			{diagnostic?.session?.status === 'paused' && (
				<PauseScreenComponent
					sessionStatus={diagnostic?.session?.status}
					message={t('diagnostic_test_mode_therapist_pause_screen')}
				/>
			)}

			<TestModeBodyContainer>
				{diagnostic?.session?.status === 'initialized' ? (
					<TherapistInitializedTestComponent
						t={t}
						start={start}
						title={diagnostic?.title}
						updateSession={updateSession}
						prehistory={diagnostic?.prehistory}
						openIntroductionPopUp={openIntroductionPopUp}
					/>
				) : (
					<TherapistTestComponent
						{...props}
						pause={pause}
						start={start}
						stop={stop}
						getCurrentTime={getCurrentTime}
						diagnosticId={diagnostic?.id}
						DataPointer={DataPointer}
						socketClient={socketClient}
						data={diagnosticTestContent}
						session={diagnostic?.session}
						setDataPointer={setDataPointer}
						socketTriggerEffect={socketTriggerEffect}
						MainDivContentReference={MainDivContentReference}
						resetSessionInitial={() => updateSession('reset_init_session')}
						getCurrentDianoeticTestContentData={getCurrentDianoeticTestContentData}
						TeleportToTheTargetContentReference={TeleportToTheTargetContentReference}
					/>
				)}
			</TestModeBodyContainer>
		</div>
	);
};

export default TherapistModePage;
