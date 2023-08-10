/* eslint-disable */
// Import necessary libraries and components
import React from 'react';
import routes from '../../../config/routes';
import { mapCurrentLocationQueriesToJSON } from '../../../shared/helpers/properties';
import ContentListContainer from '../../containers/ContentListContainer';
import EvaluationListContainer from '../../containers/EvaluationListContainer';
import FullScreenLoaderContainer from '../../containers/FullScreenLoaderContainer';
import NavItemComponent from '../NavItemComponent';
import { useSelector } from 'react-redux';
import { selectCurrentTab } from '../../../store/reducers/evaluation.reducers';
import GrammarComponent from '../EvaluationGrammerComponent';

function DiagnosisSessionTabsComponent({
	diagnosisSession,
	t,
	handleClickTab,
	analysesResult,
	loader
}) {
	const currentTab = useSelector(selectCurrentTab);
	// If the loader is active, display the full-screen loader
	if (loader) return <FullScreenLoaderContainer />;

	// Otherwise, display the content of the tabs
	return (
		<div className="results">
			<h3>{t('session_tabs_details')}</h3>
			<ul className="tabs">
				{/* Tab 1: Answers */}
				<li className={`tabs-title ${currentTab == 1 ? ' is-active' : ''}`}>
					<NavItemComponent
						path={
							routes.account_pages.children.evaluation_page.children.result_page.navigationPath +
							mapCurrentLocationQueriesToJSON({
								session: diagnosisSession.session
							})
						}
						title={t('tab_answer')}
						action={e => handleClickTab(e, 1)}
					/>
				</li>
				{/* Tab 2: Results */}
				<li className={`tabs-title ${currentTab == 2 ? ' is-active' : ''}`}>
					<NavItemComponent
						path={
							routes.account_pages.children.evaluation_page.children.result_page.navigationPath +
							mapCurrentLocationQueriesToJSON({
								session: diagnosisSession.session
							})
						}
						title={t('tab_result')}
						action={e => handleClickTab(e, 2)}
					/>
				</li>
				{/* Tab 3: Score (only for diagnostic == 5) */}
				{window.location.search.includes('id=5')&& (
					<li className={`tabs-title ${currentTab == 3 ? ' is-active' : ''}`}>
						<NavItemComponent
							path={
								routes.account_pages.children.evaluation_page.children.result_page.navigationPath +
								mapCurrentLocationQueriesToJSON({
									session: diagnosisSession.session
								})
							}
							title={t('tab_score')}
							action={e => handleClickTab(e, 3)}
						/>
					</li>
				)}
			</ul>
			{/* Tab content */}
			{loader ? (
				<FullScreenLoaderContainer />
			) : (
				<div className="tabs-content" data-tabs-content="results-tabs">
					{/* Content for tab 1: Answers */}
					{currentTab == 1 && (
						<ContentListContainer
							diagnosisSession={diagnosisSession}
							t={t}
						/>
					)}
					{/* Content for tab 2: Results */}
					{currentTab == 2 && analysesResult && (
						<EvaluationListContainer
							t={t}
							scores={analysesResult}
							handleClickTab={handleClickTab}
							session={diagnosisSession.session}
						/>
					)}
					{currentTab == 3 && analysesResult && (
						<GrammarComponent
							t={t}
							scores={analysesResult}
							handleClickTab={handleClickTab}
							diagnosisSession={diagnosisSession}
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default DiagnosisSessionTabsComponent;
