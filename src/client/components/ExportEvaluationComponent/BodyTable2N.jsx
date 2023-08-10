import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';

const BodyTable2NSection = ({ t, val }) => {	
	let test;
	if (val[1].score) {
		test = t(`table_head_${val[0]}`);
	} else if (val[0].includes('label_')) {
		test = t(`table_head_${val[0]}`);
	} else {
		test = val[0];
	}

	let content = 0;
	if (val[1].score) {
		content = val[1].score;
	} else if (val[1].word) {
		content = val[1].word;
	} else if (val[1].value) {
		content = val[1].value;
	} else {
		content = val[1];
	}

	return (
		<View wrap={false} style={styles.tableRow}>
			<View style={(val[1].word || val[1].value) ? styles.colAccordionWord1 : styles.colAccordionPronunciation1}>
				<Text style={styles.tableCellTest}>
					{test}
				</Text>
			</View>
			<View style={(val[1].word || val[1].value) ? styles.colAccordionWord2 : styles.colAccordionPronunciation2}>
				<Text style={styles.tableCellContent}>
					{content}
				</Text>
			</View>
		</View>
	);
};

export default BodyTable2NSection;
