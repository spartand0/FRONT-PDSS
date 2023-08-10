import React, { useEffect, useState } from 'react';
import PdssSelectComponent from '../../components/PdssSelectComponent';
import PdssInputComponent from '../../components/PdssInputComponent';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchStatus, setOrderSort, setSearchStatus, setSearchText } from '../../../store/reducers/diagnosis.reducer';
import _ from 'lodash';
function DiagnosisTestHeaderContainer(props) {
	const dispatch = useDispatch();
	const searchStatus = useSelector(selectSearchStatus);
	const [query, setQuery] = useState('');

	const [orderSelected, setOrderSelected] = useState('desc');
	// handle change search text input
	const handleChangeSearch = event => setQuery(event.target.value);
	//update store with new search text
	const handleUpdateSearch = _.debounce(searchText => {
		//reset search status to false after click on search button
		if (searchStatus) {
			dispatch(setSearchStatus(false));
		}
		dispatch(setSearchText(searchText));
	}, 500);
	useEffect(() => {
		handleUpdateSearch(query);
		return () => handleUpdateSearch.cancel();
	}, [query]);
	const handleSearchAction = event => {
		dispatch(setSearchStatus(true));
	};
	//change list session order
	const handleChangeOrder = e => {
		dispatch(setOrderSort(e.target.value));
		setOrderSelected(e.target.value);
	};
	return (
		<div className="grid-x grid-margin-x item-filter">
			<PdssInputComponent
				additionalClass="cell medium-5"
				id="diagnostic_search"
				display="true"
				placeholder={props.t('label_search')}
				changeAction={handleChangeSearch}
				clickToAction={handleSearchAction}
				value={query}
				iconClassName="search"
				type="text"
			/>
			<PdssSelectComponent
				selectedValue={orderSelected}
				idToAdd="diagnostic_sort"
				additionalClass="cell medium-5 medium-offset-2"
				selectOption={[
					{
						value: 'desc',
						label: props.t('diagnosis_session_desc_date_init')
					},
					{
						value: 'asc',
						label: props.t('diagnosis_session_asc_date_init')
					}
				]}
				clickToAction={handleChangeOrder}
			/>
		</div>
	);
}

export default DiagnosisTestHeaderContainer;
