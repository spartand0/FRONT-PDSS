import React from 'react';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import ContainerHeaderLayout from '../../layouts/ContainerHeaderLayout';

function ImprintPage({t}) {

    return (
		<ContainerHeaderLayout hideWhiteBox title={t('impressum')}>
                <div className="box">
					<div className="padding">
                        <div className="grid-x grid-margin-x">
							<div className="cell">
								<p><strong>ADRESSE:</strong></p>
								<p><strong>Elsevier GmbH</strong><br/> Postfach 20 19 30, 80019 München<br/> Bernhard-Wicki-Str. 5, 80636 München<br/> Deutschland<br/> Telefon 089/12 08 40 846 (Mo. - Fr. 8:30 Uhr bis 16:30 Uhr)<br/> Telefax 089/38 03 76 01<br/> E-Mail: <a href="mailto:kundendienst@elsevier.com?subject=HTML link">kundendienst@elsevier.com</a><br/> Homepage: <a href="https://www.elsevier.de">www.elsevier.de</a><br/><br/>

								 <strong>{t('managing_directors')}:</strong><br/><br/>

								 <strong>Olaf Lodbrok, Fiona Henderson</strong><br/> Amtsgericht München HRB 152680<br/> UST-Id.: DE 180607607<br/> <br/> <strong>WICHTIGE HINWEISE:</strong> <br/><br/>

								 <strong>{t('liability')}:</strong><br/> {t('liability_text')}</p>
							</div>
						</div>
					</div>
				</div>
		</ContainerHeaderLayout>
	)
}
export default WithRouter(ImprintPage);
