import { createAsyncThunk } from '@reduxjs/toolkit';

import config from '../../config/index';
import routes from '../../config/routes';
import { CryptoProviders, getItemsFromCookies, mapBodyToQueries } from '../../shared/helpers/properties';
import instance from '../../shared/providers/apiInstance';

const {
	API_Config: { diagnosis }
} = config;

export const action_diagnosis_getAll = createAsyncThunk('diagnosis/getAll', async () => {
	const response = await instance.get(diagnosis.basePath + diagnosis.getAll);
	const results = await response.data.data;
	return results;
});

export const action_diagnosis_getOneById = createAsyncThunk('diagnosis/getOneById', async ({ id, session }) => {
	const response = await instance.get(diagnosis.basePath + diagnosis.getOneById(id, session));
	const results = await response.data.data?.[0];
	return results;
});

export const action_diagnosis_getInfo = createAsyncThunk('diagnosis/getInfo', async id => {
	const response = await instance.get(diagnosis.basePath + diagnosis.getInfo(id));
	const results = await response.data.data;
	return results;
});

export const action_diagnosis_getGroups = createAsyncThunk('diagnosis/getGroups', async childId => {
	const queries = mapBodyToQueries({ childId });
	const response = await instance.get(diagnosis.basePath + diagnosis.getGroups + queries);
	const results = await response.data.data;
	return results;
});

export const action_diagnosis_getSessions = createAsyncThunk(
	'diagnosis/getSessions',
	async ({ userId, childId, diagnosisId, searchFor, orderBy }) => {
		const queries = mapBodyToQueries({ childId, diagnosisId, searchFor, orderBy });
		const response = await instance.get(diagnosis.basePath + diagnosis.getSessions(userId) + queries);
		const results = await response.data.data;
		return results;
	}
);

export const action_diagnosis_deleteSession = createAsyncThunk(
	'child/deleteSession',
	async ({ sessionId, userId, childId }, { dispatch }) => {
		const response = await instance.delete(diagnosis.basePath + diagnosis.deleteSession(sessionId));
		const results = await response.data.data;
		dispatch(action_diagnosis_getSessions({ userId: userId, childId: childId.value }));
		return results;
	}
);
export const action_diagnosis_newSession = createAsyncThunk('diagnosis/newSession', async (body, { dispatch }) => {
	try {
		let diagnosisTitle = body?.diagnosticTitle;
		delete body?.diagnosticTitle;
		const response = await instance.post(diagnosis.basePath + diagnosis.newSession, body);

		if (response) {
			setTimeout(() => {
				window.open(
					`${routes.test_pages.navigationPath}?id=${body.diagnosticId}&child=${
						body.childId
					}&token=${CryptoProviders(
						JSON.stringify({
							child: body.childId,
							diagnosticId: body.diagnosticId,
							userId: body.userId,
							diagnosisTitle,
							CFToken: getItemsFromCookies('token')
						})
					).hashIt()}&session=${response.data.data?.session}`,
					'_blank',
					`toolbar=0,location=0,menubar=0,width=1025,height=751,left=${
						(window.screen.width - 1025) / 2
					},top=${(window.screen.height - 751) / 2}`
				);
			});
			dispatch(action_diagnosis_getSessions({ userId: body.userId, childId: body.childId }));
		}
	} catch (error) {
		return false;
	}
});

export const action_diagnosis_updateSession = createAsyncThunk(
	'diagnosis/updateSession',
	async ({ diagnosticItemsToUpdate, forceRefresh }, { dispatch }) => {
		try {
			let { id, body, diagnosticId, session, userId, childId } = diagnosticItemsToUpdate;
			const response = await instance.patch(diagnosis.basePath + diagnosis.updateSession(id, session), body);
			if (response) {
				dispatch(action_diagnosis_getOneById({ id: diagnosticId, session }));
				dispatch(action_diagnosis_getSessions({ userId: userId, childId: +childId }));
				forceRefresh();
			}
		} catch (error) {
			return false;
		}
	}
);

export const action_diagnosis_timer_on_close = createAsyncThunk(
	'diagnosis/updateSession',
	async (diagnosticItemsToUpdate, { dispatch }) => {
		try {
			let { id, body, session } = diagnosticItemsToUpdate;
			await instance.patch(diagnosis.basePath + diagnosis.updateSession(id, session), body);
		} catch (error) {
			return false;
		}
	}
);

export const action_diagnosis_getDiagnosticContent = createAsyncThunk(
	'diagnosis/getDiagnosticContent',
	async ({ id, session }) => {
		try {
			const response = await instance.get(diagnosis.basePath + diagnosis.getDiagnosticContent(id, session));
			return response.data.data;
		} catch (error) {
			return false;
		}
	}
);

export const action_diagnosis_storeDiagnosticTestResultBySession = createAsyncThunk(
	'diagnosis/storeDiagnosticTestResultBySession',
	async ({ contentId, body, diagnosticId, forceRefresh }, { dispatch }) => {
		try {
			const response = await instance.post(
				diagnosis.basePath + diagnosis.storeDiagnosticTestResultBySession(contentId),
				body
			);
			dispatch(
				action_diagnosis_getDiagnosticContent({
					id: diagnosticId,
					session: body.session
				})
			);

			if (response) {
				dispatch(action_diagnosis_getOneById({ id: diagnosticId, session: body.session }));
				forceRefresh();
			}
			return response.data.data;
		} catch (error) {
			return false;
		}
	}
);

export const action_diagnosis_getDiagnosticContentByIdContentForEvaluation = createAsyncThunk(
	'diagnosis/getDiagnosticContentByIdContentForEvaluation',
	async ({ id, session, contentId }) => {
		try {
			const response = await instance.get(
				diagnosis.basePath + diagnosis.getDiagnosticContentByIdContentForEvaluation(id, session, contentId)
			);
			return response.data.data;
		} catch (error) {
			return false;
		}
	}
);

export const action_diagnosis_getDiagnosticContentEvaluation = createAsyncThunk(
	'diagnosis/getDiagnosticContentEvaluation',
	async ({ id, session, contentId }) => {
		try {
			const response = await instance.get(
				diagnosis.basePath + diagnosis.getDiagnosticContentEvaluation(id, session)
			);
			return response.data.data;
		} catch (error) {
			return false;
		}
	}
);

export const action_diagnosis_storeDiagnosticTestResultBySessionForEvaluation = createAsyncThunk(
	'diagnosis/storeDiagnosticTestResultBySessionForEvaluation',
	async ({ contentId, body }, { dispatch }) => {
		try {
			const response = await instance.post(
				diagnosis.basePath + diagnosis.storeDiagnosticTestResultBySession(contentId),
				body
			);
			return response.data.data;
		} catch (error) {
			return false;
		}
	}
);
export const action_update_timer = createAsyncThunk('diagnosis/updateTimer', async seconds => ({
	payload: seconds
}));
