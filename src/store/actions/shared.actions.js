import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/index';
import instance from '../../shared/providers/apiInstance';
const {
	API_Config: { shared }
} = config;

export const action_shared_getLanguages = createAsyncThunk('shared/getLanguages', async () => {
	const response = await instance.get(shared.basePath + shared.languages);
	const results = await response.data.data;
	return results;
});
export const action_shared_getGenders = createAsyncThunk('shared/getGenders', async () => {
	const response = await instance.get(shared.basePath + shared.genders);
	const results = await response.data.data;
	return results;
});
