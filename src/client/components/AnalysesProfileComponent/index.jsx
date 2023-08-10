import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAnalysesList, setCurrentTab } from '../../../store/reducers/evaluation.reducers';
import routes from '../../../config/routes';
import { mapCurrentLocationQueriesToJSON } from '../../../shared/helpers/properties';

function AnalysesProfileComponent({ format }) {
	const analysesList = useSelector(selectAnalysesList);
	const dispatch = useDispatch();
	const openSelectedSession = () => {
		dispatch(setCurrentTab(2))
	};
	return (
		<>
			<ul className={'profile clearfix ' + (format === 'full' ? format : '')}>
				{analysesList &&
					analysesList.map((diagnostic) => {
						if (diagnostic.has_sublabel === 'no') {
							let value = diagnostic.tvalue;
							let min = 40;
							let max = 60;
							let color = '';
							{
								color = (value >= min) ?  'green' : 'red';
							}
							return (
								<li className={value ? 'has-profile' : ''} key={diagnostic.name}>
									<div className="container">
										<div className="ranges">
											<div className="above" style={{ height: 100 - max + '%' }}></div>
											<div
												className="average"
												style={{ height: max - min + '%', bottom: min + '%' }}
											></div>
											<div className="below" style={{ height: min + '%' }}></div>
										</div>
										{value ? (
											<div className={`indicator ${color}`} style={{ bottom: value + '%' }}>
												<p className="value">
													<Link to={
														routes.account_pages.children.evaluation_page.children
															.result_page.navigationPath +
														mapCurrentLocationQueriesToJSON({
															id: diagnostic.diagnostic,
															session: diagnostic.session
														})
													}
													onClick={openSelectedSession}
													>
														{value}</Link>
												</p>
												<p className="overflow">
													{moment(diagnostic.date_finished).format('DD.MM.YYYY HH:mm')}:{' '}
													<span className="value">{value}</span>
												</p>
											</div>
										) : null}
										<p className="label">{diagnostic.label}</p>
									</div>
								</li>
							);
						}
					})}
			</ul>
			{format === 'full' ? (
				<ul className="legend clearfix">
					{analysesList &&
						analysesList
							.filter(d => d.has_sublabel === 'no')
							.map(diagnostic => {
								let prefix = '';
								return (
									<li key={diagnostic.id}>
										{analysesList
											.filter(
												t => t.has_sublabel === 'yes' && t.diagnostic === diagnostic.diagnostic
											)
											.map(test => {
												prefix = test.name;
											})}

										<p>{prefix ? prefix + ': ' + diagnostic.name : diagnostic.name} </p>
									</li>
								);
							})}
				</ul>
			) : null}
		</>
	);
}

export default AnalysesProfileComponent;
