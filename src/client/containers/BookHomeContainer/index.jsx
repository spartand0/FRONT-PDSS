import React from 'react';
import dataHome from '../../../shared/homePage';
import config from '../../../config';
import PdssImageComponent from '../../components/PdssImageComponent';
import PdssCheckListComponent from '../../components/PdssCheckListComponent';
import PdssLinkButtonComponent from '../../components/PdssLinkButtonComponent';

export default function BookHomeContainer(props) {
	const { t } = props;
	return (
		<div className="book">
			<div className="grid-container">
				<div className="box">
					<div className="padding">
						<div className="grid-x grid-margin-x grid-margin-y">
							<div className="cell text-center">
								<h2>{t('book_title')}</h2>
								<hr />
							</div>
							{dataHome.books.map((item) => (
								<React.Fragment key={item.title}>
									<PdssImageComponent path={item.path} alt={t('alt_book')} />
									<PdssCheckListComponent
										title={t(item.title)}
										list={t(item.list, { returnObjects: true })}
									/>
								</React.Fragment>
							))}
							<div className="cell text-center">
								<hr />
								<PdssLinkButtonComponent url={config.API_Config.shop_url} name={t('buy_button')} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
