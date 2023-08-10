import React from 'react';
import routes from '../../../config/routes';
import DashboardCardItemComponent from '../../components/DashboardCardItemComponent';

function DashboardCardListContainer({ t }) {
	const cardList = [
		{
			icon: 'vcard',
			navList: [
				{
					title: t('label_new_child'),
					path: routes.account_pages.children.child_page.children.create_child_page.navigationPath,
					icon: 'plus-circled'
				},
				{
					title: t('label_show_children'),
					path: routes.account_pages.children.child_page.navigationPath,
					icon: 'vcard'
				}
			],
			path: routes.account_pages.children.child_page.navigationPath,
			title: t('btn_go_to_children'),
			key:"dashboard-card-key"+t('btn_go_to_children')
		},
		{
			icon: 'target',
			navList: [
				{
					title: t('label_show_tests'),
					path: routes.account_pages.children.diagnosis_page.navigationPath,
					icon: 'target'
				},
				{
					title: t('label_show_all_tests'),
					path: routes.account_pages.children.diagnosis_page.children.diagnostic_all_page.navigationPath,
					icon: 'doc-text'
				}
			],
			path: routes.account_pages.children.diagnosis_page.navigationPath,
			title: t('btn_go_to_diagnostics'),
			key:"dashboard-card-key"+t('btn_go_to_children')
		},
		{
			icon: 'chart-area',
			navList: [
				{
					title: t('label_show_t_profile'),
					path: routes.account_pages.children.evaluation_page.children.profile_page.navigationPath,
					icon: 'chart-bar'
				},
				{
					title: t('label_show_export'),
					path: routes.account_pages.children.evaluation_page.children.export_page.navigationPath,
					icon: 'download'
				}
			],
			path: routes.account_pages.children.evaluation_page.navigationPath,
			title: t('btn_go_to_analysis'),
			key:"dashboard-card-key"+t('btn_go_to_children')
		}
	];
	return (
		<div className="grid-x grid-margin-x">
			{cardList.map((card, index) => {
				return <DashboardCardItemComponent key={card.title} card={card} />;
			})}
		</div>
	);
}

export default DashboardCardListContainer;
