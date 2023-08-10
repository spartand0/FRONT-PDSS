import { configureStore } from '@reduxjs/toolkit';

import childReducer from './reducers/child.reducer';
import userReducer from './reducers/user.reducer';
import sharedReducer from './reducers/shared.reducer';
import GlobalSecuritiesSate from './reducers/securities.reducers';
import diagnosisReducer from './reducers/diagnosis.reducer';
import evaluationReducers from './reducers/evaluation.reducers';
import recordReducer from './reducers/record.reducer';
import settingsReducer from './reducers/settings.reducer';
import diagnosisExtraReducer from './reducers/diagnosisExtra.reducer';

const middlewares = [];


if (process.env.NODE_ENV === 'development') {
	const { createLogger } = require(`redux-logger`);
	const logger = createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error });
	middlewares.push(logger);
}
export const store = configureStore({
	reducer: {
		GlobalChildState: childReducer,
		GlobalUserState: userReducer,
		GlobalSharedState: sharedReducer,
		GlobalSecuritiesSate: GlobalSecuritiesSate,
		GlobalDiagnosisState: diagnosisReducer,
		GlobalDiagnosisExtraState: diagnosisExtraReducer,
		GlobalEvaluationState: evaluationReducers,
		GlobalRecordsState: recordReducer,
		GlobalSettingsState: settingsReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false
		}).concat(middlewares),
	devTools: process.env.NODE_ENV === 'development'
});
