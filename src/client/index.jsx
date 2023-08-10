import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import routes from '../config/routes';

import { CallBackAuthCheck, GuardRoute, InjectApprovedSession, PinRedemptionRouteChecker } from '../security';
import WithRouter from '../shared/helpers/hooks/HOC';
import WithReduxConnector from '../shared/helpers/hooks/WithReduxConnector';
import MainBreadCrumb from './components/MainBreadCrumb';
import CompleteProfileFormContainer from './containers/CompleteProfileFormContainer';
import ContainerHeaderLayout from './layouts/ContainerHeaderLayout';
import DefaultLayout from './layouts/DefaultLayout';
import AboutPage from './pages/AboutPage';
import AccountVerify from './pages/AccountVerify';
import BuyPage from './pages/BuyPage';
import ChildPage from './pages/ChildPage';
import CreateChildPage from './pages/CreateChildPage';
import DashboardPage from './pages/DashboardPage';
import DiagnosisPage from './pages/DiagnosisPage';
import DiagnosticTestPages from './pages/DiagnosticTestPages';
import DownloadPage from './pages/DownloadPage';
import EvaluationPage from './pages/EvaluationPage';
import ExportEvaluationPdfPage from './pages/ExportEvaluationPdfPage';
import FAQPage from './pages/FAQPage';
import HomePage from './pages/HomePage';
import ImprintPage from './pages/ImprintPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
const MainPage = props => {
	const { SecuritiesState } = props;
	const [toggleMenu, setToggleMenu] = useState(false);

	function handleChange(newValue) {
		setToggleMenu(newValue);
	}
	const handleRenderClassName = () => {
		if (SecuritiesState?.hasSession)
			if (toggleMenu) return ' login move-left';
			else return ' login';
		else return '';
	};
	return (
		<div className={`page ${handleRenderClassName()}`} data-request={window.location.pathname}>
			<Routes>
				<Route exact path={routes.securities_pages.login.path} element={<LoginPage />} />
				<Route exact path={routes.securities_pages.login_check.path} element={<LoginPage />} />
				<Route exact path={routes.securities_pages.callback.path} element={<CallBackAuthCheck {...props} />} />

				<Route
					exact
					path={routes.securities_pages.account_verify.path}
					element={<AccountVerify {...props} />}
				/>
				<Route
					element={
						<InjectApprovedSession {...props}>
							<DefaultLayout value={toggleMenu} onChange={handleChange}>
								<CompleteProfileFormContainer />
								<Outlet />
							</DefaultLayout>
						</InjectApprovedSession>
					}
				>
					{/* Home - Landing page routing */}
					<Route path={routes.home_page.path} element={<HomePage {...props} />} />
					{/* Meta - pages routing */}
					<Route path={routes.meta_pages.path}>
						<Route path={routes.meta_pages.children.about_page.path} element={<AboutPage />} />
						<Route path={routes.meta_pages.children.buy_page.path} element={<BuyPage />} />
						<Route path={routes.meta_pages.children.faq_page.path} element={<FAQPage {...props} />} />
						<Route
							path={routes.meta_pages.children.imprint_page.path}
							element={<ImprintPage {...props} />}
						/>
					</Route>
					<Route
						element={
							<GuardRoute {...props}>
								<Outlet />
							</GuardRoute>
						}
					>
						<Route
							element={
								<>
									<MainBreadCrumb {...props} />
									<ContainerHeaderLayout>
										<PinRedemptionRouteChecker {...props}>
											<Outlet />
										</PinRedemptionRouteChecker>
									</ContainerHeaderLayout>
								</>
							}
						>
							<Route path={routes.account_pages.path}>
								<Route
									path={routes.account_pages.navigationPath}
									element={<DashboardPage t={props.t} />}
								/>
								<Route path={routes.account_pages.children.child_page.path}>
									<Route
										path={routes.account_pages.children.child_page.children.child_page.path}
										element={<ChildPage {...props} />}
									/>
									<Route
										path={routes.account_pages.children.child_page.children.create_child_page.path}
										element={<CreateChildPage />}
									></Route>
									<Route
										path={routes.account_pages.children.child_page.children.edit_child_page.path}
										element={<CreateChildPage form_action_edit />}
									></Route>
								</Route>
								<Route path={routes.account_pages.children.diagnosis_page.path}>
									<Route
										path={routes.account_pages.children.diagnosis_page.children.diagnosis_page.path}
										element={<DiagnosisPage {...props} />}
									/>
									<Route
										path={
											routes.account_pages.children.diagnosis_page.children.diagnostic_all_page
												.path
										}
										element={<DiagnosisPage {...props} all />}
									/>
								</Route>
								<Route path={routes.account_pages.children.evaluation_page.path}>
									<Route
										path={
											routes.account_pages.children.evaluation_page.children.evaluation_page.path
										}
										element={<EvaluationPage />}
									/>
									<Route
										path={routes.account_pages.children.evaluation_page.children.export_page.path}
										element={<EvaluationPage export_page />}
									/>
									<Route
										path={
											routes.account_pages.children.evaluation_page.children.profile_page
												.navigationPath
										}
										element={<EvaluationPage profile_page />}
									/>
									<Route
										path={
											routes.account_pages.children.evaluation_page.children.result_page
												.navigationPath
										}
										element={<EvaluationPage result_page />}
									/>
								</Route>

								<Route
									path={routes.account_pages.children.downloads_page.path}
									element={<DownloadPage />}
								/>
							</Route>
						</Route>
					</Route>
				</Route>
				<Route
					path={routes.account_pages.children.evaluation_page.children.export_eval_page.navigationPath}
					element={
						<InjectApprovedSession {...props}>
							<GuardRoute {...props}>
								<ExportEvaluationPdfPage export_eval_page {...props} />
							</GuardRoute>
						</InjectApprovedSession>
					}
				/>
				<Route path={routes.test_pages.path} element={<DiagnosticTestPages {...props} />} />

				<Route path="*" element={<NotFoundPage {...props} />} />
			</Routes>
		</div>
	);
};
MainPage.prototype = {
	action_securities_GetServerAuthUser: PropTypes.func.isRequired,
	action_securities_GetUserTokenByISBNCode: PropTypes.func.isRequired
};
export default WithReduxConnector(WithRouter(MainPage), state => ({
	SecuritiesState: state.GlobalSecuritiesSate
}));
