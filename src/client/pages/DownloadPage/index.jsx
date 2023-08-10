import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import files from '../../../shared/downloadFiles';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import { setTemplateHideBox, setTemplateTitle } from '../../../store/reducers/settings.reducer';
import DownloadFilesListComponent from '../../components/DownloadFilesListComponent';

function DownloadPage(props) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTemplateTitle(props.t('downloads')));
		dispatch(setTemplateHideBox(false));
	}, []);

	return (
		<div className="padding" id="downloads">
			<DownloadFilesListComponent t={props.t} files={files} />
		</div>
	);
}
export default WithRouter(DownloadPage);
