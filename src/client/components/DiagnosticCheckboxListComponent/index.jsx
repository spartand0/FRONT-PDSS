import React, { useState, useEffect } from 'react';
import PdssCheckBoxListComponent from '../../components/PdssCheckBoxListComponent';
import PdssOptionCheckBoxComponent from '../../components/PdssOptionCheckBoxComponent';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import { useSelector } from 'react-redux';
import { selectAnalysesList } from '../../../store/reducers/evaluation.reducers';

export default function DiagnosticCheckboxListComponent({ t, classDesignation, selectedChild }) {
	const analysesList = useSelector(selectAnalysesList);
	const [checked, setChecked] = useState({});
	const [ids, setIds] = useState([]);
	const allUnchecked = Object.values(checked).every(value => value === true);
	const isOnechecked = Object.values(checked).some(value => value === true);
	let indexSubTest = analysesList ? analysesList.indexOf(analysesList[0]) + 1 : 0;
	const testEnded = element =>
		element.tvalue || (element.has_sublabel == 'yes' && analysesList[indexSubTest].tvalue != null);
	let isOneTestEnded = analysesList && analysesList.some(testEnded) === true ? true : false;
	let countChecked = 0;
	const [exportStatus, setExportStatus] = useState(false);
	const [selectedOption, setSelectedOption] = useState('true');
	function handleClick(e) {
		localStorage.setItem('selected_child', selectedChild);
		localStorage.setItem('option_export', selectedOption);
		if (exportStatus) {
			e.preventDefault();
		}
	}
	const handleChange = (target, value) => {
		setChecked(prev => ({
			...prev,
			[target]: value
		}));
		if (!value) {
			setIds(ids.filter(e => Number(e) !== Number(target)))
		} else {
			setIds([...ids, Number(target)])
		}
	};

	useEffect(() => {
		let idsList = []
		analysesList?.map((item, index) => {
			if (item.type === 'label') {
				if (item.tvalue || (item.has_sublabel == 'yes' && analysesList[index + 1].tvalue)) {
					idsList.push(item.diagnostic)
				}
			}
		})
		setIds(idsList);
	}, [analysesList])
	useEffect(() => {
		setChecked((prevState) => !prevState);
		localStorage.removeItem('diagnosticsToExport');
	}, [selectedChild])

	useEffect(() => {
		localStorage.setItem('diagnosticsToExport', ids);
		let exportDisabled = Object.keys(checked).length == 0
			? !isOneTestEnded
			: !isOnechecked && !allUnchecked && Object.keys(checked).length == countChecked
		setExportStatus(exportDisabled)
	}, [ids])
	return (
		<div>
			<ul className={classDesignation}>
				{analysesList &&
					analysesList.map((item, index) => {
						if (item.type === 'label') {
							let checkBoxStatus =
								item.tvalue || (item.has_sublabel == 'yes' && analysesList[index + 1].tvalue)
									? true
									: false;

							if (checkBoxStatus) {
								countChecked++;
							}
							let checkBoxId = `${item.diagnostic}`;
							return (
								<PdssCheckBoxListComponent
									key={`${checkBoxId}-${selectedChild}`}
									id={checkBoxId}
									label={checkBoxId}
									status={checkBoxStatus}
									name={item.name}
									selectedChild={selectedChild}
									checked={
										Object.keys(checked).includes(checkBoxId) ? checked[checkBoxId] : checkBoxStatus
									}
									handleChange={handleChange}
								/>
							);
						}
					})}
			</ul>
			{!exportStatus ? (
				<>
					<p>{t('label_options')}</p>
					<ul className="export-select options">
						<PdssOptionCheckBoxComponent
							defaultValue={'yes'}
							id={'option_export_detail'}
							label={'option_export_detail'}
							name={t('label_export_option_detail')}
							onChange={e => {
								setSelectedOption(e.target.checked);
							}}
						/>
					</ul>
				</>
			) : null}
			<Link
				disabled={exportStatus}
				className="button export-pdf"
				target="_blank"
				to={routes.account_pages.children.evaluation_page.children.export_eval_page.navigationPath}
				onClick={handleClick}
			>
				{t('btn_export')}{' '}
			</Link>
		</div>
	);
}
