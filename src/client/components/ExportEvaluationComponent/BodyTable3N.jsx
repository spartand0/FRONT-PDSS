import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import { replaceLine } from '../../../shared/helpers/properties';

const BodyTable3NSection = ({ t, val }) => {
	const replaceContent = (content) => {
		if (content && content.length >= 0) {
			const whiteSpacesRemoved = content.replace(/\s/g, '');
			const newLineAdded = whiteSpacesRemoved.replaceAll('</p>', '\n');
			return replaceLine(newLineAdded);
		}
	}
	let target;
	if (val[1]?.count_related) {
		target = val[1].count_related;
	} else if (val[1][0]) {
		target = val[1][0];
	} else if (replaceContent(val[1]?.target)) {
		target = replaceContent(val[1]?.target);
	} else {
		target = val[1]?.affects;
	}

	let realized_as;
	if (val[1]?.error_distribution) {
		realized_as = val[1]?.error_distribution;
	} else if (val[1][1]) {
		realized_as = replaceContent(val[1][1]);
	} else if (replaceContent(val[1]?.realized_as)) {
		realized_as = replaceContent(val[1]?.realized_as);
	} else {
		realized_as = val[1]?.count;
	}

	return (
		<View wrap={false} style={styles.tableRow}>
			<View style={styles.colAccordionDictionary1}>
				<Text style={styles.tableCellTest}>
					{val[0].includes('label_') ? t(`table_head_${val[0]}`) : val[0]}
				</Text>
			</View>
			<View style={styles.colAccordionDictionary2}>
				<Text style={val[1]?.realized_as ? styles.tableCellContent3 : styles.tableCellContent}>
					{target}
				</Text>
			</View>
			{t(`table_head_${val[0]}`) == ' t(`table_head_${val[0]}`)'}
			<View style={styles.colAccordionDictionary3}>
				<Text style={val[1]?.realized_as ? styles.tableCellContent3 : styles.tableCellContent}>
					{realized_as}
				</Text>
			</View>
		</View>
	);
};

export default BodyTable3NSection;
