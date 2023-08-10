import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from '@reduxjs/toolkit';
import { Controller } from 'react-hook-form';
import moment from 'moment';

import * as Actions from '../../../store/actions';
import PdssTitle from '../PdssTitleComponent/PdssTitle';
import usePdssForm from './usePdssForm';
import PdssSelectMultiComponent from '../PdssSelectMultipleComponent';

function PdssFormComponent(props) {
	const { t, childState, form_action_edit } = props;
	const child = childState.selectedChildDetails?.[0] ? childState.selectedChildDetails[0] : null;

	const {
		genders,
		languages,
		onSubmit,
		FormController: {
			handleSubmit,
			control,
			clearErrors,
			reset,
			setValue,
			formState: { errors }
		},
		handleCancelForm
	} = usePdssForm(props);

	useEffect(() => {
		clearErrors();
	}, []);
	useEffect(() => {
		if (childState.selectedChildDetails && form_action_edit) reset({ ...child, birthDay: child?.birthdate });
	}, [childState.selectedChildDetails]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid-x grid-margin-x">
				<PdssTitle title={t('sub_headline_child_information')} />
				<div className="cell medium-4 required">
					<p className="label">{t('child_label_gender')}</p>

					<Controller
						control={control}
						name="gender"
						render={({ field }) => (
							<div className="value">
								<select {...field} id="gender" className={errors?.gender ? 'is-invalid-input' : ''}>
									<option value="">{t('child_label_please_select')}</option>
									{genders &&
										genders.map(gender => {
											return (
												<option key={gender.id} value={gender.id}>
													{gender.name}
												</option>
											);
										})}
								</select>
								{errors?.gender && (
									<p className="label" style={{ color: 'red' }}>
										{errors?.gender?.message}
									</p>
								)}
							</div>
						)}
					/>
				</div>
			</div>
			<div className="grid-x grid-margin-x">
				<div className="cell medium-6 required">
					<p className="label">{t('child_label_firstName')}</p>
					<Controller
						control={control}
						name="firstName"
						render={({ field }) => (
							<p className="value">
								<input
									{...field}
									id="firstname"
									type="text"
									className={errors?.firstName ? 'is-invalid-input' : ''}
								/>
								{errors?.firstName?.message && (
									<p className="label" style={{ color: 'red' }}>
										{errors?.firstName?.message}
									</p>
								)}
							</p>
						)}
					/>
				</div>
				<div className="cell medium-6 required">
					<p className="label">{t('child_label_lastName')}</p>
					<Controller
						control={control}
						name="lastName"
						render={({ field }) => (
							<p className="value">
								<input
									{...field}
									id="lastname"
									type="text"
									className={errors?.lastName?.message ? 'is-invalid-input' : ''}
								/>
								{errors?.lastName?.message && (
									<p className="label" style={{ color: 'red' }}>
										{errors?.lastName?.message}
									</p>
								)}
							</p>
						)}
					/>
				</div>
				<div className="cell medium-6 required">
					<p className="label">{t('child_label_birthday')}</p>
					<Controller
						control={control}
						name="birthDay"
						render={({ field }) => (
							<p className="value">
								<input
									{...field}
									placeholder="yyyy-mm-dd"
									id="birthdate"
									type="date"
									max={moment(new Date()).format('YYYY-MM-DD')}
									className={errors?.birthDay?.message ? 'is-invalid-input' : ''}
								/>
								{errors?.birthDay && (
									<p className="label" style={{ color: 'red' }}>
										{errors?.birthDay?.message}
									</p>
								)}
							</p>
						)}
					/>
				</div>

				<div className="cell medium-6 required ">
					<p className="label">{t('child_label_languages')}</p>
					<PdssSelectMultiComponent
						clearErrors={clearErrors}
						t={t}
						languages={languages}
						control={control}
						errors={errors}
						setValue={setValue}
						form_action_edit={form_action_edit}
						child={child}
					/>
				</div>
				<div className="cell">
					<p className="label">{t('child_label_other')}</p>
					<Controller
						control={control}
						name="other"
						render={({ field }) => (
							<p className="value">
								<input {...field} id="other" type="text" />
							</p>
						)}
					/>
				</div>
			</div>
			<div className="grid-x">
				<div className="cell small-6">
					<button type="button" className="button grey" onClick={handleCancelForm}>
						{t('child_btn_cancel')}{' '}
					</button>
				</div>
				<div className="cell small-6 text-right">
					<button type="submit" className="button save ">
						{t('child_btn_save')}{' '}
					</button>
				</div>
			</div>
		</form>
	);
}
PdssFormComponent.prototype = {
	action_user_getAllChild: PropTypes.func.isRequired,
	action_child_create: PropTypes.func.isRequired,
	action_child_updateOne: PropTypes.func.isRequired,
	action_child_getOneById: PropTypes.func.isRequired,
	action_shared_getGenders: PropTypes.func.isRequired,
	action_shared_getLanguages: PropTypes.func.isRequired,
	childState: PropTypes.object,
	userState: PropTypes.object,
	sharedState: PropTypes.object,
	SecuritiesState: PropTypes.object
};
const mapStateToProps = state => ({
	childState: state.GlobalChildState,
	sharedState: state.GlobalSharedState,
	SecuritiesState: state.GlobalSecuritiesSate,
	userState: state.GlobalUserState
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(PdssFormComponent);
