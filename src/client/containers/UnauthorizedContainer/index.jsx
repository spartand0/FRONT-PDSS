import React from 'react';
import { Link } from 'react-router-dom';
import AuthServices from '../../../security/services/AuthService';

export default function UnauthorizedContainer({ t }) {
	const openLoginPage = () => {
		AuthServices.login();
	};
	return (
		<div id="login">
			<fieldset>
				<h2>{t('unauthorized_container_title')}</h2>
				<Link className="button" onClick={openLoginPage}>
					{t('unauthorized_container_btn_title')}
				</Link>
			</fieldset>
		</div>
	);
}
