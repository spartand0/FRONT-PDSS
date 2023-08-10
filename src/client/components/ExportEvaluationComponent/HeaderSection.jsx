import { Image, Text, View } from '@react-pdf/renderer';
import logo from '../../../../src/shared/css/assets/logo.png';
import styles from './styleExportPdf';

const HeaderSection = ({ t }) => {
	return (
		<View style={styles.page} fixed>
			<Text style={styles.section}>PDSS </Text>
			<Text style={styles.campany}>{t('header_text_title')}</Text>
			<Image style={styles.img} src={logo} />
		</View>
	);
};

export default HeaderSection;
