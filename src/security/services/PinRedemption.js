import { useState } from 'react';

import config from '../../config';

export const healthCheckerCallBackFunction = token => {
	let expiresIn = new Date();
	expiresIn.setTime(expiresIn.getTime() + config.API_Config.HealthCare_API.cookies.expiresIn * 60 * 1000);
	document.cookie =
		config.API_Config.HealthCare_API.cookies.name + '=' + token + '; expires=' + expiresIn + '; path=/';
};
export const usePinRedemption = props => {
	const { action_securities_SubmitPinRedemption, GlobalSecuritiesSate } = props;

	const [EspPinState, setEspPinState] = useState({
		errors: null,
		data: null,
		loading: null
	});

	const onSubmit = e => {
		e.preventDefault();
		if (!e.target.elements.pinCode.value || e.target.elements?.pinCode?.value?.trim()?.length === 0)
			return setEspPinState(prev => ({
				...prev,
				errors: {
					pinCode: 'required field '
				}
			}));
		else {
			GlobalSecuritiesSate?.currentUser?.sub &&
				action_securities_SubmitPinRedemption({
					sub: GlobalSecuritiesSate?.currentUser.sub,
					pinCode: e.target.elements?.pinCode?.value
				});
		}
	};

	return {
		onSubmit,
		EspPinState
	};
};
