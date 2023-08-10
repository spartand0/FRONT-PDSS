import React, { useEffect, useState } from 'react';
import routes from '../../../config/routes';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import {
	selectOrderSort,
	selectSearchStatus,
	setOrderSort,
	setSearchStatus,
	setSearchText
} from '../../../store/reducers/user.reducer';
import PdssButtonComponent from '../../components/PdssButtonComponent';
import PdssInputComponent from '../../components/PdssInputComponent';
import PdssSelectComponent from '../../components/PdssSelectComponent';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
function ChildHeaderListContainer(props) {
	const {
		t,
		currentRouter: { navigate }
	} = props;

	const dispatch = useDispatch();
	const [query, setQuery] = useState('');
	const searchStatus = useSelector(selectSearchStatus);
	const orderSelected = useSelector(selectOrderSort);
	const handleChangeSearch = event => {
		setQuery(event.target.value);
	};
	//update store with new search text
	const handleUpdateSearch = _.debounce(searchText => {
		//reset search status to false after click on search button
		if (searchStatus) {
			dispatch(setSearchStatus(false));
			dispatch(setSearchText(searchText));
		} else dispatch(setSearchText(searchText));
	}, 500);
	useEffect(() => {
		handleUpdateSearch(query);
		return () => handleUpdateSearch.cancel();
	}, [query]);
	const handleSearchAction = event => {
		event.preventDefault();
		if (!searchStatus) {
			dispatch(setSearchStatus(true));
		}
	};
	const handleChangeOrder = event => {
		event.preventDefault();
		dispatch(setOrderSort(event.target.value));
	};

	return (
		<div className="grid-x grid-margin-x item-filter">
			<PdssSelectComponent
				label={t('child_label_sort_by')}
				selectedValue={orderSelected}
				selectOption={[
					{
						value: 'child.created desc ',
						label: t('child_sortBy_createdDesc')
					},
					{
						value: 'child.created asc ',
						label: t('child_sortBy_createdAsc')
					},
					{
						value: 'child.lastname desc ',
						label: t('child_sortBy_lastnameDesc')
					},
					{
						value: 'child.lastname asc ',
						label: t('child_sortBy_lastnameAsc')
					}
				]}
				clickToAction={handleChangeOrder}
			/>
			<form onSubmit={handleSearchAction} className="cell medium-4">
				<PdssInputComponent
					label={t('child_label_search_by')}
					display="true"
					changeAction={handleChangeSearch}
					clickToAction={handleSearchAction}
					value={query}
					iconClassName="search"
					type="text"
					placeholder=""
					additionalClass="cell medium-4"
				/>
			</form>
			<PdssButtonComponent
				title={t('child_headline_new')}
				display="true"
				clickToAction={() => navigate(routes.account_pages.children.child_page.children.create_child_page.path)}
			/>
		</div>
	);
}

export default WithRouter(ChildHeaderListContainer);
