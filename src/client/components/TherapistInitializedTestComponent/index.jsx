/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default function TherapistInitializedTestComponent({
	title,
	prehistory,
	openIntroductionPopUp,
	t,
	updateSession,
	start
}) {
	return (
		<div className="splash-screen text-center">
			<div className="grid-container">
				<div className="grid-x align-middle">
					<div className="cell">
						<h1>{title}</h1>

						<p className="buttons">
							{prehistory && (
								<a
									onClick={e => {
										e.stopPropagation();
										openIntroductionPopUp(true);
									}}
									className="button grey show-prehistory"
								>
									<span className="entypo-book-open"></span>
									{t('diagnostic_test_mode_therapist_btn_prehistory')}
								</a>
							)}

							<a
								className="button grey start-training"
								onClick={() => {
									updateSession('start_training');
								}}
							>
								<span className="entypo-info-circled"></span>{' '}
								{t('diagnostic_test_mode_therapist_btn_practice_mode')}
							</a>
							<a
								className="button start-test"
								onClick={() => {
									updateSession('session_start');
									start();
								}}
							>
								<span className="entypo-video"></span> {t('diagnostic_test_mode_therapist_btn_start')}
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
