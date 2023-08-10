import { useSelector } from 'react-redux';
import { selectSeconds } from '../../../store/reducers/diagnosisExtra.reducer';

const TherapistTestFooterComponent = ({
	t,
	skipToTheNextPage,
	skipToThePreviousPage,
	updateCurrentSession,
	sessionPaused,
	resetSessionInitial,
	sessionFinished,
	trainingSession,
	pause,
	stop,
	contentIds,
	start,
	lastQuestion
}) => {
	const seconds = useSelector(selectSeconds);

	return (
		<>
			<div className="controls">
				<div className="grid-container">
					<div className="grid-x">
						<div className="cell small-4 ">
							{!sessionPaused && (
								<a
									onClick={() => {
										skipToThePreviousPage();
									}}
									className="button prev"
									title={t('diagnostic_test_mode_therapist_footer_btn_prev')}
								>
									<span className="entypo-left-open"></span>
									{t('diagnostic_test_mode_therapist_footer_btn_prev')}
								</a>
							)}
						</div>

						<div className="cell small-4 text-center">
							{sessionPaused ? (
								<a
									className="button play-test"
									style={{ display: sessionPaused ? 'inline-block' : 'none' }}
									onClick={() => {
										updateCurrentSession({
											status: 'played',
											seconds_since_start: seconds
										});
										start();
									}}
								>
									<span className="entypo-play"></span>
									{t('diagnostic_test_mode_therapist_footer_btn_play')}
								</a>
							) : (
								<a
									className="button grey pause-test"
									onClick={() => {
										updateCurrentSession({
											status: 'paused',
											seconds_since_start: seconds
										});
										pause();
									}}
								>
									<span className="entypo-pause"></span>
									{t('diagnostic_test_mode_therapist_footer_btn_pause')}
								</a>
							)}

							<a
								className="button finish-test"
								onClick={() => {
									let bodyToUpdate = {
										status: trainingSession ? 'initialized' : 'finished',
										started: trainingSession ? 'no' : 'yes',
										seconds_since_start: trainingSession ? 0 : seconds
									};
									trainingSession ? stop() : pause();
									if (trainingSession) Object.assign(bodyToUpdate, { contentIds, current_slide: 0 });

									updateCurrentSession(bodyToUpdate);
									trainingSession && resetSessionInitial();
								}}
							>
								<span className="entypo-flag"></span>
								{t('diagnostic_test_mode_therapist_footer_btn_controls_finish')}
							</a>
							<p className="finish-status">
								{t('diagnostic_test_mode_therapist_footer_btn_controls_finish_status')}
							</p>
						</div>
						<div className="cell small-4 text-right">
							{!sessionPaused && (
								<>
									<a
										className="button next"
										onClick={() => {
											skipToTheNextPage();
										}}
										title={t('diagnostic_test_mode_therapist_footer_btn_next')}
									>
										{t('diagnostic_test_mode_therapist_footer_btn_next')}
										<span className="entypo-right-open"></span>
									</a>
									{!sessionFinished && lastQuestion != null ? (
										<div className="callout alert finish-hint">
											{t('diagnostic_test_mode_therapist_footer_btn_next_warning')}
										</div>
									) : null}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TherapistTestFooterComponent;
