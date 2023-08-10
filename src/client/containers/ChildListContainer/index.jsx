import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import { action_child_deleteOne } from '../../../store/actions';
import ChildItemComponent from '../../components/ChildItemComponent';
import PdssConfirmPopup from '../../components/PdssConfirmPopupComponent';

import { selectCurrentUserId } from '../../../store/reducers/securities.reducers';
import { selectChildList } from '../../../store/reducers/user.reducer';
import { t } from 'i18next';
function ChildListContainer() {
	const dispatch = useDispatch();
	const [deleteChild, setDeleteChild] = useState({
		show: false,
		selectedChild: null
	});
	const currentUserId = useSelector(selectCurrentUserId);
	const childList = useSelector(selectChildList);

	const showPopup = data => {
		setDeleteChild({
			show: true,
			selectedChild: data
		});
	};

	const closePopup = () => {
		setDeleteChild({
			show: false,
			selectedChild: null
		});
	};

	const ConfirmPopup = () => {
		dispatch(
			action_child_deleteOne({
				userId: currentUserId,
				childId: deleteChild.selectedChild
			})
		);
		setDeleteChild({ show: false, selectedChild: null });
	};

	return (
		<>
			{childList.data?.length === 0 ? (
				<div className="padding">{t('child_data_empty')} </div>
			) : (
				<ul className="items">
					<PdssConfirmPopup
						ConfirmPopup={ConfirmPopup}
						closePopup={closePopup}
						title={t('child_confirm_delete_title')}
						description={t('child_confirm_delete')}
						show={deleteChild.show}
					/>

					{childList.data?.map((child) => {
						return <ChildItemComponent key={child.id} child={child} showPopup={showPopup} t={t} />;
					})}
				</ul>
			)}
		</>
	);
}

export default WithRouter(ChildListContainer);
