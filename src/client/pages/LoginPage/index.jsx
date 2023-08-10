import React, { useEffect } from 'react';
import AuthServices from '../../../security/services/AuthService';

const LoginPage = props => {
	useEffect(() => {
		if (
			!localStorage.getItem('authorization_code') ||
			!localStorage.getItem('access_token') ||
			!localStorage.getItem('expires_in') ||
			!localStorage.getItem('profile')
		) {
			AuthServices.login();
		}
	}, []);

	return <div className={'login-page'}></div>;
};

export default LoginPage;
