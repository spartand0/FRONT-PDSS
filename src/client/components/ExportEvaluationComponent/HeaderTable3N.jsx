import { View } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import TitleTable from './TitleTable';

const HeaderTable3NSection = ({ t, indexTitle, title }) => {
	let viewStyle;
	if (indexTitle === 0) {
		viewStyle = styles.colAccordionDictionary1header;
	} else if (indexTitle === 1) {
		viewStyle = styles.colAccordionDictionary2header;
	} else {
		viewStyle = styles.colAccordionDictionary3header;
	}

	return (
		<View
			style={viewStyle}
		>
			<TitleTable t={t} indexTitle={indexTitle} title={title} />
		</View>
	);
};

export default HeaderTable3NSection;
