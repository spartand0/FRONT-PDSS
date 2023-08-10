/* eslint-disable */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action_user_getAllChild } from '../../../store/actions';
import { selectCurrentUserId } from '../../../store/reducers/securities.reducers';
import {
	selectChildList,
	selectCurrentPage,
	selectOrderSort,
	selectSearchStatus,
	selectSearchText
} from '../../../store/reducers/user.reducer';

export default props => {
	const dispatch = useDispatch();
	const searchValue = useSelector(selectSearchText);
	const searchStatus = useSelector(selectSearchStatus);
	const orderSelected = useSelector(selectOrderSort);
	const childList = useSelector(selectChildList);
	const userId = useSelector(selectCurrentUserId);
	const currentPage = useSelector(selectCurrentPage);
	const [LocalData, setLocalData] = useState({
		data: null,
		loader: true,
		error: null
	});
	useEffect(() => {
		userId &&
			dispatch(
				action_user_getAllChild({
					userId: userId,
					order_by: orderSelected,
					search_for: searchValue,
					page: currentPage,
					items_per_page: 5
				})
			).then(() => {
				setLocalData({ data: childList, loader: false, error: null });
			});
	}, [userId, orderSelected, currentPage]);

	useEffect(() => {
		console.log('Search value here ', searchValue)
		searchStatus &&
			dispatch(
				action_user_getAllChild({
					userId: userId,
					order_by: orderSelected,
					search_for: searchValue,
					page: 1,
					items_per_page: 5
				})
			).then(() => {
				setLocalData({ data: childList, loader: false, error: null });
			});
	}, [searchStatus]);

	return {
		...LocalData
	};
};
