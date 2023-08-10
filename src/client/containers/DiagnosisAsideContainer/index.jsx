import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import routes from '../../../config/routes';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import { getAge, linkIsActive, mapCurrentLocationQueriesToJSON } from '../../../shared/helpers/properties';
import { selectChildDetails, setSelectedChildDetails } from '../../../store/reducers/child.reducer';
import { selectChildList } from '../../../store/reducers/user.reducer';
import NavItemComponent from '../../components/NavItemComponent';
import PdssSelectComponent from '../../components/PdssSelectComponent';
import DiagnosisStatisticContainer from '../DiagnosisStatisticContainer';

function DiagnosisAsideContainer(props) {
	const { t } = props;
	const selectedChild = useSelector(selectChildDetails);
	const childList = useSelector(selectChildList);
	const [,setSearchParams] = useSearchParams();
	const dispatch = useDispatch()
	const handleChangeSelect = e => {
		setSearchParams({ child: e.target.value });
		dispatch(setSelectedChildDetails(childList.data.find(element => element.id == e.target.value)));
	};
	let selectOption = [];
	if (childList.data?.length > 0) {
		selectOption = childList.data.map(child => {
			return {
				value: child.id,
				label: child.lastName + ',' + child.firstName + ' (' + getAge(child.birthdate) + ')'
			};
		});
	}
	selectOption.unshift({ value: '', label: t('label_please_select') });
	return (
		<aside>
			<p>
				<strong>{t('sub_headline_overview')}</strong>
			</p>
			<div className="grid-x">
				<div className="cell">
					<PdssSelectComponent
						selectedValue={selectedChild?.id ? selectedChild?.id : ''}
						selectOption={selectOption}
						clickToAction={handleChangeSelect}
					/>
					<div className="grid-x">
						<div className="cell nav">
							<NavItemComponent
								className={linkIsActive(routes.account_pages.children.diagnosis_page.navigationPath)}
								path={
									routes.account_pages.children.diagnosis_page.navigationPath +
									mapCurrentLocationQueriesToJSON()
								}
								title={t('label_show_diagnostics')}
							/>
							<NavItemComponent
								className={linkIsActive(
									routes.account_pages.children.diagnosis_page.children.diagnostic_all_page
										.navigationPath
								)}
								path={
									routes.account_pages.children.diagnosis_page.children.diagnostic_all_page
										.navigationPath + mapCurrentLocationQueriesToJSON()
								}
								title={t('label_show_all_tests')}
							/>
						</div>
					</div>
					<DiagnosisStatisticContainer />
				</div>
			</div>
		</aside>
	);
}

export default WithRouter(DiagnosisAsideContainer);
