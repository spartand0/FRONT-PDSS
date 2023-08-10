import React from 'react';
import PdssCardComponent from '../../components/PdssCardComponent';
import dataHome from '../../../shared/homePage';
function CardsHomeContainer(props) {
	const { t } = props;
	return (
		<div className="usp">
			<div className="grid-container">
				<div className="grid-x grid-margin-x">
					<div className="cell text-center">
						<h2>{t('title_box_image')}</h2>
					</div>

					{dataHome.cards.map((image, index) => (
						<PdssCardComponent
							key={image.title}
							backgroundImage={`${process.env.REACT_APP_S3_ENDPOINT}/files/images/landingpage/` + image.path}
							title={t(image.title)}
							description={t(image.description)}
						></PdssCardComponent>
					))}
				</div>
			</div>
		</div>
	);
}

export default CardsHomeContainer;
