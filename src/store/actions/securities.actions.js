import { createAsyncThunk } from '@reduxjs/toolkit';

import config from '../../config';
import API from '../../shared/providers/apiInstance';
import { getUserAuthProfileItem, getUserSUBId } from '../../shared/helpers/properties';

const { API_Config } = config;

export const action_securities_updateProfile = createAsyncThunk(
	'securities/updateProfile',
	async (body, { dispatch }) => {
		try {
			const response = await API.patch(
				API_Config.AUTH0_API.BASE_URL + API_Config.AUTH0_API.endpoints.user.update_metaData(getUserSUBId()),
				body
			);

			dispatch(
				action_securities_insertIfDoesNotExist({
					sub: getUserAuthProfileItem('sub'),
					accepted_terms: 'yes'
				})
			);
			return response?.data?.user_metadata;
		} catch (error) {
			console.log(error);
		}
	}
);

export const action_securities_insertIfDoesNotExist = createAsyncThunk(
	'securities/insetUserIfDoesNotExist',
	async (body, { dispatch }) => {
		try {
			const response = await API.post(API_Config.user.basePath, body);
			dispatch(action_securities_GetServerAuthUser(getUserAuthProfileItem('sub')));
			return response?.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const action_securities_GetServerAuthUser = createAsyncThunk(
	'securities/action_user_GetServerAuthUser',
	async (sub, { dispatch }) => {
		try {
			const response = await API.get(API_Config.user.basePath + API_Config.user.getOneBySub(sub));
			return response?.data?.data;
		} catch (error) {
			console.log(error);
			if (error?.response?.data?.status == 451 && sub)
				dispatch(action_securities_insertIfDoesNotExist({ sub, accepted_terms: 'yes' }));
		}
	}
);

export const action_securities_GetUserTokenByISBNCode = createAsyncThunk(
	'securities/action_user_GetUserTokenByISBNCode',
	async (sub, { rejectWithValue }) => {
		try {
			const response = await API.post(
				API_Config.HealthCare_API.GenerateHealthCareBaseUrl(sub) +
					API_Config.HealthCare_API.endpoints.token_request,
				{
					pubId: API_Config.HealthCare_API.ISBN
				}
			);

			return response?.data;
		} catch (error) {
			if (error?.response?.data) return rejectWithValue(error.response.data);
		}
	}
);

export const action_securities_SubmitPinRedemption = createAsyncThunk(
	'securities/action_securities_SubmitPinRedemption',
	async ({ sub, pinCode }, { dispatch, rejectWithValue }) => {
		try {
			const response = await API.post(
				API_Config.HealthCare_API.GenerateHealthCareBaseUrl(sub) +
					API_Config.HealthCare_API.endpoints.pin_request,
				{
					pin: pinCode
				}
			);

			return response?.data?.data;
		} catch (error) {
			if (error?.response?.data) return rejectWithValue(error.response.data);
		}
	}
);
