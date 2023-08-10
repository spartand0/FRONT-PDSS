import React, { useEffect, useState } from 'react';
import PrivacySettingsPopup from '../../components/PrivacySettingsComponent';

export const DefaultFooter = (props) => {
	const { t } = props;
	const thisYear = (new Date().getFullYear());
	/* const [showCookies, setShowCookies] = useState(false);
	const handleShowCookies = () => {
		setShowCookies(!showCookies);
	};
	const handleConfirmPopup = () => {
		setShowCookies(false);
	};
	const handleCancelPopup = () => {
		setShowCookies(false);
	};

    useEffect(() => {
        if (showCookies) {
            document.documentElement.classList.add('zf-has-scroll', 'is-reveal-open-modal');
        } else {
            document.documentElement.removeAttribute('class');
        }
    }, [showCookies]); */

	return (
		<>
			<footer>
				<div className="grid-container">
					<div className="elsevier">
						<img src={`${process.env.REACT_APP_S3_ENDPOINT}/files/images/landingpage/wordmark-elsevier.svg`} alt="Elsevier Logo" />
					</div>
					<div className="info">
						<nav>
							<ul className="clearfix">
								<li>
									<a href="/meta/impressum">{t('impressum')}</a>
								</li>
								<li>
									<a href="https://www.elsevier.com/legal/privacy-policy-de-de" target="_blank">{t('datenschutz')}</a>
								</li>
								<li>
								<button id="ot-sdk-btn" class="footer_cookie_link ot-sdk-show-settings">{t('datenschutzeinstellungen')}</button>
								</li>
								<li>
									<a href={`${process.env.REACT_APP_S3_ENDPOINT}/files/downloads/all/PDSS_TC_DPA.pdf`} target="_blank">{t('elsevier_agb')}</a>
								</li>
							</ul>
						</nav>
						<p>Copyright © {thisYear} Elsevier GmbH. {t('footer_text')} <a href="https://www.elsevier.com/legal/cookienotice-de-de" target="_blank">{t('cookie_richtlinien')}</a>.</p>
					</div>
					<div className="relx">
						<a href="https://www.relx.com/" target="_blank">
							<img src={`${process.env.REACT_APP_S3_ENDPOINT}/files/images/landingpage/logo-relxgroup.svg`} alt="RELX Group" />
						</a>
					</div>
				</div>
			</footer>


			{/* {showCookies && <PrivacySettingsPopup
				ConfirmPopup={handleConfirmPopup}
				closePopup={handleCancelPopup}
				show={showCookies} t={t} />
			} */}
		</>
	);
};
