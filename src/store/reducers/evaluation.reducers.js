import { createSlice } from '@reduxjs/toolkit';
import {
	action_evaluation_getAll,
	action_evaluation_getResultScore,
	action_evaluation_getDataToExport,
	action_evaluation_getArticulations,
	action_evaluation_getGrammars,
	action_evaluation_getGrammarNotes
} from '../actions'; 
const initialState = {
	analysesList: null,
	analysisResult: null,
	currentTab: 1,
	analysisScores: null,
	analysisGrammarScores: null,
	articulations: null,
	grammarNotes: ''
};

export const evaluationReducersSplice = createSlice({
	name: 'evaluation',
	initialState,
	reducers: {
		setCurrentTab: (state, action) => {
			state.currentTab = action.payload;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(action_evaluation_getAll.fulfilled, (state, action) => {
				state.analysesList = action.payload;
			})
			.addCase(action_evaluation_getResultScore.fulfilled, (state, action) => {
				state.analysisResult = action.payload;
			})
			.addCase(action_evaluation_getDataToExport.fulfilled, (state, action) => {
				state.analysisScores = action.payload;
			})
			.addCase(action_evaluation_getArticulations.fulfilled, (state, action) => {
				state.articulations = action.payload;
			})
			.addCase(action_evaluation_getGrammars.fulfilled, (state, action) => {
				state.analysisGrammarScores = action.payload;
			})
			.addCase(action_evaluation_getGrammarNotes.fulfilled, (state, action) => {
				state.grammarNotes = action.payload;
			});
	}
});
export const selectAnalysisResult = ({ GlobalEvaluationState }) => GlobalEvaluationState.analysisResult;
export const selectAnalysesList = ({ GlobalEvaluationState }) => GlobalEvaluationState.analysesList;
export const selectDataToExport = ({ GlobalEvaluationState }) => GlobalEvaluationState.analysisScores;
export const selectArticulations = ({ GlobalEvaluationState }) => GlobalEvaluationState.articulations;
export const selectCurrentTab = ({ GlobalEvaluationState }) => GlobalEvaluationState.currentTab;
export const selectGrammars = ({ GlobalEvaluationState }) => GlobalEvaluationState.analysisGrammarScores;
export const selectGrammarNotes = ({ GlobalEvaluationState }) => GlobalEvaluationState.grammarNotes;

export const { setCurrentTab } = evaluationReducersSplice.actions;
export default evaluationReducersSplice.reducer;
