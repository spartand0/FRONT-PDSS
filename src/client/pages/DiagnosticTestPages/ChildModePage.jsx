import React, { Fragment, useEffect } from 'react';
import CancelTestPopupComponent from '../../components/CancelTestPopupComponent';
import PauseScreenComponent from '../../components/PauseScreenComponent';
import PrehistoryComponent from '../../components/PrehistoryComponent';
import TestImageComponent from '../../components/TestImageComponent';
import FullScreenLoaderContainer from '../../containers/FullScreenLoaderContainer';
import { useDiagnosticsChildMode } from './useDiagnosticsTest';

const ChildModePage = props => {
	const { t } = props;
	const { diagnosticTestContent, selectAnswerFrommChild, otherDetails, openPrehistory, diagnosticTitle } =
		useDiagnosticsChildMode(props);
	
	if (diagnosticTitle.length===0) return <FullScreenLoaderContainer />;

	return (
		<div
			className={`test login child_mode started ${openPrehistory ? ' show-prehistory ' : 'hide-prehistory '}  `}
			data-status={otherDetails?.session?.status}
		>
			<div className="header">
				<div className="grid-x process-for-child">
					<div className="cell">
						<div className="bg">
							<span
								className="bar"
								style={{
									width: `${
										otherDetails &&
										Math.round(
											((otherDetails.session.current_slide + 1) /
												otherDetails.diagnostic_content_length) *
												100
										)
									}%`
								}}
							></span>
						</div>
					</div>
				</div>
			</div>
			<PrehistoryComponent diagnostic={otherDetails} t={t} />
			{otherDetails?.session?.status === 'canceled' && <CancelTestPopupComponent t={t} />}
			{!diagnosticTestContent || diagnosticTestContent?.length === 0 ? (
				<div className="content">
					<div className="  text-center full-h ">
						<div className="grid-container">
							<div className="grid-x align-middle full-h ">
								<div className="cell">
									<h1>{diagnosticTitle}</h1>
									{t('diagnostic_test_mode_child_splash_screen')}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Fragment>
					{otherDetails?.session?.status === 'paused' && (
						<PauseScreenComponent
							sessionStatus={otherDetails?.session?.status}
							message={t('diagnostic_test_mode_therapist_pause_screen_child')}
						/>
					)}
					<div className="content">
						<div className="grid-container">
							<TestImageComponent
								{...props}
								diagnosticId={otherDetails.id}
								selectAnswer={item => selectAnswerFrommChild(item)}
								questionData={diagnosticTestContent}
							/>
						</div>
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default ChildModePage;
