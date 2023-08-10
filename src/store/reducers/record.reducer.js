import { createSlice } from '@reduxjs/toolkit';
import {
	action_record_getAllBySession,
} from '../actions';

const initialState = {
	recordsList: null,
};

export const recordsReducersSplice = createSlice({
	name: 'records',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(action_record_getAllBySession.fulfilled, (state, action) => {
				state.recordsList = action.payload;
			})
	}
});

export const selectRecords = ({ GlobalRecordsState }) => GlobalRecordsState.recordsList;
export default recordsReducersSplice.reducer;
