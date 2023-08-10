import { createSlice } from '@reduxjs/toolkit';
import {
	action_diagnosis_getAll,
	action_diagnosis_getDiagnosticContent,
	action_diagnosis_getDiagnosticContentByIdContentForEvaluation,
	action_diagnosis_getDiagnosticContentEvaluation,
	action_diagnosis_getGroups,
	action_diagnosis_getInfo,
	action_diagnosis_getOneById,
	action_diagnosis_getSessions
} from '../actions';

const initialState = {
	diagnosticTestContent: [],
	diagnosisList: {
		list: [],
		searchText: '',
		searchStatus: false,
	},
	diagnostic: null,
	diagnosisInfo: null,
	diagnosisGroups: null,
	diagnosisSessions: null,
	selectedDiagnosisContent:null,
	diagnosticContentEval: [],
	orderSort: ''
};

export const diagnosisReducersSplice = createSlice({
	name: 'diagnosis',
	initialState,
	reducers: {
		setSearchText: (state, action) => {
			state.diagnosisList.searchText = action.payload
		},
		setSearchStatus: (state, action) => {
			state.diagnosisList.searchStatus = action.payload
		},
		setOrderSort: (state, action) => {
			state.orderSort = action.payload
			switch (action.payload) {
				case 'asc':
					state.diagnosisSessions.sort((a, b) => { return new Date(a.date_initialized) - new Date(b.date_initialized) })
					break;
				case 'desc':
					state.diagnosisSessions.sort((a, b) => { return new Date(b.date_initialized) - new Date(a.date_initialized) })
					break;
			}
		}

	},
	extraReducers: builder => {
		builder
			.addCase(action_diagnosis_getAll.fulfilled, (state, action) => {
				state.diagnosisList.list = action.payload;
			})
			.addCase(action_diagnosis_getOneById.fulfilled, (state, action) => {
				state.diagnostic = action.payload;
			})
			.addCase(action_diagnosis_getInfo.fulfilled, (state, action) => {
				state.diagnosisInfo = action.payload;
			})
			.addCase(action_diagnosis_getGroups.fulfilled, (state, action) => {
				state.diagnosisGroups = action.payload;
			})
			.addCase(action_diagnosis_getDiagnosticContent.fulfilled, (state, action) => {
				state.diagnosticTestContent = action.payload;
			})
			.addCase(action_diagnosis_getSessions.fulfilled, (state, action) => {
				state.diagnosisSessions = action.payload;
			})
			.addCase(action_diagnosis_getDiagnosticContentByIdContentForEvaluation.fulfilled, (state, action) => {
				state.selectedDiagnosisContent = action.payload;
			})
			.addCase(action_diagnosis_getDiagnosticContentEvaluation.fulfilled, (state, action) => {
				state.diagnosticContentEval = action.payload;
			});
	}
});
export const selectDiagnosisSession = ({ GlobalDiagnosisState }) => GlobalDiagnosisState.diagnosisSessions;
export const selectDiagnosisGroups = ({ GlobalDiagnosisState }) => GlobalDiagnosisState.diagnosisGroups
export const selectDiagnosisInfo = ({ GlobalDiagnosisState }) => GlobalDiagnosisState.diagnosisInfo
export const selectDiagnosis = ({ GlobalDiagnosisState }) => GlobalDiagnosisState.diagnosisList.list
export const selectSearchText = ({ GlobalDiagnosisState }) => GlobalDiagnosisState.diagnosisList.searchText
export const selectSearchStatus = ({ GlobalDiagnosisState }) => GlobalDiagnosisState.diagnosisList.searchStatus
export const selectDiagnosisContentEvaluation = ({GlobalDiagnosisState}) =>GlobalDiagnosisState.selectedDiagnosisContent
export const selectDiagnosticContentEvaluation = ({GlobalDiagnosisState}) => GlobalDiagnosisState.diagnosticContentEval
export const { setSearchText, setSearchStatus, setOrderSort } = diagnosisReducersSplice.actions;

export default diagnosisReducersSplice.reducer;
