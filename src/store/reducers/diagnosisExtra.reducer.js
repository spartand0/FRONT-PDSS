import { createSlice } from '@reduxjs/toolkit';
import { action_update_timer } from '../actions';

const initialState = {
	seconds: 0
};

export const diagnosisExtraReducersSplice = createSlice({
	name: 'diagnosis',
	initialState,
	extraReducers: builder => {
		builder.addCase(action_update_timer.fulfilled, (state, action) => {
			state.seconds = action.payload;
		});
	}
});
export const selectSeconds = ({ GlobalDiagnosisExtraState }) => GlobalDiagnosisExtraState.seconds.payload;

export default diagnosisExtraReducersSplice.reducer;
