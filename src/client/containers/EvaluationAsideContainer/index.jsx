import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import {
	getAge,
	linkIsActive,
	mapCurrentLocationQueriesToJSON,
	mapCurrentLocationQueriesToJSONAside,
	mapWindowsParamsQueriesToObject,
	progressRing
} from '../../../shared/helpers/properties';
import { selectAnalysesList, setCurrentTab } from '../../../store/reducers/evaluation.reducers';
import { selectChildList } from '../../../store/reducers/user.reducer';
import AnalysesProfileComponent from '../../components/AnalysesProfileComponent';
import NavItemComponent from '../../components/NavItemComponent';
import PdssSelectComponent from '../../components/PdssSelectComponent';

function EvaluationAsideContainer(props) {
	const { t, handleChange, HandleScrollToTop } = props;
	const analysesList = useSelector(selectAnalysesList);
	const childList = useSelector(selectChildList);
	const dispatch = useDispatch();
	let selectOption = [];
	if (childList.data?.length > 0) {
		selectOption = childList.data.map(child => {
			return {
				value: child.id,
				label: child.lastName + ',' + child.firstName + ' (' + getAge(child.birthdate) + ')'
			};
		});
	}
	const HandleLabelClick = () => {
		dispatch(setCurrentTab(1))
	}
	selectOption.unshift({ value: '', label: t('evaluation_placeholder_please_select_child') });
	const selectedChild = mapWindowsParamsQueriesToObject('child');

	const handleRenderRingPercent= (diagnostic,index)=>{
		if(diagnostic.tvalue) return 100
		else if(diagnostic.has_sublabel === 'yes' && analysesList[index + 1].tvalue) return 100
		else return 0
	}
	return (
		<aside>
			<p>
				<strong>{t('subheadline_overview')}</strong>
			</p>
			<div className="grid-x">
				<div className="cell">
					<PdssSelectComponent
						selectedValue={selectedChild.value}
						selectOption={selectOption}
						clickToAction={handleChange}
					/>
					<div className="grid-x">
						{selectedChild.exist && (
							<>
								<div className="cell group">
									<p>{t('label_profile')}</p>
								</div>
								<div className="cell">
									<AnalysesProfileComponent t={t} analysesList={analysesList} format="" />
								</div>
							</>
						)}
						<div className="cell nav">
							<NavItemComponent
								className={linkIsActive(
									routes.account_pages.children.evaluation_page.children.profile_page.navigationPath
								)}
								path={
									routes.account_pages.children.evaluation_page.children.profile_page.navigationPath +
									mapCurrentLocationQueriesToJSON()
								}
								title={t('label_show_profile')}
							/>
							<NavItemComponent
								className={linkIsActive(
									routes.account_pages.children.evaluation_page.children.export_page.navigationPath
								)}
								path={
									routes.account_pages.children.evaluation_page.children.export_page.navigationPath +
									mapCurrentLocationQueriesToJSON()
								}
								title={t('label_export')}
							/>
						</div>
						<div className="cell diagnostics">
							<div className="grid-x">
								<div className="cell group">
									<p>{t('label_tests')}</p>
								</div>
								{analysesList &&
									analysesList.map((diagnostic, index) => {
										const label = diagnostic.type === 'sublabel' ? ' sublabel' : '';
										const percent =handleRenderRingPercent(diagnostic,index)
										const { strokeDasharray, strokeDashoffset } = progressRing(percent, 5);
										return (
											<div className={`cell ${label}`} key={diagnostic.id} onClick={HandleLabelClick}>
												{diagnostic.type === 'label' ? (
													<p>
														<Link
															to={
																routes.account_pages.children.evaluation_page.children
																	.result_page.navigationPath +
																	mapCurrentLocationQueriesToJSONAside({
																	id: diagnostic.diagnostic
																})
															}
															className={
																mapWindowsParamsQueriesToObject('id').value ==
																	diagnostic.diagnostic &&
																	window.location.pathname ===
																	routes.account_pages.children.evaluation_page
																		.children.result_page.navigationPath
																	? 'active'
																	: ''
															}
															onClick={() => HandleScrollToTop(diagnostic.diagnostic)}
														>
															<span className="progress-ring" data-percent={percent}>
																<svg>
																	<circle
																		r="5"
																		cx="10"
																		cy="10"
																		strokeDasharray={strokeDasharray}
																		strokeDashoffset={strokeDashoffset}
																	/>
																</svg>
															</span>
															<span className="diagnostic">
																{diagnostic.name}
																<span className="label">{diagnostic.label}</span>
															</span>
														</Link>
													</p>
												) : (
													<p>
														{diagnostic.name}
														<span className="label">{diagnostic.label}</span>
													</p>
												)}
											</div>
										);
									})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}

export default EvaluationAsideContainer;
