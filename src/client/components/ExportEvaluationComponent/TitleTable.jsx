import {Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';

const TitleTable = ({ t,indexTitle,title }) => {
	return (
		<Text style={indexTitle == 0 ? styles.tableCellHeaderTest : styles.tableCellHeaderAnswer}>
			{t(`table_head_${title}`)}
		</Text>
	);
};

export default TitleTable;
