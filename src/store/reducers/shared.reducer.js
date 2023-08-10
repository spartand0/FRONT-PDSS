import { createSlice } from '@reduxjs/toolkit';
import { action_shared_getLanguages, action_shared_getGenders } from '../actions';
const initialState = {
	languages: null,
	genders: null
};

export const sharedReducersSplice = createSlice({
	name: 'shared',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(action_shared_getLanguages.fulfilled, (state, action) => {
				state.languages = action.payload;
			})
			.addCase(action_shared_getGenders.fulfilled, (state, action) => {
				state.genders = action.payload;
			});
	}
});

export default sharedReducersSplice.reducer;
