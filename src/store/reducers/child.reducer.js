import { createSlice } from '@reduxjs/toolkit';
import { action_child_getOneById } from '../actions';
const initialState = {
	selectedChildDetails: null
};

export const childReducersSplice = createSlice({
	name: 'child',
	initialState,
	reducers: {
		setSelectedChildDetails: (state, action) => {
			state.selectedChildDetails = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(action_child_getOneById.fulfilled, (state, action) => {
			state.selectedChildDetails = action.payload;
		});
	}
});
export const selectChildDetails = ({ GlobalChildState }) => GlobalChildState.selectedChildDetails;
export const { setSelectedChildDetails } = childReducersSplice.actions;
export default childReducersSplice.reducer;
