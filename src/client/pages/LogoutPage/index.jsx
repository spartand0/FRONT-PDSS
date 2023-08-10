/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AuthService from '../../../security';
import { clearCurrentSession } from '../../../store/reducers/securities.reducers';

const LogoutPage = props => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (
			localStorage.getItem('authorization_code') &&
			localStorage.getItem('access_token') &&
			localStorage.getItem('expires_in') &&
			localStorage.getItem('profile')
		) {
			dispatch(clearCurrentSession());
			AuthService.logout();
		}
	}, []);

	return <div className={'logout-page'}></div>;
};

export default LogoutPage;
