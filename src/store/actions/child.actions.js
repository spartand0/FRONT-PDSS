import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/index';
import routes from '../../config/routes';
import instance from '../../shared/providers/apiInstance';
import { action_user_getAllChild } from './user.actions';
const {
	API_Config: { child }
} = config;

export const action_child_create = createAsyncThunk(
	'child/create',
	async ({ userId, body, navigate }, { dispatch, rejectWithValue }) => {
		try {
			const response = await instance.post(child.basePath + child.create(userId), body);
			const results = await response.data.data;
			navigate && navigate(routes.account_pages.children.child_page.navigationPath);
			return results;
		} catch (error) {
			if (error?.response?.data) return rejectWithValue(error.response.data);
		}
	}
);
export const action_child_updateOne = createAsyncThunk(
	'child/updateOne',
	async ({ userId, childId, body, navigate }, { dispatch, rejectWithValue }) => {
		try {
			const response = await instance.patch(child.basePath + child.updateOne(childId), body);
			const results = await response.data.data;
			navigate && navigate(routes.account_pages.children.child_page.navigationPath);
			return results;
		} catch (error) {
			if (error?.response?.data) return rejectWithValue(error.response.data);
		}
	}
);
export const action_child_getOneById = createAsyncThunk(
	'child/getOneById',
	async (childId, { dispatch, rejectWithValue }) => {
		try {
			const response = await instance.get(child.basePath + child.getOne(childId));
			const results = await response.data.data;
			return results;
		} catch (error) {
			if (error?.response?.data) return rejectWithValue(error.response.data);
		}
	}
);
export const action_child_deleteOne = createAsyncThunk('child/deleteOne', async ({ userId, childId }, { dispatch }) => {
	const response = await instance.delete(child.basePath + child.delete(childId));
	const results = await response.data.data;
	dispatch(action_user_getAllChild({ userId: userId, page: 1, items_per_page: 5 }));
	return results;
});
