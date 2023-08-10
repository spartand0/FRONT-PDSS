import { createSlice } from '@reduxjs/toolkit';
import { action_user_getAllChild } from '../actions';
const initialState = {
	childList: {
		data: [],
		searchText: '',
		order: 'child.created desc',
		searchStatus: false,
		currentPage: 1
	}
};

export const userReducersSplice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentPage: (state,action) => {
			state.childList.currentPage = action.payload
		},
		setSearchText: (state, action) => {
			state.childList.searchText = action.payload;
		},
		setOrderSort: (state, action) => {
			state.childList.order = action.payload;
		},
		setSearchStatus: (state, action) => {
			state.childList.searchStatus = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(action_user_getAllChild.fulfilled, (state, action) => {
			state.childList.data = action.payload;
		});
	}
});

export const selectChildList = ({ GlobalUserState }) => GlobalUserState.childList.data
export const { setSearchText, setOrderSort, setSearchStatus, setCurrentPage } = userReducersSplice.actions
export const selectSearchText = ({ GlobalUserState }) => GlobalUserState.childList.searchText;
export const selectOrderSort = ({ GlobalUserState }) => GlobalUserState.childList.order
export const selectSearchStatus = ({ GlobalUserState }) => GlobalUserState.childList.searchStatus
export const selectCurrentPage = ({GlobalUserState}) => GlobalUserState.childList.currentPage
export default userReducersSplice.reducer;
