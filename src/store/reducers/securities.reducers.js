import { createSlice } from '@reduxjs/toolkit';
import {
	action_securities_updateProfile,
	action_securities_insertIfDoesNotExist,
	action_securities_GetServerAuthUser,
	action_securities_GetUserTokenByISBNCode,
	action_securities_SubmitPinRedemption
} from '../actions';

const initialState = {
	userId: null,
	currentUser: null,
	userMetaDataVerified: {
		status: true,
		modal: false
	},
	PinHealthChecker: {
		created_at: null,
		expires_in: null,
		token: null,
		verified: null,
		submitPinCode: {
			submitted: false,
			hasErrors: null
		}
	},

	hasSession: false
};

export const securitiesSlice = createSlice({
	name: 'securities',
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			if (localStorage.profile) {
				let profile = JSON.parse(localStorage.profile);
				let { given_name, family_name } = profile;
				state.currentUser = JSON.parse(localStorage.profile);
				if (!(given_name?.length > 0 && family_name.length > 0)) {
					state.userMetaDataVerified = {
						status: false,
						modal: true
					};
				}
				state.hasSession = true;
			}
			return state;
		},
		updateCurrentUserMetaData: (state, action) => {
			const { given_name, family_name } = action;
			if (given_name && family_name) {
				state.currentUser = {
					...JSON.parse(localStorage.profile),
					given_name,
					family_name
				};
			}
			return state;
		},
		clearCurrentSession: (state, action) => {
			state.currentUser = null;
			state.hasSession = false;
			return state;
		},
		clearMetaDataProcess: (state, action) => {
			state.userMetaDataVerified = {
				status: true,
				modal: false
			};
			return state;
		},
		clearHealthCareSubmittedProcess: (state, action) => {
			state.PinHealthChecker = {
				created_at: null,
				expires_in: null,
				token: null,
				verified: null,
				submitPinCode: {
					submitted: false,
					hasErrors: null
				}
			};
			return state;
		},
		//?? We gonna set only user id for the moment
		setCurrentUserServerNeededCredentials: (state, action) => {
			state.userId = action.payload.userId;
			return state;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(action_securities_updateProfile.fulfilled, (state, action) => {
				const { given_name, family_name } = action.payload;
				if (given_name && family_name) {
					state.userMetaDataVerified = {
						status: true,
						modal: true
					};
					let newMetaData = {
						...JSON.parse(localStorage.profile),
						given_name,
						family_name
					};
					localStorage.setItem('profile', JSON.stringify(newMetaData));
					state.currentUser = {
						...state.currentUser,
						...newMetaData
					};
				}
				return state;
			})
			.addCase(action_securities_insertIfDoesNotExist.fulfilled, (state, action) => {
				let { userId } = action.payload;
				state.userId = userId;
				return state;
			})
			.addCase(action_securities_GetServerAuthUser.fulfilled, (state, action) => {
				state.userId = action.payload?.id;
				return state;
			})
			.addCase(action_securities_GetUserTokenByISBNCode.fulfilled, (state, action) => {
				state.PinHealthChecker = {
					created_at: action.payload?.created_at,
					expires_in: action.payload?.expires_in,
					token: action.payload?.token,
					verified: true,
					submitPinCode: {
						hasErrors: null,
						submitted: null
					}
				};

				return state;
			})
			.addCase(action_securities_GetUserTokenByISBNCode.rejected, (state, action) => {
				state.PinHealthChecker = {
					...state.PinHealthChecker,
					verified: true
				};

				return state;
			})
			.addCase(action_securities_SubmitPinRedemption.fulfilled, (state, action) => {
				state.PinHealthChecker.submitPinCode.hasErrors = null;
				state.PinHealthChecker.submitPinCode.submitted = true;
				return state;
			})
			.addCase(action_securities_SubmitPinRedemption.rejected, (state, action) => {
				state.PinHealthChecker.submitPinCode.hasErrors = { pinCode: action.payload?.message };
				state.PinHealthChecker.submitPinCode.submitted = false;
				return state;
			});
	}
});
export const selectCurrentUserId = ({GlobalSecuritiesSate}) => GlobalSecuritiesSate.userId
export const selectCurrentUserSecurities = ({GlobalSecuritiesSate}) => GlobalSecuritiesSate
export const {
	setCurrentUser,
	clearCurrentSession,
	updateCurrentUserMetaData,
	clearMetaDataProcess,
	clearHealthCareSubmittedProcess,
	setCurrentUserServerNeededCredentials
} = securitiesSlice.actions;
export default securitiesSlice.reducer;
