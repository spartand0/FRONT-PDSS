import PropTypes from 'prop-types';

import { usePinRedemption } from '../../../security/services/PinRedemption';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';

const PinRedemptionFormContainer = props => {
	const { t, GlobalSecuritiesSate } = props;

	const { EspPinState, onSubmit } = usePinRedemption(props);
	return !GlobalSecuritiesSate?.PinHealthChecker?.submitPinCode?.submitted ? (
		<form
			onSubmit={onSubmit}
			id="enter_pin"
			className={` ${
				(GlobalSecuritiesSate.PinHealthChecker.submitPinCode?.hasErrors ||
					(EspPinState?.errors && Object.keys(EspPinState?.errors).length > 0)) &&
				'  show-error'
			}`}
		>
			<div className="request">
				<div className="padding">
					<div className="grid-x grid-margin-x">
						<div className="cell text-center">
							<div className="callout warning">
								<p>{t('pinredemption_form_warning_description')}</p>
							</div>
							<div className="callout alert">
								{GlobalSecuritiesSate.PinHealthChecker.submitPinCode?.hasErrors
									? GlobalSecuritiesSate.PinHealthChecker.submitPinCode?.hasErrors?.pinCode
									: t('pinredemption_form_error_description')}
							</div>
						</div>
					</div>
				</div>
				<div className="padding">
					<div className="input-group">
						<input
							className={`input-group-field ${EspPinState?.errors?.pinCode ? '  is-invalid-input' : ' '}`}
							type="text"
							id="pincode"
							name="pinCode"
							placeholder={t('pinredemption_form_placeholder')}
						/>
						<div className="input-group-button">
							<input type="submit" className="button" value={t('pinredemption_form_submit_btn_text')} />
						</div>
					</div>
				</div>
			</div>
		</form>
	) : (
		<div className="response">
			<div className="padding">
				<div className="grid-x grid-margin-x">
					<div className="cell text-center">
						<div className="callout success">
							<p>{t('pinredemption_form_success_description')}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

PinRedemptionFormContainer.prototype = {
	action_securities_SubmitPinRedemption: PropTypes.func.isRequired
};

export default WithReduxConnector(WithRouter(PinRedemptionFormContainer), state => ({
	GlobalSecuritiesSate: state.GlobalSecuritiesSate
}));
