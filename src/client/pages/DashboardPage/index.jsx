import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setTemplateHideBox, setTemplateTitle } from '../../../store/reducers/settings.reducer';
import DashboardCardListContainer from '../../containers/DashboardCardListContainer';

export default function DashboardPage(props) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTemplateTitle(props.t('dashboard')));
		dispatch(setTemplateHideBox(true));
	}, []);
	return (
		<div className="content" id="dashboard">
			<div className="grid-container">
				<DashboardCardListContainer t={props.t} />
			</div>
		</div>
	);
}
