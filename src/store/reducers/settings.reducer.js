import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	title: '',
    hideBox:false
};

export const SettingsReducersSplice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setTemplateTitle: (state, action) => {
			state.title = action.payload;
		},
        setTemplateHideBox:(state,action)=> {
            state.hideBox = action.payload        }
	},
});
export const selectTemplateTitle = ({ GlobalSettingsState }) => GlobalSettingsState.title;
export const selectTemplateHideBox = ({ GlobalSettingsState }) => GlobalSettingsState.hideBox;
export const { setTemplateTitle,setTemplateHideBox } = SettingsReducersSplice.actions;
export default SettingsReducersSplice.reducer;
