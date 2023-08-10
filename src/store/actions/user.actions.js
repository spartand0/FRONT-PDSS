import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/index';
import { mapBodyToQueries } from '../../shared/helpers/properties';
import instance from '../../shared/providers/apiInstance';
const {
	API_Config: { user }
} = config;

export const action_user_getAllChild = createAsyncThunk(
	'user/getAllChild',
	async ({ userId, order_by, search_for, page, items_per_page }, { rejectWithValue }) => {
		try {
			const queries = mapBodyToQueries({ order_by, search_for, page, items_per_page });
			const response = await instance.get(user.basePath + user.getAllChild(userId) + queries);
			const results = await response.data.data;
			return results;
		} catch (error) {
			if (error?.response?.data) return rejectWithValue(error.response.data);
		}
	}
);
