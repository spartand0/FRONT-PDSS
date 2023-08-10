import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import HeaderTable2NSection from './HeaderTable2N';
import HeaderTable3NSection from './HeaderTable3N';
import HeaderTable4NSection from './HeaderTable4N';
import HeaderTable5NSection from './HeaderTable5N';
import BodyTable2NSection from './BodyTable2N';
import BodyTable3NSection from './BodyTable3N';
import BodyTable4NSection from './BodyTable4N';
import BodyTable5NSection from './BodyTable5N';

const TableAccodionEvaluationSection = ({ t, item }) => {
	const headLength = item[1].head.length;
	const headerTableSection = (title, indexTitle) => {
		if (headLength === 2) {
			return <HeaderTable2NSection t={t} title={title} indexTitle={indexTitle} />;
		} else if (headLength === 3) {
			return <HeaderTable3NSection t={t} title={title} indexTitle={indexTitle}/>;
		} else if (headLength === 4) {
			return <HeaderTable4NSection t={t} title={title} indexTitle={indexTitle} />;
		} else if (headLength === 5) {
			return <HeaderTable5NSection t={t} title={title} indexTitle={indexTitle} />;
		} else {
			return '';
		}
	};
	const bodyTableSection = (val) => {
		if (headLength === 2) {
			return <BodyTable2NSection t={t} val={val} />;
		} else if (headLength === 3) {
			return <BodyTable3NSection t={t} val={val} />;
		} else if (headLength === 4) {
			return <BodyTable4NSection val={val} />;
		} else {
			return <BodyTable5NSection val={val} />;
		}
	};
	return (
		<View>
			<Text style={styles.diagnosticTableTitle}>{item[0]}</Text>
			<View style={styles.table} wrap>
				<View style={styles.tableRow} fixed>
					{item[1].head.map((title, indexTitle) =>
						headerTableSection(title, indexTitle)
					)}
				</View>
				{item[1].values && item[1].values?.length == 0 ?
					<View style={styles.oneCell} wrap={false}>
						<Text style={styles.oneCellContent}>
							{t('no_occurence')}
						</Text>
					</View>
					:
					Object.entries(item[1].values).map(val =>
						bodyTableSection(val)
					)}
			</View>
		</View>
	);
};
export default TableAccodionEvaluationSection;
