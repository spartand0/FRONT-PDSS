import { t } from 'i18next';
import React from 'react';
import routes from '../../../config/routes';
import AuthServices from '../../../security/services/AuthService';
import NavItemComponent from '../NavItemComponent';

// Define a functional component called MainAccountComponent with props
const MainAccountComponent = ({ currentUser, hasSession }) => {
	// Define a function to open the login page
	const openLoginPage = () => {
		AuthServices.login();
	};

	// Define a function to logout the user
	const logout = () => {
		AuthServices.logout();
	};

	// Define a function to render the "logged in" view
	const renderLoggedInView = () => (
		<div className="account">
			<div className="clearfix">
				{/* Display the welcome message */}
				<p className="indicator">{`${t('welcome')}, ${
					currentUser.given_name ? currentUser.given_name + ' ' + currentUser.family_name : currentUser.email
				}`}</p>
				{/* Display the logout button */}
				<p className="options">
					<NavItemComponent action={logout} title={t('logout')} icon="logout" />
				</p>
			</div>
		</div>
	);

	// Define a function to render the "not logged in" view
	const renderNotLoggedInView = () => (
		<div className="account">
			<div className="clearfix" onClick={openLoginPage}>
				{/* Display the "not logged in" message */}
				<p className="indicator">{t('not_logged_in')}</p>
				{/* Display the login button */}
				<p className="options">
					<NavItemComponent path={routes.securities_pages.login} title={t('register')} icon="login" />
				</p>
			</div>
		</div>
	);

	// Render the appropriate view based on the hasSession prop
	return <div className="cell medium-6">{hasSession ? renderLoggedInView() : renderNotLoggedInView()}</div>;
};

// Export the MainAccountComponent as the default export of this module
export default MainAccountComponent;
