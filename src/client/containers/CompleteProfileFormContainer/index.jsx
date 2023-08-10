import React from 'react';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';
import GenericModalLayout from '../../layouts/GenericModalLayout';
import useCompleteProfile from './useCompleteProfile';
import PropTypes from 'prop-types';

const CompleteProfileFormContainer = props => {
	const { t, GlobalSecuritiesSate } = props;
	const {
		onSubmit,
		setUserMetaDataVerified,
		FormController: {
			handleSubmit,
			register,
			formState: { errors }
		}
	} = useCompleteProfile(props);

	return (
		<GenericModalLayout
			title={t('complete_profile_modal_title')}
			open={GlobalSecuritiesSate?.userMetaDataVerified.modal}
		>
			{!GlobalSecuritiesSate?.userMetaDataVerified.status ? (
				<form
					id="register"
					className={'' + Object?.keys(errors).length > 0 && 'show-error'}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="request">
						<div className="padding">
							<div className="grid-x grid-margin-x">
								<div className="cell">
									<p>{t('complete_profile_modal_header')}</p>
									<div className="callout alert">{t('complete_profile_modal_header_error')}</div>
								</div>
								<div className="cell required">
									<p className="label">{t('complete_profile_modal_input_firstName')}</p>
									<p className="value">
										<input
											className={errors?.firstName && ' is-invalid-input'}
											{...register('firstName')}
											type="text"
											id="firstName"
										/>
									</p>
								</div>
								<div className="cell required">
									<p className="label">{t('complete_profile_modal_input_lastName')}</p>
									<p className="value">
										<input
											className={errors?.lastName && ' is-invalid-input'}
											{...register('lastName')}
											type="text"
											id="lastName"
										/>
									</p>
								</div>
								<div className="cell required">
									<input
										className={errors?.acceptedTerms && ' is-invalid-input'}
										{...register('acceptedTerms')}
										type="checkbox"
										id="accepted_terms"
									/>
									<label htmlFor="accepted_terms">
										{t('complete_profile_modal_input_acceptTerms_par_1')}{' '}
										<a
											href={`${process.env.REACT_APP_S3_ENDPOINT}/files/pdf/PDSS_TC_DPA.pdf`}
											target="_blank"
										>
											{t('complete_profile_modal_input_acceptTerms_par_2')}
										</a>{' '}
										{t('complete_profile_modal_input_acceptTerms_par_3')}
									</label>
								</div>
								<div className="cell">
									<input
										type="submit"
										className="button"
										value={t('complete_profile_modal_input_submit')}
									/>
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
									<h2>{t('complete_profile_modal_response_header')}</h2>
									<p>{t('complete_profile_modal_response_body')}</p>
									<a className="button fullsize" onClick={() => setUserMetaDataVerified()}>
										{t('complete_profile_modal_response_link')}
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</GenericModalLayout>
	);
};
CompleteProfileFormContainer.prototype = {
	action_securities_updateProfile: PropTypes.func.isRequired,
	GlobalSecuritiesSate: PropTypes.object.isRequired
};
export default WithReduxConnector(WithRouter(CompleteProfileFormContainer), ({ GlobalSecuritiesSate }) => ({
	GlobalSecuritiesSate
}));
