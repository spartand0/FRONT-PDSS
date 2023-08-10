import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import FullScreenLoaderContainer from '../client/containers/FullScreenLoaderContainer';
import PinRedemptionFormContainer from '../client/containers/PinRedemptionFormContainer';
import UnauthorizedContainer from '../client/containers/UnauthorizedContainer';
import ContainerHeaderLayout from '../client/layouts/ContainerHeaderLayout';
import routes from '../config/routes';
import { getUserAuthProfileItem } from '../shared/helpers/properties';
import { setCurrentUser } from '../store/reducers/securities.reducers';
import AuthService from './services/AuthService';
import { healthCheckerCallBackFunction } from './services/PinRedemption';

export const InjectApprovedSession = ({
	children,
	SecuritiesState,
	action_securities_GetServerAuthUser,
	action_securities_GetUserTokenByISBNCode
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (!SecuritiesState?.hasSession && localStorage.profile) {
			dispatch(setCurrentUser());

			action_securities_GetServerAuthUser(getUserAuthProfileItem('sub'));
			action_securities_GetUserTokenByISBNCode(getUserAuthProfileItem('sub'));
		}
	}, [SecuritiesState?.hasSession, dispatch]);

	useEffect(() => {
		if (SecuritiesState?.currentUser && SecuritiesState?.PinHealthChecker.submitPinCode.submitted) {
			setTimeout(() => {
				action_securities_GetUserTokenByISBNCode(SecuritiesState.currentUser?.sub);
			}, 2000);
		}
	}, [SecuritiesState?.PinHealthChecker.submitPinCode.submitted]);

	return <Fragment>{children}</Fragment>;
};
export const CallBackAuthCheck = () => {
	/** set authorization code  **/
	AuthService.setAuthorizationCode(AuthService.getParameterByName('code'));
	/** get profile **/
	AuthService.signinRedirectCallback({ response_mode: 'query' }).then(
		response => {
			/** set id_token, access_token, expires_in  **/
			AuthService.setIdToken(response.id_token);
			AuthService.setAccessToken(response.access_token);
			AuthService.setExpiresIn(response.expires_in);
			AuthService.getUserInfo().then(user => {
				/** check verify email, user metadata **/
				callSuccessScript(user.profile);
			});
		},
		function (error) {
			console.log('error', error);
			if (AuthService.getParameterByName('error_description').includes('EMAIL_NOT_VERIFIED')) {
				callAccountVerifyScript();
			} else {
				window.location.href = '/';
			}
		}
	);

	const callSuccessScript = user => {
		/** check if the user has verified the email **/
		if (!user.email_verified) {
			callAccountVerifyScript();
		} else {
			document.cookie = 'connected=true; path=/';
			localStorage.setItem('profile', JSON.stringify(user));
			window.location.href = '/';
		}
	};

	const callAccountVerifyScript = () => {
		/** logout the user **/
		AuthService.clearIdToken();
		AuthService.clearAccessToken();
		AuthService.clearExpiresTimestamp();
		AuthService.clearAuthorizationCode();
		/** redirect to account verify page **/
		window.location.href = '/account-verify';
	};

	return <div className={'callback-page'}></div>;
};
export const PinRedemptionRouteChecker = ({ children, SecuritiesState }) => {
	if (SecuritiesState?.hasSession && SecuritiesState.currentUser) {
		if (SecuritiesState?.PinHealthChecker.verified) {
			if (!SecuritiesState?.PinHealthChecker?.token) return <PinRedemptionFormContainer />;
			else {
				healthCheckerCallBackFunction(SecuritiesState?.PinHealthChecker?.token);
				return children;
			}
		} else return <FullScreenLoaderContainer />;
	}
};

export const GuardRoute = ({ children, location, t }) => {
	if (!AuthService.isLogout()) {
		if (AuthService.accountVerified()) {
			if (AuthService.isLoggedIn()) {
				return children;
			} else {
				return AuthService.clear_session();
			}
		} else {
			if (AuthService.accountVerified() === undefined) {
				return <FullScreenLoaderContainer />;
			} else {
				return <Navigate to={routes.securities_pages.account_verify.path} state={{ from: location }} />;
			}
		}
	} else
		return (
			<ContainerHeaderLayout hideWhiteBox>
				<UnauthorizedContainer t={t} />
			</ContainerHeaderLayout>
		);
};

export default {};
