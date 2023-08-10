/* eslint-disable */

import React, { useState } from 'react';
import routes from '../../../config/routes';
import { mapCurrentLocationQueriesToJSON } from '../../../shared/helpers/properties';
import MainAccountComponent from '../../components/MainAccountComponent';
import NavItemComponent from '../../components/NavItemComponent';
import { NavListContainer } from '../NavListContainer';

const DefaultHeader = props => {
	const { SecuritiesState, value, onChange } = props;
	const { t } = props;
    const [styling, setStyling] = useState({
        active: false,
    });

	function handleChange(value) {
        setStyling({ active: value});
        props.onChange(value);
    }
	return (
		<header>
			<div className="bar">
				<div className="grid-container">
					<div className="grid-x">
						<div className="cell medium-6">
							<nav className="meta">
							    <ul>
									<li>
										<a href={routes.meta_pages.children.buy_page.navigationPath} target="_blank">
											<span className='entypo entypo-bag'> </span>
											{t('buy')}
										</a>
									</li>
									<li>
										<a href={routes.meta_pages.children.faq_page.navigationPath} target="_blank">
											<span className='entypo entypo-lamp'> </span>
											{t('faq')}
										</a>
									</li>
								</ul>
							</nav>
						</div>
						<MainAccountComponent {...SecuritiesState} />
					</div>
				</div>
			</div>
			<div className="white">
				<div className="grid-container">
					<div className="grid-x">
						<div className="cell large-4 medium-8 small-8">
							<NavItemComponent parentId={'logo'} path="/" textIcons>
								<span className="short">PDSS</span>
								<span className="long">{t('header_text_title')}</span>
							</NavItemComponent>
						</div>
						<div className="cell large-8 medium-4 small-4">
							<nav className={'main ' + (styling?.active ? 'active' : '')}>
								{SecuritiesState?.hasSession && (
									<>
										<p className="mobile-toggle">
											<a onClick={() => handleChange(!value)}>
												<span className="entypo entypo-menu"></span>
												{t('label_menu')}
											</a>
										</p>

										<NavListContainer event={onChange} handleChange={handleChange}
											navList={[
												{
													title: t('dashboard'),
													path: routes.account_pages.navigationPath,
													icon: 'address',
													key:"default-header-key-"+t('dashboard')
												},
												{
													title: t('child'),
													path: routes.account_pages.children.child_page.navigationPath,
													icon: 'vcard',
													parent: true,
													key:"default-header-key-"+t('child')
												},
												{
													title: t('diagnosis'),
													path:
														routes.account_pages.children.diagnosis_page.navigationPath +
														mapCurrentLocationQueriesToJSON(),
													icon: 'target',
													parent: true,
													key:"default-header-key-"+t('diagnosis')
												},
												{
													title: t('evaluation'),
													path:
														routes.account_pages.children.evaluation_page.navigationPath +
														mapCurrentLocationQueriesToJSON(),
													icon: 'chart-area',
													parent: true,
													key:"default-header-key-"+t('evaluation')
												},
												{
													title: t('downloads'),
													path: routes.account_pages.children.downloads_page.navigationPath,
													icon: 'download',
													key:"default-header-key-"+t('downloads')
												}
											]}
										/>
									</>
								)}
							</nav>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default DefaultHeader;
