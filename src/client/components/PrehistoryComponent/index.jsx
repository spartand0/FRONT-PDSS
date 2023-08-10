/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default function PrehistoryComponent({ diagnostic, openIntroductionPopUp, t }) {
	return (
		<div className="prehistory-screen">
			<div className="grid-container">
				<div className="grid-x align-center align-middle">
					<div className="medium-10">
						<div className="text-center">
							<div className="callout warning">
								<div dangerouslySetInnerHTML={{ __html: diagnostic?.prehistory }} />
								<a
									className="button grey show-prehistory hide-for-child"
									onClick={e => {
										e.stopPropagation();
										openIntroductionPopUp(false);
									}}
								>
									{t('diagnostic_test_mode_therapist_btn_prehistory_close')}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
