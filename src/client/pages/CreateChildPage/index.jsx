import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import { setTemplateHideBox, setTemplateTitle } from '../../../store/reducers/settings.reducer';
import PdssFormComponent from '../../components/PdssFormComponent';

function CreateChildPage(props) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTemplateTitle(props.t('child_headline')));
		dispatch(setTemplateHideBox(false));
	}, []);

	return (
		<div className="padding">
			<PdssFormComponent {...props} />
		</div>
	);
}

export default WithRouter(CreateChildPage);
