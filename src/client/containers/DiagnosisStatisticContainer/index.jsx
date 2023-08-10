import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectDiagnosisGroups } from '../../../store/reducers/diagnosis.reducer';
import DiagnosisGroupComponent from '../../components/DiagnosisGroupComponent';
import DiagnosisGroupListComponent from '../../components/DiagnosisGroupListComponent';

function DiagnosisStatisticContainer() {
	const diagnosisGroups = useSelector(selectDiagnosisGroups);
	return (
		<div className="grid-x statistics">
			{diagnosisGroups &&
				diagnosisGroups.map((diagnostic_group, index) => {
					return (
						<Fragment key={diagnostic_group.name+'-'+diagnostic_group.id}>
							<DiagnosisGroupComponent key={diagnostic_group.name} diagnosisGroup={diagnostic_group} />
							<DiagnosisGroupListComponent key={diagnostic_group.id} diagnosisGroup={diagnostic_group} />
						</Fragment>
					);
				})}
		</div>
	);
}

export default DiagnosisStatisticContainer;
