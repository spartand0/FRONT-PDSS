import { UserManager } from 'oidc-client';
import { deleteCookies } from '../../shared/helpers/properties';
import config from '../../config';
const AUTHORIZATION_CODE_KEY = 'authorization_code';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const EXPIRES_IN = 'expires_in';
const OIDCClient = new UserManager(config.securitiesConfig);

// login user
const login = () => {
	OIDCClient.signinRedirect();
};
// get the user info
const getUserInfo = () => {
	/** get user info */
	return OIDCClient.getUser();
};
// signing Redirect Callback
const signinRedirectCallback = () => {
	return OIDCClient.signinRedirectCallback();
};

const getParameterByName = name => {
	const url = new URL(window.location.href.replace('#', '?'));
	return url.searchParams.get(name);
};

// get and store id_token in local storage
const setIdToken = idToken => {
	if (idToken) {
		localStorage.setItem(ID_TOKEN_KEY, idToken);
	}
};

// get and store access_token in local storage
const setAccessToken = accessToken => {
	if (accessToken) {
		localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
	}
};

// get and store expire_in in local storage
const setExpiresIn = expiresIn => {
	const sessionWillExpiresIn = 2;
	if (expiresIn) {
		const dateExpiresIn = new Date();
		const _expiresIn = parseInt(expiresIn) - parseInt(sessionWillExpiresIn) * 60;
		const _dateExpiresIn = new Date(dateExpiresIn.getTime() + _expiresIn * 1000);
		localStorage.setItem(EXPIRES_IN, _dateExpiresIn.getTime());
	}
};
// get and store authorization_code in local storage
const setAuthorizationCode = authorizationCode => {
	if (authorizationCode) {
		localStorage.setItem(AUTHORIZATION_CODE_KEY, authorizationCode);
	}
};

// logout user
const clear_session = () => {
	clearIdToken();
	clearAccessToken();
	clearExpiresTimestamp();
	clearAuthorizationCode();
	deleteCookies();
	localStorage.clear();
	sessionStorage.clear();
	if (localStorage.getItem('profile') !== null) {
		localStorage.removeItem('profile');
	}
};
const logout = () => {
	clear_session();
	window.location.href =
		'https://' +
		process.env.REACT_APP_CLIENT_DOMAIN +
		'/v2/logout?returnTo=' +
		window.location.origin +
		'&client_id=' +
		process.env.REACT_APP_CLIENT_ID;
};

const clearIdToken = () => {
	localStorage.removeItem(ID_TOKEN_KEY);
};

const clearAccessToken = () => {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
};
const clearExpiresTimestamp = () => {
	localStorage.removeItem(EXPIRES_IN);
};
const clearAuthorizationCode = () => {
	localStorage.removeItem(AUTHORIZATION_CODE_KEY);
};

// check if the user is loggedIn
const isLoggedIn = () => {
	const dateExpires = localStorage.getItem('expires_in');
	const currentDate = new Date();
	if (
		localStorage.getItem(AUTHORIZATION_CODE_KEY) &&
		localStorage.profile &&
		localStorage.getItem(ID_TOKEN_KEY) &&
		localStorage.getItem(ACCESS_TOKEN_KEY)
	)
		if (dateExpires) {
			return parseInt(dateExpires) < currentDate.getTime() ? false : true;
		} else {
			return false;
		}
	return false;
};

// check if the user has verified the email
const accountVerified = () => {
	if (localStorage.profile) {
		const userInfo = JSON.parse(localStorage.profile);
		return userInfo?.email_verified;
	}
};

// check is logout and there is no session
const isLogout = () => {
	return (
		!localStorage.getItem(AUTHORIZATION_CODE_KEY) &&
		!localStorage.getItem(EXPIRES_IN) &&
		!localStorage.getItem(ID_TOKEN_KEY) &&
		!localStorage.getItem(ACCESS_TOKEN_KEY)
	);
};

// load current user Info
OIDCClient.events.addUserLoaded(user => {
	// set the current user in localStorage
	setIdToken(user.id_token);
	setAccessToken(user.access_token);
	setExpiresIn(user.expires_in);
	localStorage.setItem('profile', JSON.stringify(user.profile));
});
isLoggedIn() &&
	OIDCClient.events.addSilentRenewError(function (e) {
		console.log('silent renew error', e.message);
		logout();
	});

const AuthServices = {
	login,
	getUserInfo,
	clear_session,
	signinRedirectCallback,
	getParameterByName,
	setIdToken,
	setAccessToken,
	setExpiresIn,
	setAuthorizationCode,
	logout,
	isLoggedIn,
	accountVerified,
	isLogout,
	clearIdToken,
	clearAccessToken,
	clearExpiresTimestamp,
	clearAuthorizationCode
};
export default AuthServices;
